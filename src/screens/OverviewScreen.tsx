import Sidebar from 'layouts/Sidebar';
import PersonIcon from '@material-ui/icons/Person';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { GetLocations } from '../redux/api/locationApi';
import { getAllBuses } from '../redux/api/viewBusesApi';
import { getAllUsers } from '../redux/api/usersApi';
import { getRoutes } from '../redux/api/routeApi';
import { UserDetails } from 'utils/types';
import { getProfile } from '../redux/api/authApi';
import { DirectionsBus, Timeline, MyLocationSharp } from '@material-ui/icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const [busData, setBusData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'All buses in the system',
        data: initialData,
        backgroundColor: ['rgb(35, 56, 98)'],
        borderColor: ['rgb(35, 56, 98)'],
        borderWidth: 0,
      },
    ],
  });

  const [locationData, setLocationData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'All location in the system',
        data: initialData,
        backgroundColor: ['rgb(35, 56, 98)'],
        borderColor: ['rgb(35, 56, 98)'],
        borderWidth: 0,
      },
    ],
  });

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const buses = useSelector((state: any) => state.buses.AllBuses);
  const locations = useSelector((state: any) => state.locations.locations);
  const users = useSelector((state: any) => state.users.users);
  const user = useSelector((state: any) => state.auth.userInfo);
  const routes = useSelector((state: any) => state.routes.routes);
  const userStatus = useSelector((state: any) => state.users.allUserStatus);

  const authStatus = useSelector((state: any) => state.auth.userStatus);
  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(getProfile());
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(GetLocations());
      dispatch(getAllBuses());
      dispatch(getRoutes());
      dispatch(getAllUsers());
    }
  }, [userStatus, data, dispatch]);

  useEffect(() => {
    if (users) {
      users.forEach((user: UserDetails) => {
        const monthIndex = user.created_at && new Date(user.created_at).getMonth();
        if (monthIndex !== undefined) {
          setData((prevState) => {
            const newData = [...prevState.datasets[0].data];
            newData[monthIndex]++;
            return { ...prevState, datasets: [{ ...prevState.datasets[0], data: newData }] };
          });
        }
      });
    }

    if (buses) {
      buses.forEach((bus: any) => {
        const monthIndex = bus.createdAt && new Date(bus.createdAt).getMonth();
        if (monthIndex !== undefined) {
          setBusData((prevState) => {
            const newData = [...prevState.datasets[0].data];
            newData[monthIndex]++;
            return { ...prevState, datasets: [{ ...prevState.datasets[0], data: newData }] };
          });
        }
      });
    }

    if (locations) {
      locations.forEach((bus: any) => {
        const monthIndex = bus.createdAt && new Date(bus.createdAt).getMonth();
        if (monthIndex !== undefined) {
          setLocationData((prevState) => {
            const newData = [...prevState.datasets[0].data];
            newData[monthIndex]++;
            return { ...prevState, datasets: [{ ...prevState.datasets[0], data: newData }] };
          });
        }
      });
    }
  }, [locations]);
  console.log(authStatus);

  return (
    <>
      {authStatus !== 'success' ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-14 w-14 animate-spin rounded-full border-y-2 border-gray-900' />
        </div>
      ) : (
        <Sidebar>
          <div className='p-10'>
            <div className='w-full p-5 shadow-md shadow-gray-300/90 md:w-2/5'>
              <h1 className='text-4xl font-bold capitalize text-primary'>Hello {user.fname}!</h1>
              <p className='b-4 mb-5 mt-4  text-lg font-medium text-black'>Welcome to the dashboard</p>
            </div>

            <div className='mt-10 flex flex-col justify-between md:flex-row'>
              <div className={`grid grid-cols-2 gap-2 `}>
                {user.role === 'admin' || user.role === 'super_admin' || user.role === 'operator' ? (
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
                ) : null}
                {user.role === 'admin' ||
                user.role === 'super_admin' ||
                user.role === 'operator' ||
                user.role === 'driver' ? (
                  <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                    <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                        <Timeline className='text-white' />
                      </div>
                    </div>
                    <div className='mt-1 text-sm'>
                      <p>{routes.length}</p>
                      <p>Routes</p>
                    </div>
                  </div>
                ) : null}

                {user.role === 'admin' ||
                user.role === 'super_admin' ||
                user.role === 'operator' ||
                user.role === 'driver' ? (
                  <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                    <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                        <DirectionsBus className='text-white' />
                      </div>
                    </div>
                    <div className='mt-1 text-sm'>
                      <p>{buses.length}</p>
                      <p>Buses</p>
                    </div>
                  </div>
                ) : null}

                {user.role === 'admin' || user.role === 'super_admin' || user.role === 'operator' ? (
                  <div className='mb-5 flex w-full flex-row justify-between p-8 shadow-md shadow-gray-300/90'>
                    <div className='mr-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary'>
                        <MyLocationSharp className='text-white' />
                      </div>
                    </div>
                    <div className='mt-1 text-sm'>
                      <p>{locations.length}</p>
                      <p>Location</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className='ml-10'>
                {user.role === 'admin' || user.role === 'super_admin' ? (
                  <Bar data={data} className='h-80 w-full shadow-md shadow-gray-300/90' />
                ) : null}

                {user.role === 'driver' || user.role === 'operator' ? (
                  <Bar data={busData} className='h-80 w-full shadow-md shadow-gray-300/90' />
                ) : null}
              </div>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
}
