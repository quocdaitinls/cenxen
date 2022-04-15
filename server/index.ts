import createNextServer from "next";
import {loadEnvConfig} from "@next/env";
import cors from "cors";
import express, {Express} from "express";
import mongoose from "mongoose";
import {createServer, Server as HttpServer} from "http";
import createApolloServer from "./apollo";

import cookieParser from "cookie-parser";
import {errorHandler} from "@middlewares";
import {AdminS3} from "@utils/aws_s3";

import {messageBuilder} from "./socket";
import {createSocketServer} from "@utils/socket";

const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV !== "production";
const TEST = process.env.NODE_ENV === "test";

const app = express();
const httpServer = createServer(app);
const nextApp = createNextServer({dev: DEV});

function bootstrapSocketServer(httpServer: HttpServer) {
  const {ioServer, ioStart} = createSocketServer({
    httpServer,
    builders: [messageBuilder],
  });

  ioStart();
}

async function bootstrapAwsS3() {
  const admin = AdminS3.admin({
    myBucket: {
      name: process.env.CX_AWS_BUCKET_NAME as string,
      region: process.env.CX_AWS_BUCKET_REGION as string,
    },
    s3Client: {
      region: process.env.CX_AWS_CLIENT_REGION as string,
      credentials: {
        accessKeyId: process.env.CX_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CX_AWS_SECRET_ACCESS_KEY as string,
      },
    },
  });

  if (!(await admin.getMyBucket())) {
    await admin.createMyBucket();
  }
}

async function bootstrapNextApp(expressApp: Express) {
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();
  expressApp.use((req, res, next) =>
    nextHandler(req, res).catch((err) => {
      next(err);
    })
  );
}

async function bootstrapApolloServer(expressApp: Express) {
  const apolloServer = await createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({app: expressApp, path: "/api/graphql"});
}

async function connectDb() {
  return mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected."));
}

function test() {}

async function start() {
  loadEnvConfig("./", DEV);
  try {
    test();

    if (!DEV)
      app.use(
        cors({
          origin: `http://localhost:${PORT}`,
          credentials: true,
        })
      );
    app.use(cookieParser());

    await bootstrapAwsS3();
    await bootstrapSocketServer(httpServer);
    await bootstrapApolloServer(app);
    await bootstrapNextApp(app);
    app.use(errorHandler);

    if (!TEST) await connectDb();

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Start server failed", err);
  }
}

start();
