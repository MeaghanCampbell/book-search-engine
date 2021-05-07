const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type bookSchema {
        _id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    input bookSchemaInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [bookSchema]
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: bookSchemaInput): User
        removeBook(bookId: String!): User 
    }

    type Auth {
        token: ID!
        user: User
    }

`;

module.exports = typeDefs;