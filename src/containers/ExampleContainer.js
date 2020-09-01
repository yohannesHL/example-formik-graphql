import React, { useState } from "react";
import ExampleForm from "../components/ExampleForm";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FORM } from "../graphql/queries";
import { SET_FORM } from "../graphql/mutations";

export default function ExampleContainer() {
  const [mutate] = useMutation(SET_FORM);
  const { data, refetch } = useQuery(GET_FORM);
  const [state, setState] = useState(
    data ?? {
      userName: "",
      email: "",
    }
  );

  async function handleSubmit(values) {
    await mutate({
      variables: { userName: values.userName, email: values.email },
    });
    const query = await refetch();
    setState(query.data);
  }

  return (
    <div>
      <h2 role="heading">Form</h2>
      <ExampleForm initialValues={state} onSubmit={handleSubmit} />
    </div>
  );
}
