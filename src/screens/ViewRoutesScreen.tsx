import React, { useEffect, useReducer } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import axios from 'axios';
import baseUrl from 'utils/url';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, routes: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function ViewRoutesScreen() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  const [{ routes, error, loading }, dispatch] = useReducer(reducer, {
    routes: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`${baseUrl}/routes/get-routes`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${baseUrl}/routes/delete-route/${id}`, {
        headers: {
          authorization: ` Bearer ${token}`,
        },
      });
      console.log('Route deleted successfully.');
      window.location.reload();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <section className='flex flex-1 flex-col gap-10 bg-white py-2'>
        <div />
        <div className='flex justify-between '>
          <div className='border-1 bg-lightBlue box1 mx-48 box-border h-28 w-80'>
            <h1 className='text-dark ml-12 mt-4 text-lg md:mb-0 '>Welcome,Yassin</h1>
            <p className='text-md ml-8 mt-4 text-gray-500 md:mb-0'>Welcome to routes overview</p>
          </div>
          <div className='box mr-80 flex flex-row'>
            <div className='float:right  border-1 mr-6 box-border h-28 w-52 bg-white shadow-lg'>
              <h1 className='text-md ml-20 mt-10 text-gray-500 md:mb-0 '>107</h1>
              <p className='ml-10 text-center text-sm text-gray-500 md:mb-0'>Total routes</p>
            </div>
          </div>
        </div>

        <div className='relative mx-auto shadow-md sm:rounded-lg'>
          <div className='mr-4 flex justify-end pb-8'>
            <button
              onClick={() => navigate('/create-route')}
              className='flex rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary'
              type='submit'
            >
              New Route
            </button>
          </div>
          <div>
            {/* {loading ? (
              <Oval />
            ) : error ? (
              <div className='text-red-500'>{error}</div>
            ) : ( */}
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
                {routes?.data?.rows?.map((route) => (
                  <tr
                    key={route.id}
                    className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
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

                    <td className='p-4'>{route?.route_name}</td>
                    <td className='p-4'>{route.start}</td>
                    <td className='p-4'>{route.end}</td>
                    <td className='p-4'>[{route.stops}]</td>
                    <td>
                      <button className='w-10 text-blue-600'>
                        <Edit onClick={() => navigate(`/update-route/${route.id}`)} />
                      </button>{' '}
                      <button className='text-green-600'>
                        <Visibility onClick={() => navigate(`/route-details/${route.id}`)} />
                      </button>{' '}
                      <button className='text-red-600'>
                        <Delete onClick={() => deleteHandler(route.id)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* )} */}
          </div>
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
    </div>
  );
}
