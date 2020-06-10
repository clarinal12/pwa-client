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

export const UPDATE_STORE = gql`
  mutation UpdateStore($id: Int!, $description: String, $address: String) {
    updateStore(id: $id, description: $description, address: $address) {
      id
      description
      address
    }
  }
`;
