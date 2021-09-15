import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { typeDefs, resolvers } from '../../db/schemas';
import connection from '../../db/config';
import { authMiddleware } from '../../db/utils/auth';
