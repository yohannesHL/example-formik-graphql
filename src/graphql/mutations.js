import { gql } from "@apollo/client";

export const SET_FORM = gql`
  mutation SetForm($userName: String!, $email: String!) {
    setForm(userName: $userName, email: $email) @client {
      userName
      email
    }
  }
`;
