import { gql } from "@apollo/client";

export const GET_FORM = gql`
  query GetForm {
    userName @client
    email @client
  }
`;
