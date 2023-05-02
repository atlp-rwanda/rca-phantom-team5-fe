// SignInScreen.tsx

import React, { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../redux/api/authApi';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router';

export default function SignInScreen (){
  const [errortext, setErrortext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
 
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary '>
      <div className='rounded bg-white px-16 py-16 '>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <p className='py-1 text-base border-gray-300'>Login your account</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout( async() => {
              setLoading(true);
              const resultAction = await dispatch(login({ email: values.email, password: values.password, device_id: window.location.hostname }));
              if (login.fulfilled.match(resultAction)) {
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
          <Form className='flex flex-col justify-center'>
            <label htmlFor='email' className='mb-2 mt-6 font-semibold'>
              Email Address
            </label>
            <Field
              name='email'
              type='email'
              className='focus:shadow-outline w-full  appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Email'
            />
            <ErrorMessage name='email'>{(msg) => <div className='my-1 text-red-500 text-xs'>{msg}</div>}</ErrorMessage>

            <label htmlFor='password' className='mb-2 mt-6 font-semibold'>
              Password
            </label>
            <Field
              name='password'
              type='passowrd'
              className='focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Password'
            />
            <ErrorMessage name='password'>{(msg) => <div className='my-1 text-red-500 text-xs'>{msg}</div>}</ErrorMessage>
            <div>{
              (errortext && <div className='my-1 text-red-500 text-xs'>{errortext}</div>)
              }</div>
            <button
              type='submit'
              className='bg-primary flex items-center justify-center focus:shadow-outline mt-4 rounded py-4 px-4 font-bold text-white focus:outline-none'
            >
              {
                (loading?  <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="#ccc"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                
                />: "Sign In")
              }
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
