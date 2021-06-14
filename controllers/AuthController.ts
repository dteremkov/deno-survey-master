import { RouterContext } from "../deps.ts";
import { create, getNumericDate, Header, Payload } from "../deps.ts";
import { compareSync, hashSync } from "../deps.ts";
import User from "../models/User.ts";

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

//const key = Deno.env.get("JWT_SECRET_KEY")!;

export class AuthController {
  async register(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value;

    let user = await User.findOne({ email });
    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Email is already used" };
      return;
    }
    const hashedPassword = hashSync(password);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  async login(ctx: RouterContext) {
    const { email, password } = await ctx.request.body().value;
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide email and password" };
      return;
    }
    let user = await User.findOne({ email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect email" };
      return;
    }
    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect password" };
      return;
    }

    const payload: Payload = {
      iss: user.email,
      exp: getNumericDate(60 * 60),
    };
    const jwt = await create(header, payload, Deno.env.get("JWT_SECRET_KEY")!);

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    };
  }
}

export default new AuthController();
