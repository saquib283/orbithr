const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!        # ADDED
    class: String!   # ADDED
    subjects: [String]!
    attendance: Float!
    role: String!
    department: String
    status: String
    avatarUrl: String
    createdAt: String
  }

  type AuthPayload {
    token: String!
    user: Employee!
  }

  type PaginationResult {
    employees: [Employee]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  input EmployeeInput {
    name: String!
    age: Int!        # ADDED
    class: String!   # ADDED
    subjects: [String]!
    attendance: Float
    role: String
    department: String
    status: String
  }

  type Query {
    getEmployees(
      page: Int, 
      limit: Int, 
      sortBy: String, 
      sortOrder: String,
      filter: String
    ): PaginationResult!
    
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;