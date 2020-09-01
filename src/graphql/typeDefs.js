import { gql } from "@apollo/client";

export default gql`
  type Form {
    userName: String!
    email: String!
  }
`;
