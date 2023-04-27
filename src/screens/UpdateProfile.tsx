import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../layouts/Dashboard';
import CustomSelect from 'components/MultiSelect';

const languageOptions = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
  {
    label: 'D',
    value: 'D',
  },
  {
    label: 'E',
    value: 'E',
  },
  {
    label: 'F',
    value: 'F',
  },
];

const UpdateProfile = () => {
  const [errortext, setErrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('');
  const dispatch: any = useDispatch();

  return (
    <Dashboard>
      <div className='rounded bg-white px-20 py-10 shadow-md '>
        <h1 className='text-center text-3xl font-bold  max-[768px]:text-2xl'>Update Profile</h1>
        <p className='mt-4 text-center text-red-600'>{errortext}</p>
        <Formik
          initialValues={{ fname: '', lname: '', driver_licence: [] }}
          validationSchema={Yup.object({
            fname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
            lname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              setLoading(true);
              console.log(values);
              setLoading(false);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className='h-full'>
            <div className='grid grid-cols-2 max-[768px]:flex max-[768px]:flex-col'>
              <div className='grid grid-cols-1'>
                <div>
                  <label htmlFor='fname' className='mb-2 mt-6 block font-bold'>
                    First Name
                  </label>
                  <Field
                    name='fname'
                    type='text'
                    className='focus:shadow-outline w-10/12 appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
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
                    className='focus:shadow-outline w-10/12  appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                    placeholder='Please Enter Your Last Name'
                  />
                  <ErrorMessage name='lname'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
                </div>
              </div>

              <div className='grid grid-cols-1'>
                <div>
                  <label htmlFor='lname' className='mb-2 mt-6 block font-bold'>
                    License
                  </label>
                  <div className='grid grid-cols-3 gap-9'>
                    {['A', 'B'].map((item) => (
                      <div
                        key={item}
                        className='mr-2 rounded-md border-2 border-solid border-primary bg-primary py-3 px-4 text-white'
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <label htmlFor='driver_licence' className='mb-2 mt-6 block font-bold'>
                  Add new licence
                </label>
                <Field
                  className='w-10/12 max-[768px]:w-full'
                  name='driver_licence'
                  options={languageOptions}
                  component={CustomSelect}
                  placeholder='Select multi languages...'
                  isMulti={true}
                />
              </div>
            </div>
            <div className='item-center max-[768px]:justify-normal flex justify-center'>
              <button
                type='submit'
                className='focus:shadow-outline mt-4 w-5/12 rounded bg-primary py-4 px-4 font-bold text-white focus:outline-none max-[768px]:w-full'
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Dashboard>
  );
};

export default UpdateProfile;
