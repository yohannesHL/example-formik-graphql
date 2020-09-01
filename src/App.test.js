import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, act } from "@testing-library/react";
import App from "./App";

it("run without crashing", async () => {
  await act(async () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
  });
});
