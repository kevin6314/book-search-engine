import { gql } from '@apollo/client';

//replaces getMe
export const QUERY_ME = gql`
  query me {
    me {
        _id
        email
        password
        username
    }
  }
`;

