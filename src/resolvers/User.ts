import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "./../entities/User";
import { hash, verify } from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;

    if (username.length <= 3) {
      return {
        errors: [
          {
            field: "username",
            message: "username length must be greater than 3",
          },
        ],
      };
    }

    if (password.length <= 4) {
      return {
        errors: [
          {
            field: "password",
            message: "password length must be greater than 4",
          },
        ],
      };
    }

    const hashedPassword = await hash(password);
    const user = em.create(User, { username, password: hashedPassword });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      const isUsernameTaken = error.code === "23505";

      if (isUsernameTaken) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      console.error(error);
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { username, password } = options;

    const user = await em.findOne(User, { username });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username does not exist",
          },
        ],
      };
    }

    const valid = await verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    await em.persistAndFlush(user);

    req.session.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });

    return user;
  }
}
