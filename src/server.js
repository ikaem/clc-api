const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const socketIO = require("./socketio/connection");

const PORT = process.env.PORT || 8000;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({app, path: "/graphql"});


app.get("/", (req, res) => {
    res.json("hello.... for purposes of socket.io");
})

const http = app.listen({ port: PORT }, () => console.log(`GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`));

socketIO.connection(http);