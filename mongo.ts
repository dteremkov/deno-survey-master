import { MongoClient } from "./deps.ts";

// const client = new MongoClient();
// await client.connect("mongodb+srv://deno_survey:XdhPt1sbUG9bThJo@cluster0.clikn.mongodb.net/deno_survey?retryWrites=true&w=majority");

// const db = client.database("deno_survey");

// export const userCollection = db.collection("users");

const client = new MongoClient();
client.connectWithUri(Deno.env.get("MONGODB_URI")!);

// interface UserSchema {
//   _id: { $oid: string };
//   name: string;
//   email: string;
//   password: string;
// }

const db = client.database("deno_survey");
export const userCollection = db.collection("users");
export const surveyCollection = db.collection("surveys");
