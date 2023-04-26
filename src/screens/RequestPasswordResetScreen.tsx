import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { sendEmail } from '../redux/api/passwordResetEmailApi';

export default function RequestPasswordReset() {
  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  return (
    <div className='bg-primary'>
      <div className='flex min-h-screen flex-col justify-center  py-12 sm:px-6 lg:px-8 '>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10'>
            <div className='pb-8'>
              <h2 className='mt-1 text-center text-lg text-black'>Reset Your Password</h2>
            </div>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
              })}
              onSubmit={(values: { email: '' }, { setSubmitting }: any) => {
                setTimeout(async () => {
                  setLoading(true);
                  const resultAction = await dispatch(sendEmail({ email: values.email }));
                  if (sendEmail.fulfilled.match(resultAction)) {
                    setErrorText('');
                    setLoading(false);
                    setSubmitting(false);
                  } else {
                    if (resultAction.payload) {
                      setErrorText(resultAction.payload.message);
                    }
                    setErrorText(resultAction.payload.message);
                  }
                  setLoading(false);
                  setSubmitting(false);
                }, 300);
              }}
            >
              <Form className='space-y-6'>
                <div>
                  <label htmlFor='password' className='block text-sm  text-gray-700'>
                    Email
                  </label>
                  <div className='mt-1'>
                    <Field
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='current-password'
                      placeholder='Enter your email'
                      className='focus:primar block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                    shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                   focus:placeholder:text-gray-500 sm:text-sm'
                    />
                    <ErrorMessage name='email'>
                      {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md border border-transparent
                   bg-primary py-2 px-4 text-sm font-medium text-white
                    shadow-sm hover:bg-primary'
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
                      'Request'
                    )}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
