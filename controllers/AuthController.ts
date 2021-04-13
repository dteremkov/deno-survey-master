import {
  RouterContext
} from "../deps.ts";

import { hashSync, compareSync } from "../deps.ts";
import User from "../models/User.ts";

export class AuthController {
  async register(ctx: RouterContext) {
    const {  name, email, password } = await ctx.request.body().value;

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
      email: user.email
    };
  }
}

export default new AuthController();
