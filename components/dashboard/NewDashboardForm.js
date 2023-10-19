"use client";
import { ErrorSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const NewDashboardSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().optional(),
});

export default function NewDashboardForm() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  async function newDashboard(formData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("Dashboards")
      .insert({
        name: formData.name,
        description: formData.description,
        creator: user.user_metadata.alias,
      })
      .select();

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={NewDashboardSchema}
        onSubmit={newDashboard}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Title</label>
            <Field className="p-1 rounded" id="title" type="text" name="name" />
            {errors.name && touched.name ? (
              <div className="errors">{errors.name}</div>
            ) : null}

            <label>description</label>
            <Field
              className="p-1 rounded"
              id="description"
              type="text"
              name="description"
            />
            {errors.description && touched.description ? (
              <div className="errors">{errors.description}</div>
            ) : null}

            <Button
              variant="contained"
              type="submit"
              className="my-5 p-2 bg-green-500 rounded"
            >
              Create Dashboard
            </Button>
          </Form>
        )}
      </Formik>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
