import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
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
import Redis from "ioredis";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  await createConnection({
    type: "postgres",
    database: "ureddit2",
    username: "mirzabekov",
    password: "eldar",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  const app = Express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

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
        client: redis,
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
    context: ({ req, res }): MyContext => ({ req, res, redis }),
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
