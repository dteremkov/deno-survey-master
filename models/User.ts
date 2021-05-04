import { userCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class User extends BaseModel {
  //export default class User {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor({ id = "", name = "", email = "", password = "" }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: object): Promise<any> {
    const user = await userCollection.findOne(params);
    // user.id = user._id.$oid;
    // delete user._id;
    // return new User(user)
    //   if (!user) {
    //     return null;
    //   }
    //   (user as any).id = user._id.$oid;
    //   delete (user as any)._id;
    //   return new User(user as any);
    return User.prepare(user);
  }

  // static findOne(params: object) {
  //   return userCollection.findOne(params);
  // }

  async save() {
    //delete this.id;
    //const { $oid } = await userCollection.insertOne(this);
    delete (this as any).id;
    const { $oid } = await userCollection.insertOne(this);
    (this as any).id = $oid;
    return this;
  }

  protected static prepare(data: any): User {
    data = BaseModel.prepare(data);
    const user = new User(data);
    return user;
  }
}
