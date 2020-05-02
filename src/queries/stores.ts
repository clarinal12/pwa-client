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
