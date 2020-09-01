import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { UserProfileSchema } from "../schemas/userProfile";
import "./ExampleForm.css";

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default function ExampleForm({ initialValues, onSubmit }) {
  const [color, setColor] = useState(null);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserProfileSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, errors, submitCount, handleChange }) => (
        <Form className="ExampleForm">
          <label htmlFor="userName">Username: </label>
          <Field
            type="text"
            id="userName"
            name="userName"
            aria-label="userName-input"
            onChange={(event) => {
              setColor(getRandomColor());
              handleChange(event);
            }}
            style={{
              border: "1px solid",
              borderColor: color,
              outlineColor: color,
            }}
          />
          <ErrorMessage name="userName" component="div" className="error" />
          {submitCount > 0 && !dirty && !Object.values(errors).some(Boolean) ? (
            <div id="confirmation" className="confirmation">
              Username available: {initialValues.userName}
            </div>
          ) : null}
          <label htmlFor="email">Email: </label>
          <Field
            type="text"
            id="email"
            name="email"
            aria-label="email-input"
            onChange={handleChange}
          />
          <ErrorMessage name="email" component="div" className="error" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
