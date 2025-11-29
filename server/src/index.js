const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { getUserFromToken } = require('./utils/auth');
require('dotenv').config();
connectDB();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUserFromToken(token);
        return { user };
    }
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 OrbitHR Backend ready at ${url}`);
});