import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { createRoute } from '../redux/api/createRouteApi';

export default function CreateRouteScreen() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <Formik
        initialValues={{ route_name: '', start: '', end: '', stops: [] }}
        validationSchema={Yup.object({
          route_name: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }: any) => {
          setTimeout(async () => {
            setLoading(true);
            const resultAction = await dispatch(
              createRoute({ route_name: values.route_name, start: values.start, end: values.end, stops: values.stops }),
            );
            if (createRoute.fulfilled.match(resultAction)) {
              setErrorText('');
              setLoading(false);
              setSubmitting(false);
              navigate('/routes');
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
        <Form className='rounded-lg bg-white p-4'>
          <button
            className='top-0 right-0 float-right mt-0 h-[30px] w-[25px] justify-center bg-red-600 text-3xl text-white'
            onClick={() => navigate('/routes')}
          >
            &times;
          </button>
          <div className='pb-12'>
            <h2 className='mt-1 text-center text-xl text-black'>Create new route</h2>
          </div>
          <div className='mb-6 flex flex-wrap'>
            <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
              <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='routeName'>
                Name
              </label>
              <Field
                className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                id='name'
                name='name'
                type='text'
                placeholder='Enter route name'
              />
            </div>
            <div className='w-full px-3 md:w-1/2'>
              <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='startPoint'>
                Start Point
              </label>
              <Field
                className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                id='startPoint'
                name='startPoint'
                type='text'
                placeholder='Enter start point'
              />
            </div>
          </div>
          <div className='mb-6 flex flex-wrap'>
            <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
              <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='endPoint'>
                End point
              </label>
              <Field
                className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                id='endPoint'
                type='text'
                name='endPoint'
                placeholder='Enter end point'
              />
            </div>
            <div className='w-full px-3 md:w-1/2'>
              <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='stops'>
                Stops
              </label>
              <Field
                className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                id='stops'
                type='text'
                name='stops'
                placeholder='Enter stops'
              />
            </div>
          </div>
           <ErrorMessage name='name'>
                  {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
                </ErrorMessage>
          <div>{errorText && <div className='my-1 text-xs text-red-500'>{errorText}</div>}</div>
          <div />
          <div className='flex justify-center'>
            <button
              type='submit'
              className='flex w-[30%] justify-center rounded-md 
              border border-transparent bg-primary py-2 px-4
              text-sm font-medium text-white shadow-sm hover:bg-primary'
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
                'Create'
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
