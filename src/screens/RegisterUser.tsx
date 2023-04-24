import React, { useState } from 'react'
import { Field, Form, Formik,ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RegisterUser } from 'redux/api/authApi';



export default function RegisterUserScreen(){
   const [errortext, setErrortext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary ">
      <div className="bg-white shadow-md rounded px-20 py-10 w-9/12 ">
        <h1 className="text-3xl font-bold text-center">Register A User</h1>
        <Formik
          initialValues={{fname:"", lname: "", nid: "", email:"", role:"", licence:[] }}
          validationSchema={Yup.object({
            fname: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
            lname: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
            nid: Yup.string().matches(/^[0-9]+$/,"Must only be digits").min(16).max(16).required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            role: Yup.string().required("Required")
          })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout( async() => {
              setLoading(true);
              const resultAction = await dispatch(RegisterUser({ 
                fname:values.fname,
                lname:values.lname,
                nid: values.nid, 
                email:values.email,
                role:values.role,
                driver_licence:["A","B"]}));
              if (RegisterUser.fulfilled.match(resultAction)) {
                setErrortext("");
                setLoading(false);
                setSubmitting(false);
                navigate('/dashboard');
              } else {
                if(resultAction.payload){
                  setErrortext(resultAction.payload.message);
                }
                setErrortext(resultAction.payload.message);
              }
              setLoading(false);
              setSubmitting(false);
            }, 400);
          }}
        >

          <Form className="justify-center">
            <div className="grid grid-cols-2">
          <div>
            <label htmlFor="fname" className="block font-bold mb-2 mt-6">
              First Name
            </label>
            <Field name="fname" type="text" className="appearance-none border  border-gray-300 rounded w-10/12 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your First Name"/>
            <ErrorMessage name="fname">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>
            <div>
            <label htmlFor="lname" className="block font-bold mb-2 mt-6">
                    Last Name
            </label>
            <Field name="lname" type="text" className="appearance-none border border-gray-300 rounded w-10/12 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your Last Name"/>
            <ErrorMessage name="lname">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>
            
            <div>
            <label htmlFor="nid" className="block font-bold mb-2 mt-6">
              National ID
            </label>
            <Field name="nid" type="text" className="appearance-none border  border-gray-300 rounded w-10/12 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your National ID"/>
            <ErrorMessage name="nid">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>

            <div>
            <label htmlFor="email" className="block font-bold mb-2 mt-6">
              Email Address
            </label>
            <Field name="email" type="email" className="appearance-none border  border-gray-300 rounded w-10/12 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Please Enter Your Email"/>
            <ErrorMessage name="email">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>

            <div>
            <label htmlFor="role" className="block font-bold mb-2 mt-6">
              Select Role
            </label>
            <Field as="select" name="role" className="border  border-gray-300  rounded w-10/12 py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="select the role">
                    <option value="driver" >Driver</option>
                    <option value="operator">Operator</option>
              </Field>
            <ErrorMessage name="role">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>


            <div>
            <label htmlFor="lecence" className="block font-bold mb-4 mt-6">
              Driver's Licence
            </label>
            
           <label className="text-xl px-2">A<Field type="checkbox" name="checked" value="A" className="w-6 h-6 rounded ml-1"/></label>
           <label className="text-xl px-2">B<Field type="checkbox" name="checked" value="B" className="w-6 h-6 rounded ml-1" /></label>
           <label className="text-xl px-2">C<Field type="checkbox" name="checked" value="C" className="w-6 h-6 rounded ml-1"/></label>
           <label className="text-xl px-2">D<Field type="checkbox" name="checked" value="D" className="w-6 h-6 rounded ml-1"/></label>
           <label className="text-xl px-2">E<Field type="checkbox" name="checked" value="E" className="w-6 h-6 rounded ml-1"/></label>
           <label className="text-xl px-2">F<Field type="checkbox" name="checked" value="F" className="w-6 h-6 rounded ml-1"/></label>
            <ErrorMessage name="licence">
                { msg => <div className="text-red-500 my-1">{msg}</div> }
            </ErrorMessage>
            </div>
          
            </div>

       
             <div className="flex item-center justify-center">
             <button type="submit" className="bg-primary w-5/12 text-white font-bold py-4 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
             </div>
            
          </Form>



          
        </Formik>
      </div>
    </div>
  );
};


