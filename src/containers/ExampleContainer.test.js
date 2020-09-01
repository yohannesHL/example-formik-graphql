import React from "react";
import * as apollo from "@apollo/client";
import ExampleContainer from "./ExampleContainer";
import { render, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

it("runs the mocked query", async () => {
  await act(async () => {
    jest.spyOn(apollo, "useQuery").mockReturnValue({
      data: {
        userName: "TestUser",
        email: "testuser@example.com",
      },
      refetch: jest.fn(),
    });
    jest.spyOn(apollo, "useMutation");

    const { container } = await render(
      <MockedProvider>
        <ExampleContainer />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

    expect(container).toMatchSnapshot();
  });
});
