import gql from 'graphql-tag';

export const AUTH = gql`
  mutation Auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      token
    }
  }
`;
