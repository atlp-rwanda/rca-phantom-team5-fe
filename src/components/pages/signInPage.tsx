import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="bg-white shadow-md rounded px-20 py-20 my-">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="py-4 text-gray-500">Login your account</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Too Short!")
              .max(50, "Too Long!")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col justify-center ">
            <label htmlFor="email" className="block font-bold mb-2 mt-6">
              Email Address
            </label>
            <Field name="email" type="email" className="appearance-none border  border-gray-300 rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your Email"/>
            <ErrorMessage name="email">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>

            <label htmlFor="password" className="block font-bold mb-2 mt-6">
              Password
            </label>
            <Field name="password" type="passowrd" className="appearance-none border border-gray-300 rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your Password"/>
            <ErrorMessage name="password">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>

            <button type="submit" className="bg-primary text-white font-bold py-4 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
