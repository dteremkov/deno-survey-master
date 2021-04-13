import { userCollection } from "../mongo.ts";
//import BaseModel from "./BaseModel.ts";

//export default class User extends BaseModel {
export default class User {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public password: string = "";

  constructor({ id = "", name = "", email = "", password = "" }) {
    //super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: object): Promise<any> {
    const user = await userCollection.findOne(params);
    if (!user) {
      return null;
    }
    return user;
  }

  // static findOne(params: object) {
  //   return userCollection.findOne(params);
  // }

  async save() {
    //delete this.id;
    const { id, ...forDb } = this;
    const { $oid } = await userCollection.insertOne(forDb);
    this.id = $oid;
    return this;
  }
}

