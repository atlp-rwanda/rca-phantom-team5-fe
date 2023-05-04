import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Sidebar from 'layouts/Sidebar';
import * as Yup from 'yup';

import { login } from '../redux/api/authApi';

export default function ViewRoutesScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('');

  const dispatch: any = useDispatch();
  const getInput = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelected(e.target.value);
  };

  return (
    <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
      <div />
      <div className='flex justify-between '>
        <div className='border-1 bg-lightBlue box1 mx-auto mx-48 box-border h-28 w-80'>
          <h1 className='text-dark mt-4 ml-12 text-lg md:mb-0 '>Welcome,Yassin</h1>
          <p className='text-md ml-8 mt-4 text-gray-500 md:mb-0'>Welcome to routes overview</p>
        </div>
        <div className='box mr-80 flex flex-row'>
          <div className='float:right  border-1 mr-6 box-border h-28 w-52 bg-white shadow-lg'>
            <h1 className='text-md mt-10 ml-20 text-gray-500 md:mb-0 '>107</h1>
            <p className='ml-10 text-center text-sm text-gray-500 md:mb-0'>Total routes</p>
          </div>
        </div>
      </div>

      <div className='relative mx-auto shadow-md sm:rounded-lg'>
        <div className='mr-4 flex justify-end pb-8'>
          <button
            onClick={() => navigate('/create-route')}
            className='flex rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary'
            type='submit'
          >
            New Route
          </button>
        </div>
        <table className='text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='h-full w-full bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
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
                Name
              </th>
              <th scope='col' className='px-4 py-3'>
                Start point
              </th>
              <th scope='col' className='px-4 py-3'>
                End point
              </th>
              <th scope='col' className='px-4 py-3'>
                Stops
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

              <td className='p-4'>Kimironko-Town</td>
              <td className='p-4'>Kimirongo</td>
              <td className='p-4'>Town</td>
              <td className='p-4'>[Rando,KBC,KH]</td>
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
              <td className='p-4'>Kimironko-Town</td>
              <td className='p-4'>Kimirongo</td>
              <td className='p-4'>Town</td>
              <td className='p-4'>[Rando,KBC,KH]</td>
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
              <td className='p-4'>Kimironko-Town</td>
              <td className='p-4'>Kimirongo</td>
              <td className='p-4'>Town</td>
              <td className='p-4'>[Rando,KBC,KH]</td>
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
  );
}
