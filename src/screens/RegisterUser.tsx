import React, { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RegisterUser } from '../redux/api/authApi';

export default function RegisterUserScreen() {
  const [errortext, setErrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('');
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const getInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary max-[768px]:h-full '>
      <div className='w-9/12 rounded bg-white px-20 py-10 shadow-md '>
        <h1 className='text-center text-3xl font-bold  max-[768px]:text-2xl'>Register A User</h1>
        <Formik
          initialValues={{ fname: '', lname: '', nid: '', email: '', role: '', driver_licence: [] }}
          validationSchema={Yup.object({
            fname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
            lname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
            nid: Yup.string()
              .matches(/^[0-9]+$/, 'Must only be digits')
              .min(16)
              .max(16)
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            role: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              setLoading(true);
              const resultAction = await dispatch(
                RegisterUser({
                  fname: values.fname,
                  lname: values.lname,
                  nid: values.nid,
                  email: values.email,
                  role: selected,
                  driver_licence: values.driver_licence,
                }),
              );
              if (RegisterUser.fulfilled.match(resultAction)) {
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
          <Form className='h-full'>
            <div className='grid grid-cols-2 max-[768px]:flex max-[768px]:flex-col'>
              <div>
                <label htmlFor='fname' className='mb-2 mt-6 block font-bold'>
                  First Name
                </label>
                <Field
                  name='fname'
                  type='text'
                  className='focus:shadow-outline w-10/12 max-[768px]:w-full appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
                  placeholder='Please Enter Your First Name'
                />
                <ErrorMessage name='fname'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
              </div>
              <div>
                <label htmlFor='lname' className='mb-2 mt-6 block font-bold'>
                  Last Name
                </label>
                <Field
                  name='lname'
                  type='text'
                  className='focus:shadow-outline w-10/12  max-[768px]:w-full appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
                  placeholder='Please Enter Your Last Name'
                />
                <ErrorMessage name='lname'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
              </div>

              <div>
                <label htmlFor='nid' className='mb-2 mt-6 block font-bold'>
                  National ID
                </label>
                <Field
                  name='nid'
                  type='text'
                  className='focus:shadow-outline w-10/12  appearance-none  max-[768px]:w-full rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
                  placeholder='Please Enter Your National ID'
                />
                <ErrorMessage name='nid'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
              </div>

              <div>
                <label htmlFor='email' className='mb-2 mt-6 block font-bold'>
                  Email Address
                </label>
                <Field
                  name='email'
                  type='email'
                  className='focus:shadow-outline w-10/12  max-[768px]:w-full  appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
                  placeholder='Please Enter Your Email'
                />
                <ErrorMessage name='email'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
              </div>

              <div>
                <label htmlFor='role' className='mb-2 mt-6 block font-bold'>
                  Select Role
                </label>
                <Field
                  as='select'
                  onChange={getInput}
                  name='role'
                  value={selected}
                  className='focus:shadow-outline  w-10/12  max-[768px]:w-full  rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
                  placeholder='select the role'
                >
                  <option value={selected}>{selected}</option>
                  <option value='driver'>Driver</option>
                  <option value='operator'>Operator</option>
                </Field>
                <ErrorMessage name='role'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
              </div>

              {selected === 'driver' ? (
                <div className='max-[768px]:flex max-[768px]:flex-col'>
                  <label htmlFor='lecence' className='mb-4 mt-6 block font-bold'>
                    Driver's Licence
                  </label>
                  <label className='px-2 text-xl'>
                    A<Field type='checkbox' name='driver_licence' value='A' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <label className='px-2 text-xl'>
                    B<Field type='checkbox' name='driver_licence' value='B' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <label className='px-2 text-xl'>
                    C<Field type='checkbox' name='driver_licence' value='C' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <label className='px-2 text-xl'>
                    D<Field type='checkbox' name='driver_licence' value='D' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <label className='px-2 text-xl'>
                    E<Field type='checkbox' name='driver_licence' value='E' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <label className='px-2 text-xl'>
                    F<Field type='checkbox' name='driver_licence' value='F' className='ml-1 h-6 w-6 rounded' />
                  </label>
                  <ErrorMessage name='licence'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className='item-center flex justify-center max-[768px]:justify-normal'>
              <button
                type='submit'
                className='focus:shadow-outline mt-4 w-5/12 max-[768px]:w-full rounded bg-primary py-4 px-4 font-bold text-white focus:outline-none'
              >
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
