import {
  ApolloServer as ApolloServerExpress,
  ExpressContext,
} from "apollo-server-express";
import {buildSchema, Resolver} from "type-graphql";
import * as Resolvers from "@s_apollo/resolvers";
import {CexRequest, CexResponse} from "server/types/express";
import {CurrentUser} from "./middlewares/currentUser";

export interface CexContext {
  req: CexRequest;
  res: CexResponse;
}

const resolvers = Object.values(Resolvers);

@Resolver()
class MainResolver {}

const configContext = (ctx: ExpressContext) => {
  const newCtx = ctx as CexContext;
  return newCtx;
};

const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [MainResolver, ...resolvers],
    globalMiddlewares: [CurrentUser],
  });

  const server = new ApolloServerExpress({
    schema,
    context: configContext,
  });

  return server;
};

export default createServer;
