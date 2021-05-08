const express = require('express');

const { ApolloServer } = require('apollo-server-express')
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas')

const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // to be passed into resolvers after auth check
  context: authMiddleware
})

server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => 
    console.log(`🌍 API server running on localhost:${PORT}`));
    console.log(`Use graphql at http://localhost:${PORT}${server.graphqlPath}!`)
});
