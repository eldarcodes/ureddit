import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import Express from "express";
import colors from "colors";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = Express();

  app.get("/", (_, res) => {
    res.send("it works");
  });

  app.listen(PORT, () => {
    console.log(colors.green(`[server] - http://localhost:${PORT}`));
    console.log(colors.magenta(`[graphql] - http://localhost:${PORT}/graphql`));
  });
};

bootstrap().catch((error) => {
  console.error(error);
});
