import gql from 'graphql-tag';

export const STORES = gql`
  query ListStore {
    listStore {
      data {
        id
        description
        address
      }
    }
  }
`;

export const STORE = gql`
  query ListStore {
    listStore {
      data {
        id
        description
        address
      }
    }
  }
`;
