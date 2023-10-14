"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignIn() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {({ errors, touched }) => (
          <Form>
            <label>Email</label>
            <Field
              id="email"
              name="email"
              placeholder="test@test.com"
              type="email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <label>Password</label>
            <Field id="password" name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
}
