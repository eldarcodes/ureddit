import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import Express from "express";
import colors from "colors";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext } from "./types";

import { HelloResolver } from "./resolvers/Hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  const app = Express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME, // cookie name
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        // secure: true,
        sameSite: "lax",
      },
      secret: "06042021_redis_session_secret",
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, PostResolver, UserResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(colors.green(`[server] - http://localhost:${PORT}`));
    console.log(colors.magenta(`[graphql] - http://localhost:${PORT}/graphql`));
  });
};

bootstrap().catch((error) => {
  console.error(error);
});
