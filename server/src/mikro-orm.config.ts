import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Migration20210410220450 } from "./migrations/Migration20210410220450";

export default {
  dbName: "ureddit",
  user: "mirzabekov",
  password: "eldar",
  debug: !__prod__,
  type: "postgresql",
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    disableForeignKeys: false,
    migrationsList: [
      {
        class: Migration20210410220450,
        name: "Migration20210410220450.ts",
      },
    ],
  },
} as Parameters<typeof MikroORM.init>[0];
