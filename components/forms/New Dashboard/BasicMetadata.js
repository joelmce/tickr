"use client";
import { SearchForTicker } from "@/components/functionality/SearchForTicker";
import { Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Dashboard name is required"),
  description: Yup.string().optional(),
});

export function BasicMetadata({ nextStep, formUpdater }) {
  const [form, updateForm] = useState({ name: "", description: "" });

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // same shape as initial values
        formUpdater(0, values);
        nextStep();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label>Dashboard name</label>
          <Field name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <label>Description</label>
          <Field name="description" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ) : null}
          <SearchForTicker />
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
}
