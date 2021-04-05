import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import Express from "express";
import colors from "colors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = Express();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(colors.green(`[server] - http://localhost:${PORT}`));
    console.log(colors.magenta(`[graphql] - http://localhost:${PORT}/graphql`));
  });
};

bootstrap().catch((error) => {
  console.error(error);
});
