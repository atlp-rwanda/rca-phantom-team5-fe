import { useNavigate } from 'react-router';
import Sidebar from 'layouts/Sidebar';
import React, { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Edit, Delete } from '@material-ui/icons';
export default function AssignDriverToBusScreen() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [errortext, setErrortext] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('');

  const dispatch: any = useDispatch();
  const getInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
  };

  return (
    <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
      <div></div>
      <div className='flex justify-between '>
        <div className='border-1 bg-lightBlue box1 mx-auto mr-48 ml-48 box-border h-28 w-80'>
          <h1 className='text-dark mt-4 ml-12 text-lg md:mb-0 '>Welcome,Kwizera</h1>
          <p className='text-md ml-8 mt-4 text-gray-500 md:mb-0'>Welcome to driver Bus Assignemt</p>
        </div>
        <div className='box mr-80 flex flex-row'>
          <div className='float:right  border-1 mr-6 box-border h-28 w-52 bg-white shadow-lg'>
            <h1 className='text-md mt-10 ml-20 text-gray-500 md:mb-0 '>107</h1>
            <p className='ml-10 text-center text-sm text-gray-500 md:mb-0'>Assigned Drivers</p>
          </div>
        </div>
      </div>

      <div className='max-[768px]:justify-normal flex justify-end'>
        <button
          type='submit'
          className='focus:shadow-outline mt-4 mr-20 w-2/12 bg-primary py-4 px-4 font-bold text-white focus:outline-none max-[768px]:w-full'
          onClick={() => setShowModal(true)}
        >
          NEW ASSIGN
        </button>
      </div>

      {/*  New Assign Form */}

      <>
        {showModal ? (
          <>
            <div className='fixed inset-0 z-50 flex  items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
              <div className='relative my-6 mx-auto w-6/12 max-w-3xl '>
                {/*content*/}
                <div className='relative flex w-11/12 flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-center justify-center rounded-t border-slate-200 p-5 text-center'>
                    <p className='ml-36 flex text-center text-xl font-bold'>DRIVER-BUS ASSIGNMENT</p>

                    <button
                      className='float-right ml-auto border-0 bg-transparent pb-1 text-3xl font-semibold leading-none  outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}
                    >
                      <span className='tex-red-600 block h-6 w-6 bg-red-600 pb-1 text-2xl text-white outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className='relative flex items-center justify-center pr-6 pl-6'>
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
                            login({
                              email: values.email,
                              password: values.password,
                              device_id: window.location.hostname,
                            }),
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
                      <Form className='ml-16 flex w-full flex-col'>
                        <label htmlFor='email' className='mb-2 mt-6 font-semibold'>
                          Select Driver
                        </label>
                        <Field
                          as='select'
                          onChange={getInput}
                          name='role'
                          className='focus:shadow-outline  h-12 w-11/12 rounded border border-gray-300 bg-white py-1 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                          placeholder='select the role'
                        >
                          <option></option>
                          <option value='driver'>Kwizera Eric</option>
                          <option value='operator'>Mugisha Patrick</option>
                        </Field>
                        <ErrorMessage name='email'>
                          {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
                        </ErrorMessage>

                        <label htmlFor='password' className='mb-2 mt-6 font-semibold'>
                          Select Bus
                        </label>
                        <Field
                          as='select'
                          name='role'
                          className='focus:shadow-outline  h-12 w-11/12 rounded border  border-gray-300 bg-white py-1 px-6 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                          placeholder='select the role'
                        >
                          <option></option>
                          <option value='driver'>RAC234F</option>
                          <option value='operator'>RAC234F</option>
                        </Field>
                        <ErrorMessage name='password'>
                          {(msg) => <div className='my-1 text-xs text-red-500'>{msg}</div>}
                        </ErrorMessage>
                        <div>{errortext && <div className='my-1 text-xs text-red-500'>{errortext}</div>}</div>

                        <button
                          type='submit'
                          className='focus:shadow-outline mb-10 ml-32 mt-10 flex h-12 w-4/12 items-center justify-center bg-primary py-4 px-4 font-bold text-white focus:outline-none'
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
                            'ASSIGN'
                          )}
                        </button>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
          </>
        ) : null}
      </>

      {/*  */}

      <div className='relative mx-auto mr-60 ml-60 shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-all' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th scope='col' className='px-4 py-3'>
                Driver's Names
              </th>
              <th scope='col' className='px-4 py-3'>
                Routes
              </th>
              <th scope='col' className='px-4 py-3'>
                Plate number
              </th>
              <th scope='col' className='px-4 py-3'>
                Created date
              </th>
              <th scope='col' className='px-4 py-3'>
                Actaion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-1'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-table-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>

              <td className='px-4 py-4'>kwizera Patrick</td>
              <td className='px-4 py-4'>Remera-Nyabugogo</td>
              <td className='px-4 py-4'>RAC345B</td>
              <td className='px-4 py-4'>10/10/2023</td>
              <td>
                <Link to='#' className='text-blue-600'>
                  <Edit />
                </Link>{' '}
                <Link to='#' className='text-red-600'>
                  <Delete />
                </Link>
              </td>
            </tr>
            <tr className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-2'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-table-2' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <td className='px-4 py-4'>kwizera Patrick</td>
              <td className='px-4 py-4'>Remera-Nyabugogo</td>
              <td className='px-4 py-4'>RAC345B</td>
              <td className='px-4 py-4'>10/10/2023</td>
              <td>
                <Link to='#' className='text-blue-600'>
                  <Edit />
                </Link>{' '}
                <Link to='#' className='text-red-600'>
                  <Delete />
                </Link>
              </td>
            </tr>
            <tr className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-3'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-table-3' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <td className='px-4 py-4'>kwizera Patrick</td>
              <td className='px-4 py-4'>Remera-Nyabugogo</td>
              <td className='px-4 py-4'>RAC345B</td>
              <td className='px-4 py-4'>10/10/2023</td>
              <td>
                <Link to='#' className='text-blue-600'>
                  <Edit />
                </Link>{' '}
                <Link to='#' className='text-red-600'>
                  <Delete />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <nav className='flex items-center justify-center pt-4' aria-label='Table navigation'>
          <ul className='mb-4 inline-flex items-center gap-4'>
            <li>
              <a
                href='#'
                className='ml-0 block rounded-l-lg bg-white px-3 py-2 leading-tight  text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                <span className='sr-only'>Previous</span>
                <svg
                  className='h-5 w-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                1
              </a>
            </li>
            <li>
              <a
                href='#'
                className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                2
              </a>
            </li>
            <li>
              <a
                href='#'
                className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                3
              </a>
            </li>

            <li>
              <a
                href='#'
                className='block rounded-r-lg bg-white px-3 py-2 leading-tight  text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                <span className='sr-only'>Next</span>
                <svg
                  className='h-5 w-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
