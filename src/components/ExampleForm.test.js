import React from "react";
import ExampleForm from "./ExampleForm";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const baseProps = {
  onSubmit: () => null,
  initialValues: { userName: "test", email: "" },
};

it("renders without crashing", () => {
  render(<ExampleForm {...baseProps} />);
});

it("should not show confirmation on initial render", async () => {
  const { container } = render(<ExampleForm {...baseProps} />);

  await act(async () => {
    const confirmation = await container.querySelector(
      'div[id="confirmation"]'
    );

    expect(confirmation).toBeNull();
  });
});

it("change border color on input change", async () => {
  const { container, getByLabelText } = render(<ExampleForm {...baseProps} />);

  let input = getByLabelText("userName-input");
  const initialStyle = getComputedStyle(input);

  await act(async () => {
    await userEvent.type(input, "NewUser");
    const style = getComputedStyle(getByLabelText("userName-input"));

    expect(style.borderColor).not.toEqual(initialStyle.borderColor);
    expect(style.outlineColor).not.toEqual(initialStyle.outlineColor);
  });
});

it("show confirmation after form is submitted", async () => {
  const { container, getByText } = render(<ExampleForm {...baseProps} />);

  await act(async () => {
    await userEvent.click(getByText("Submit"));

    const confirmation = await container.querySelector(
      'div[id="confirmation"]'
    );

    expect(confirmation.innerHTML).toBe(
      `Username available: ${baseProps.initialValues.userName}`
    );
  });
});
