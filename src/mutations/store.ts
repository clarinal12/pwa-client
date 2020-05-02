import gql from 'graphql-tag';

export const ADD_STORE = gql`
  mutation AddStore($description: String!, $address: String!) {
    addStore(description: $description, address: $address) {
      id
      description
      address
    }
  }
`;
