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
      <section className='px-10 pb-10 pt-5'>
        <div className='w-full p-5 shadow-2xl shadow-gray-500/50 md:w-2/5'>
          <h1 className='text-4xl font-bold text-primary'>
            Hello <span style={{ fontWeight: 'bold' }}>{user.fname}</span>
          </h1>
          <p className='b-4 mt-4 text-lg font-medium text-black'>Welcome to {user.role} Dashboard</p>
        </div>

        <div>
          <h2 className=' ml-8 mt-10 text-2xl text-lg font-bold'>Role and Permission</h2>
        </div>

        <div className='mt-10 '>
          <table className='text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='h-full  bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-1'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                    />
                  </div>
                </th>
                <th scope='col' className='px-4 py-3'>
                  Role
                </th>
                <th scope='col' className='px-4 py-3'>
                  Description
                </th>
                <th scope='col' className='px-8 py-3'>
                  Action
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
                  </Link>
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

          <div className='mt-10'>
            <h2 className='mb-5'>All users in system </h2>

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
                        <Link to={`#edit-${user.id}`} className='h-[100px] w-10 text-blue-600'>
                          <Edit />
                        </Link>{' '}
                        <Link to={`#view-${user.id}`} className='text-green-600'>
                          <Visibility />
                        </Link>{' '}
                        <Link to={`#delete-${user.id}`} className='text-red-600'>
                          <Delete />
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Sidebar>
  );
}
