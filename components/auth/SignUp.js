"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignUp() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Success! Check your email");
    }
  }

  return (
    <div className="p-2">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col w-max">
            <label>Email</label>
            <Field className="p-1 rounded"
              id="email"
              name="email"
              placeholder="test@test.com"
              type="email"
            />
            {errors.email && touched.email ? <div className="errors">{errors.email}</div> : null}

            <label>Password</label>
            <Field className="p-1 rounded" id="password" name="password" type="password" />
            {errors.password && touched.password ? (
              <div className="errors">{errors.password}</div>
            ) : null}

            <Button variant="contained" type="submit" className="my-5">Submit</Button>
          </Form>
        )}
      </Formik>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
    </div>
  );
}