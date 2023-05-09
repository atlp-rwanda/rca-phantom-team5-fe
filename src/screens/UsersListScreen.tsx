import Sidebar from 'layouts/Sidebar';
import PersonIcon from '@material-ui/icons/Person';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
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
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { GetLocations } from '../redux/api/locationApi';
import { getAllBuses } from '../redux/api/viewBusesApi';
import { getAllUsers } from '../redux/api/usersApi';
import { getRoutes } from '../redux/api/routeApi';
import { UserDetails } from 'utils/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RoleList() {
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
    <>
      {userStatus !== 'success' ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-14 w-14 animate-spin rounded-full border-y-2 border-gray-900' />
        </div>
      ) : (
        <div className='p-10'>
          <div className='w-full p-5 shadow-2xl shadow-gray-500/50 md:w-2/5'>
            <h1 className='text-4xl font-bold text-primary'>Hello Yvette!</h1>
            <p className='b-4 mb-5 mt-4  text-lg font-medium text-black'>Welcome to the dashboard</p>
          </div>

          <div className='mt-10 flex flex-col justify-between md:flex-row'>
            <div className='grid grid-cols-2 gap-2 '>
              <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                    <PersonIcon className='text-white' />
                  </div>
                </div>
                <div className='mt-1 text-sm'>
                  <p>{users.length}</p>
                  <p>Users</p>
                </div>
              </div>

              <div>
                {users.map(
                  (user: {
                    id: Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                    email:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <div key={user.id}>
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                      {/* Add any other user details you want to display */}
                    </div>
                  ),
                )}
              </div>

              <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                    <PersonIcon className='text-white' />
                  </div>
                </div>
                <div className='mt-1 text-sm'>
                  <p>{routes.length}</p>
                  <p>Routes</p>
                </div>
              </div>

              <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                    <PersonIcon className='text-white' />
                  </div>
                </div>
                <div className='mt-1 text-sm'>
                  <p>{buses.length}</p>
                  <p>Buses</p>
                </div>
              </div>

              <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                    <PersonIcon className='text-white' />
                  </div>
                </div>
                <div className='mt-1 text-sm'>
                  <p>{locations.length}</p>
                  <p>Location</p>
                </div>
              </div>
            </div>

            <div className='ml-10'>
              {/* <h2>Number of visitors by month</h2> */}
              <Bar data={data} className='h-80 w-full shadow-md shadow-gray-300/90' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
