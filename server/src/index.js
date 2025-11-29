const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { getUserFromToken } = require('./utils/auth');
require('dotenv').config();

// 1. Connect to MongoDB
connectDB();

// 2. Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Get the user token from the headers
        const token = req.headers.authorization || '';

        // Try to retrieve a user with the token
        const user = getUserFromToken(token);

        // Add the user to the context (so resolvers can access it)
        return { user };
    }
});

// 3. Start the Server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 OrbitHR Backend ready at ${url}`);
});