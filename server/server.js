const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const typeDefs = require('./graphql/typeDefs'); // Import typeDefs from the new file
const resolvers = require('./graphql/resolvers'); // Import resolvers from the new file

const { authMiddleware } = require('./auth'); // Import the authMiddleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an Apollo Server instance and apply it to the Express app
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the req object to the context
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
