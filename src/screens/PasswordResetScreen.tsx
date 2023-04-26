import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from '../redux/api/resetPasswordApi';

export default function PasswordReset() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  /**  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords don't match.");
      return;
    }
    try {
      const { data } = await axios.put(`http://localhost:3000/api/auth/reset-password/${token}`, {
        password,
      });
      console.log(`${data} Password updated successfully`);
      navigate('/login');
      console.log(data.message);
    } catch (error) {
      console.log(getError(error));
    }
  };
  */
  return (
    <div className='bg-primary'>
      <div className='flex min-h-screen flex-col justify-center  py-12 sm:px-6 lg:px-8 '>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='pb-12'>
              <h2 className='mt-1 text-center text-xl text-black'>Create a new password</h2>
              <p className='max-w mt-2 text-center text-sm text-primary'>
                Or{' '}
                <a href='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  sign in to your account
                </a>
              </p>
            </div>
            <Formik
              initialValues={{ password: '', confirm_password: '' }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters!')
                  .max(50, 'Too Long!')
                  .required('Required'),
                confirm_password: Yup.string()
                  .min(6, 'Password must be at least 6 characters!')
                  .max(50, 'Too Long!')
                  .required('Required'),
              })}
              onSubmit={(values: { password: ''; confirm_password: '' }, { setSubmitting }: any) => {
                setTimeout(async () => {
                  setLoading(true);
                  const resultAction = await dispatch(
                    resetPassword({ password: values.password, confirm_password: values.confirm_password }),
                  );
                  if (resetPassword.fulfilled.match(resultAction)) {
                    setErrorText('');
                    setLoading(false);
                    setSubmitting(false);
                    navigate('/login');
                  }
                  if (values.password !== values.confirm_password) {
                    setErrorText('Passwords do not match');
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
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                    New password
                  </label>
                  <div className='mt-1'>
                    <Field
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='focus:primary block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='confirm_password' className='block text-sm font-medium text-gray-700'>
                    Confirm new password
                  </label>
                  <div className='mt-1'>
                    <Field
                      id='confirm_password'
                      name='confirm_password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='focus:primar block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                                          shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                                          focus:placeholder:text-gray-500 sm:text-sm'
                    />
                  </div>
                </div>
                <ErrorMessage name='password'>
                  {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
                </ErrorMessage>
                <div>{errorText && <div className='my-1 text-xs text-red-500'>{errorText}</div>}</div>
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
                      'Reset Password'
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
