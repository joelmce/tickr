"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Card } from "@mui/joy";
import { CardContent } from "@mui/joy";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignIn() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  async function signIn(formData) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(true)

    if (error) {
      setErrorMsg(error.message);
    }

    router.replace('/dashboards')
  }

  return (
    
    <Card 
    color="success"
    invertedColors
    orientation="vertical"
    variant="outlined"
    sx={{ bgcolor: 'black', "--Card-padding": "30px"}}
    className="w-fit"
    >
      <CardContent className="rounded">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={signIn}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col w-fit">
              <label>Email</label>
              <Field
                className="p-1 rounded border border-green-400"
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

              <button className="my-5 bg-green-400 p-2 rounded font-bold">
                {isLoading ? <CircularProgress/> : "Log in"}
              </button>
            </Form>
          )}
        </Formik>
        {errorMsg && <p>{errorMsg}</p>}
      </CardContent>
    </Card>
  );
}
