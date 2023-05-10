import React, { ReactNode } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { Bar } from 'react-chartjs-2';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { GetLocations } from '../redux/api/locationApi';
import { getAllBuses } from '../redux/api/viewBusesApi';
import { getAllUsers } from '../redux/api/usersApi';
import { getRoutes } from '../redux/api/routeApi';
import { UserDetails } from 'utils/types';
import Sidebar from 'layouts/Sidebar';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useCallback,
  useEffect,
  useState,
} from 'react';
import UpdateRole from './UpdateRoleScreen';

export default function OverviewScreen() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apri', 'May', 'June', 'July', 'Ago', 'Sept', 'Oct', 'Nov', 'Dec'];
  const initialData = Array(12).fill(0); // Initialize data array with zeros for each month
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'All users in the system',
        data: initialData,
        backgroundColor: ['rgb(35, 56, 98)'],
        borderColor: ['rgb(35, 56, 98)'],
        borderWidth: 0,
      },
    ],
  });

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const buses = useSelector((state: any) => state.buses.buses);
  const locations = useSelector((state: any) => state.locations.locations);
  const users = useSelector((state: any) => state.users.users);
  const user = useSelector((state: any) => state.auth.userInfo);
  const routes = useSelector((state: any) => state.routes.routes);
  const userStatus = useSelector((state: any) => state.users.allUserStatus);

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((user: UserDetails) => {
        const monthIndex = user.created_at && new Date(user.created_at).getMonth();
        if (monthIndex !== undefined) {
          console.log(monthIndex);
          setData((prevState) => {
            const newData = [...prevState.datasets[0].data];
            newData[monthIndex]++;
            return { ...prevState, datasets: [{ ...prevState.datasets[0], data: newData }] };
          });
        }
      });
    }
  }, [users]);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(GetLocations());
      dispatch(getAllBuses());
      dispatch(getRoutes());
      dispatch(getAllUsers());
    }
  }, [userStatus, data, dispatch]);

  return (
    <Sidebar>
      <section className='px-10 pb-10'>
        <div className='w-full p-5 shadow-2xl shadow-gray-500/50 md:w-2/5'>
          <h1 className='text-4xl font-bold text-primary'>
            Hello <span style={{ fontWeight: 'bold' }}>{user.fname}</span>
          </h1>
          <p className='b-4 mt-4 text-lg font-medium text-black'>Welcome to {user.role} Dashboard</p>
        </div>

        <div className='mt-5'>
          <h2 className='mb-5'>All users in system </h2>

          <table className='justify-center text-sm text-gray-500 dark:text-gray-400'>
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
                  First Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Last Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Nid
                </th>

                <th scope='col' className='px-4 py-3'>
                  Email
                </th>
                <th scope='col' className='px-4 py-3'>
                  Role
                </th>
                <th scope='col' className='px-4 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (user: {
                  nid: ReactNode;
                  id: React.Key | null | undefined;
                  fname:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  lname:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  email:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  role:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <tr
                    key={user.id}
                    className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <input
                          id={`checkbox-table-${user.id}`}
                          type='checkbox'
                          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                        />
                        <label htmlFor={`checkbox-table-${user.id}`} className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className='p-4'>{user.fname}</td>
                    <td className='p-4'>{user.lname}</td>
                    <td className='p-4'>{user.nid}</td>
                    <td className='p-4'>{user.email}</td>
                    <td className='p-4'>{user.role}</td>

                    <td>
                      <Link to={''} className='h-[100px] w-10 p-4 text-blue-600'>
                        <Edit />
                      </Link>
                      {''}

                      <Link to={`#delete-${user.id}`} className='text-red-600'>
                        <Delete className='text-red' />
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          <nav className='ml-80 items-center pt-4' aria-label='Table navigation'>
            <ul className='mb-4 inline-flex items-center justify-center gap-4'>
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
    </Sidebar>
  );
}
