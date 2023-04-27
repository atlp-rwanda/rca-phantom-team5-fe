import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../layouts/Dashboard';
import CustomSelect from 'components/MultiSelect';
import { updateUser, userProfile } from '../redux/api/authApi';
import { Oval } from 'react-loader-spinner';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const { data, loading } = userProfile();
  return (
    <Dashboard>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
        </div>
      ) : (
        <div className='rounded bg-white px-20 py-10 shadow-md '>
          <h1 className='text-center text-3xl font-bold  max-[768px]:text-2xl'>Update Profile</h1>
          <p className='mt-4 text-center text-red-600'>{errortext}</p>
          <Formik
            initialValues={{
              fname: data.fname,
              lname: data.lname,
              driver_licence: data.driver_licence
                .replace(/[\{\}\"]/g, '')
                .split(',')
                .map((letter) => letter.trim()),
            }}
            validationSchema={Yup.object({
              fname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
              lname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                setIsLoading(true);

                const resultAction = await dispatch(
                  updateUser({ lname: values.lname, fname: values.fname, driver_licence: values.driver_licence }),
                );
                if (updateUser.fulfilled.match(resultAction)) {
                  setErrortext('');
                  setIsLoading(false);
                  setSubmitting(false);
                  location.reload();
                } else {
                  if (resultAction.payload) {
                    setErrortext(resultAction.payload.message);
                  }
                  setErrortext(resultAction.payload.message);
                }
                setIsLoading(false);
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
                      className='focus:shadow-outline w-10/12 appearance-none rounded border border-gray-300 px-6 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
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
                      className='focus:shadow-outline w-10/12  appearance-none rounded border border-gray-300 px-6 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                      placeholder='Please Enter Your Last Name'
                    />
                    <ErrorMessage name='lname'>{(msg) => <div className='my-1 text-red-500'>{msg}</div>}</ErrorMessage>
                  </div>
                </div>

                {data.role != 'driver' && (
                  <div className='grid grid-cols-1'>
                    <div>
                      <label htmlFor='lname' className='mb-2 mt-6 block font-bold'>
                        License
                      </label>
                      <div className='grid grid-cols-3 gap-9'>
                        {data.driver_licence
                          .replace(/[\{\}\"]/g, '')
                          .split(',')
                          .map((letter) => letter.trim())
                          .map((item: string) => (
                            <div
                              key={item}
                              className='mr-2 rounded-md border-2 border-solid border-primary bg-primary px-4 py-3 text-white'
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
                )}
              </div>
              <div className='item-center flex justify-center max-[768px]:justify-normal'>
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
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor='#ccc'
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </Dashboard>
  );
};

export default UpdateProfile;
