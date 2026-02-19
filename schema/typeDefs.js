const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        createdAt: String
    }

    input UserFilter {
        name: String
        email: String
    }

    type Query {
        users(filter: UserFilter): [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!): User!
        deleteUser(id: ID!): String!
    }
`;

module.exports = typeDefs;