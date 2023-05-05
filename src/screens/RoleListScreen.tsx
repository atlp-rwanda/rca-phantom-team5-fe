import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Sidebar from 'layouts/Sidebar';

export default function RoleList() {
  const [errortext, setErrortext] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.userInfo);
  const [selected, setSelected] = useState('');
  const getInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
  };

  return (
    <Sidebar>
      <section className='flex flex-1 flex-col gap-6 bg-white py-2'>
        <div className='ml-10 mr-10 flex justify-between'>
          <div className='bg-gray-100'>
            <div className='border-1 box1 w-100  h-14 justify-center bg-lightBlue pl-3 pr-2 pt-6'>
              <p className='mb-2 text-2xl font-bold'>
                Hello{', '}
                <span className='text-black-800'>{user.fname}</span>
              </p>
              <p className='text-black-800 text-lg'>Welcome to {user.role} Dashboard</p>
            </div>
            <div className='box mb-10 mr-80 flex flex-row'></div>
          </div>

          <button
            className='ml-10 mt-32 h-16 w-60  bg-primary px-6 py-2 font-bold text-white'
            onClick={() => navigate('/add-role')}
          >
            Add Role
          </button>
        </div>

        <div>
          <h2 className='ml-10 text-2xl text-lg font-bold'>Role and Permission</h2>
        </div>

        <div className='relative mx-auto mt-10 shadow-md sm:rounded-lg'>
          <table className='text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='h-full w-full bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-8'>
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
                  Role
                </th>
                <th scope='col' className='px-4 py-3'>
                  Description
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

                <td className='p-4'>Operator</td>
                <td className='p-4'>Manages transportation system</td>
                <td>
                  <Link to='#' className='h-[100px] w-10 text-blue-600'>
                    <Edit />
                  </Link>{' '}
                  <Link to='#' className='text-green-600'>
                    <Visibility />
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
                <td className='p-4'>Driver</td>
                <td className='p-4'> view and update driving data</td>
                <td>
                  <Link to='#' className='text-blue-600'>
                    <Edit />
                  </Link>{' '}
                  <Link to='#' className='text-green-600'>
                    <Visibility />
                  </Link>
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
                <td className='p-4'>User </td>
                <td className='p-4'> Limited access for basic tasks only</td>
                <td>
                  <Link to='#' className='text-blue-600'>
                    <Edit />
                  </Link>{' '}
                  <Link to='#' className='text-green-600'>
                    <Visibility />
                  </Link>
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
                  href='/'
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
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href='/'
                  className='border-color-gray rounded-full border bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href='/'
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
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </Sidebar>
  );
}
