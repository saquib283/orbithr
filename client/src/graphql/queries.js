import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id name role department avatarUrl }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int, $filter: String) {
    getEmployees(page: $page, limit: $limit, filter: $filter) {
      employees {
        id
        name
        role
        department
        status
        attendance
        subjects
        avatarUrl
        class
        age
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

// --- NEW MUTATIONS ---
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;