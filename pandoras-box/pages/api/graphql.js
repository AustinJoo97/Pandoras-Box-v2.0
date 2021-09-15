import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { typeDefs, resolvers } from '../../db/schemas';
import connection from '../../db/config';
import { authMiddleware } from '../../db/utils/auth';

connection();

export const server = makeExecutableSchema({
    typeDefs,
    resolvers
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default new ApolloServer({ 
    server,
    // This line of code may not be functional at the moment; need to find how to apply authMiddleware context to the entire server
    // context: authMiddleware
}).createHandler({
    path: '/api/graphql'
})