"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { Card, CardContent } from "@mui/joy";
import { CircularProgress } from "@mui/joy";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  alias: Yup.string().required("Required"),
});

export default function SignUp() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, isLoading] = useState(false);

  async function handleSignUp(formData) {
    isLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          alias: formData.alias,
        },
      },
    });

    if (error) {
      isLoading(false);
      setErrorMsg(error.message);
    } else {
      isLoading(false);
      setSuccessMsg("Success! Check your email");
    }
  }

  return (
    <Card
      color="success"
      invertedColors
      orientation="vertical"
      variant="outlined"
      sx={{ bgcolor: "black", "--Card-padding": "30px" }}
      className="w-fit"
    >
      <CardContent className="rounded">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col w-max">
              <label>Email</label>
              <Field
                className="p-1 rounded"
                id="email"
                name="email"
                placeholder="test@test.com"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="errors">{errors.email}</div>
              ) : null}

              <label>Password</label>
              <Field
                className="p-1 rounded"
                id="password"
                name="password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="errors">{errors.password}</div>
              ) : null}

              <label>Alias</label>
              <Field
                className="p-1 rounded"
                id="alias"
                name="alias"
                type="text"
              />
              {errors.alias && touched.alias ? (
                <div className="errors">{errors.alias}</div>
              ) : null}

              <button
                className="my-5 bg-green-400 p-2 rounded font-bold"
                disabled={loading ? true : false}
              >
                {loading ? <CircularProgress /> : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        {errorMsg && <p>{errorMsg}</p>}
        {successMsg && <p>{successMsg}</p>}
      </CardContent>
    </Card>
  );
}
