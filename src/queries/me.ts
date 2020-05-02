import gql from 'graphql-tag';

export const ME = gql`
  query getMe {
    me {
      id
      firstName
      lastName
      email
      role
      username
      active
    }
  }
`;
