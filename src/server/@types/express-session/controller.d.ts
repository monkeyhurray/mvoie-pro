import { SessionData } from "express-session";
import { Types } from "mongoose";

interface MongoUser {
  _id: Types.ObjectId;
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
}

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    user: MongoUser;
  }
}
