import React, { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RegisterUser } from '../redux/api/authApi';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Close } from '@material-ui/icons';

export default function RegisterUserScreen() {
  const [errortext, setErrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('');
  const dispatch: any = useDispatch();

  const getInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary max-[768px]:h-full '>
      <div className='w-7/12 rounded bg-white px-20 py-9 shadow-md max-[768px]:w-11/12 '>
        <span className='flex items-end justify-end'>
          {' '}
          <Link to='/dashboard' className='text-red-600'>
            {' '}
            <Close className='bg-red-600 h-10 text-white' />{' '}
          </Link>
        </span>
        <h1 className='text-center text-3xl font-bold  max-[768px]:text-xl'>Add Role </h1>
        <Formik
          initialValues={{ role: '' }}
          validationSchema={Yup.object({
            role: Yup.string(),
          })}
          onSubmit={(values, { resetForm }) => {
            setTimeout(async () => {
              setLoading(true);
              const resultAction = await dispatch();
              if (RegisterUser.fulfilled.match(resultAction)) {
                setSelected('');
                setLoading(false);
                resetForm({ values: { role: '' } });
                setErrortext('User ' + resultAction.payload.message + ' Successfully');
              } else {
                if (resultAction.payload) {
                  setErrortext(resultAction.payload.message);
                }
                setErrortext(resultAction.payload.message);
              }
              setLoading(false);
            }, 400);
          }}
        >
          <Form className='h-full'>
            <div className=' grid grid-cols-1 max-[768px]:flex max-[768px]:flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='fname' className='mb-2 mt-6 block font-bold'>
                  Role
                </label>
                <Field
                  name='fname'
                  type='text'
                  className='focus:shadow-outline h-12 w-11/12 appearance-none rounded border border-gray-300 px-4 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                  placeholder='Please Enter Role Name'
                />
                <ErrorMessage name='fname'>{(msg) => <div className=' text-red-500'>{msg}</div>}</ErrorMessage>
              </div>

              <div className='flex flex-col'>
                <label htmlFor='lname' className='mb-2 mt-6 block font-bold'>
                  Description
                </label>
                <Field
                  name='lname'
                  type='text'
                  className='focus:shadow-outline h-12 w-11/12  appearance-none rounded border border-gray-300 px-4 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                  placeholder='Please Enter Role Description'
                />
                <ErrorMessage name='lname'>{(msg) => <div className='text-red-500'>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            {errortext === 'Role Created Successfully' ? (
              <p className='text-green-600 mt-4 text-center'>{errortext}</p>
            ) : (
              <p className='text-red-600 mt-4 text-center'>{errortext}</p>
            )}

            <div className=' flex justify-center max-[768px]:justify-normal'>
              <button
                type='submit'
                className='focus:shadow-outline mt-4 w-5/12 rounded bg-primary px-4 py-4 font-bold text-white focus:outline-none max-[768px]:w-full'
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
                  'Add Role'
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
