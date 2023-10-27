"use client";
import { ErrorSharp } from "@mui/icons-material";
import { Card, CardContent, Input, Typography } from "@mui/joy";
import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, Form, Formik } from "formik";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { CircularProgress } from "@mui/joy";
import { SearchForTicker } from "../ui/SearchForTicker";
import { supportedTickers } from "@/utils/supportedTickers";

const NewDashboardSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().optional(),
});

export default function NewDashboardForm() {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, isLoading] = useState(false)
  const router = useRouter();

  async function newDashboard(formData) {
    isLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("Dashboards")
      .insert({
        name: formData.name,
        description: formData.description,
        creator: user.user_metadata.alias,
        coins: supportedTickers.map((ticker) => ticker)
      })
      .select();
    
    

    if (error) {
      setErrorMsg(error.message);
    }
    
    isLoading(false)
    router.replace(`/dashboards/${data[0].dashboard_id}`);
  }

  return (
    <Card variant="outlined"  className="card-container">
      <CardContent>

      
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={NewDashboardSchema}
        onSubmit={newDashboard}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <Typography level="title-md" className="text-white">Dashboard title</Typography>
            <Field className="p-1 rounded" id="title" type="text" name="name" />
            {errors.name && touched.name ? (
              <div className="errors">{errors.name}</div>
            ) : null}

            <Typography level="title-md" className="text-white">Description</Typography>
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
              className="my-5 p-2 bg-green-700 rounded hover:bg-green-800"
              disabled={loading ? true : false}
            >
              {loading ? <CircularProgress/> : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
      {errorMsg && <p>{errorMsg}</p>}
      </CardContent>
    </Card>
  );
}
