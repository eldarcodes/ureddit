import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "./../entities/User";
import { hash } from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const { username, password } = options || {};
    if (!username || !password) {
      return null;
    }

    const hashedPassword = await hash(password);
    const user = em.create(User, { username, password: hashedPassword });
    await em.persistAndFlush(user);

    return user;
  }
}
