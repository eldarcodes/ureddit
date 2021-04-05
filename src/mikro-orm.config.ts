import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  dbName: "ureddit",
  user: "mirzabekov",
  password: "eldar",
  debug: !__prod__,
  type: "postgresql",
  entities: [Post],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    disableForeignKeys: false,
  },
} as Parameters<typeof MikroORM.init>[0];
