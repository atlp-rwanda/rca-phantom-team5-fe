import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../redux/api/authApi';

export default function SignInScreen() {
  const [errortext, setErrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary '>
      <div className='rounded bg-white py-24 px-16'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              setLoading(true);
              const resultAction = await dispatch(
                login({ email: values.email, password: values.password, device_id: window.location.hostname }),
              );
              if (login.fulfilled.match(resultAction)) {
                setErrortext('');
                setLoading(false);
                setSubmitting(false);
                navigate('/dashboard');
              } else {
                if (resultAction.payload) {
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
            <h1 className='text-2xl font-bold'>Sign In</h1>
            <p className='border-gray-300 py-1 text-base'>Login your account</p>
            <label htmlFor='email' className='mb-2 mt-6 font-semibold'>
              Email Address
            </label>
            <Field
              name='email'
              type='email'
              className='focus:shadow-outline w-full  appearance-none rounded border border-gray-300 py-3 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Email'
            />
            <ErrorMessage name='email'>{(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}</ErrorMessage>

            <label htmlFor='password' className='mb-2 mt-6 font-semibold'>
              Password
            </label>
            <Field
              name='password'
              type='passowrd'
              className='focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-3 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Password'
            />
            <ErrorMessage name='password'>
              {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
            </ErrorMessage>
            <div>{errortext && <div className='my-1 text-xs text-red-500'>{errortext}</div>}</div>
            <div className='flex justify-end py-2'>
              <Link to='/request-reset-password' className='text-xs font-bold text-primary'>
                Forgot Password?
              </Link>
            </div>
            <button
              type='submit'
              className='focus:shadow-outline mt-4 flex items-center justify-center rounded bg-primary p-3 font-bold text-white focus:outline-none'
            >
              {loading ? (
                <Oval
                  height={20}
                  width={20}
                  color='#fff'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible
                  ariaLabel='oval-loading'
                  secondaryColor='#ccc'
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                'Sign In'
              )}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
