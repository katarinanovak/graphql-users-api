const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');


dotenv.config();

connectDB();

const app = express();

// Kreiranje Apollo servera
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (err) => {
            return {
                message: err.message,
                code: err.extensions?.code || 'INTERNAL_SERVER_ERROR'
            };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`\n🚀 Server spreman!`);
        console.log(`📍 http://localhost:${PORT}`);
        console.log(`📊 GraphQL: http://localhost:${PORT}${server.graphqlPath}\n`);
    });
}

startServer();