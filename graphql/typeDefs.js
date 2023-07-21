const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publicationYear: Int!
  }

  type Query {
    searchBooks(keyword: String!): [Book!]!
  }
`;

module.exports = typeDefs;
