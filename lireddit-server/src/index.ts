import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "lireddit",
    type: "postgresql",
    debug: !__prod__,
    user: "deploy",
    password: "pointer",
  });

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);

  console.log("-------------------------sql2------------------");
  await orm.em.nativeInsert(Post, { title: "my 2nd post" });
};

main().catch((err) => {
  console.log("**********error**********: ", err);
});
