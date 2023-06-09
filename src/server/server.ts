import express, { Express, NextFunction, Request, Response } from "express";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

const mongoUrl = process.env.MONGO_URL;
const sessionId = process.env.SESSION_ID;

if (!mongoUrl) {
  console.error("MONGO_URL not set in environment variables");
  process.exit(1);
}

if (!sessionId) {
  console.error("SESSION_ID not set in environment variables");
  process.exit(1);
}

const app: Express = express();
app.use(cors());
app.use(cookieParser(sessionId));

app.use(
  session({
    secret: sessionId,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoUrl }),
    cookie: {
      maxAge: 3600000,
      secure: false,
    },
  })
);

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);
app.use("/", userRouter);

app.use("/watch", videoRouter);
/* 
app.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    logOut(req, res, next);
  },
  (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
    });
  }
);
*/
//수정하기
export default app;
