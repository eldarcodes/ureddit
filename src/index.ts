import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const bootstrap = async () => {
  const orm = await MikroORM.init(mikroConfig);
  console.log("db conn");
  await orm.getMigrator().up();
  //   const post = orm.em.create(Post, { title: "first post" });
  //   await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});

  console.log(posts);
};

bootstrap().catch((error) => {
  console.error(error);
});
