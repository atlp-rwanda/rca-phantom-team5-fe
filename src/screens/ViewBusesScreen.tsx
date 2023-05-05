/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable prettier/prettier */
import React, { SetStateAction, useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Field, Form, Formik } from 'formik';
import { AppDispatch } from 'redux/store';
import * as Yup from 'yup';

import logo from '../assets/logo.png';
import map from '../assets/map.png';
import { GetLocations } from '../redux/api/locationApi';
import { GetBuses } from '../redux/api/viewBusesApi';

import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../redux/store';
export interface LocationType {
  createdAt?: Date;
  updatedAt?: Date;
  location_name?: string;
  latitude?: string;
  longitude?: string;
  id?: number;
}
export interface BusType {
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  model?: string;
  plate_number?: string;
  available_sits?: number;
}

export default function ViewBusesScreen() {
  const links = [
    {
      name: 'About us',
      path: '/about',
    },
    {
      name: 'Our Clients',
      path: '/our-clients',
    },
    {
      name: 'Why us',
      path: '/why-us',
    },
    {
      name: 'Contact us',
      path: '/contact-us',
    },
  ];
  const [selected, setSelected] = useState<LocationType>({
    createdAt: new Date(),
    updatedAt: new Date(),
    location_name: '',
    latitude: '',
    longitude: '',
    id: 0,
  });
  const [selected1, setSelected1] = useState<LocationType>({
    createdAt: new Date(),
    updatedAt: new Date(),
    location_name: '',
    latitude: '',
    longitude: '',
    id: 0,
  });

  const getInput = (e: { target: { value: React.SetStateAction<number> } }) => {
    const locationId = e.target.value.toString(); // convert to string before assigning
    const location = locations.find((location: LocationType) => location.id === parseInt(locationId, 10));
    setSelected({ ...selected1, latitude: location?.latitude.toString(), longitude: location?.longitude.toString() });
  };

  const getInput1 = (e: { target: { value: React.SetStateAction<number> } }) => {
    const locationId = e.target.value.toString(); // convert to string before assigning
    const location = locations.find((location: LocationType) => location.id === parseInt(locationId, 10));
    setSelected1({ ...selected1, latitude: location?.latitude.toString(), longitude: location?.longitude.toString() });
  };

  useEffect(() => {}, [selected]);

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const postDispatch: any = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errortext, setErrortext] = useState<string>('');
  const buses = useSelector((state: any) => state.buses.buses);
  const locations = useSelector((state: any) => state.locations.locations);
  const locationStatus = useSelector((state: any) => state.locations.status);
  const [totalBuses, setTotalBuses] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);

  useEffect(() => {
    if (locationStatus === 'idle') {
      dispatch(GetLocations());
    }
  }, [locationStatus, dispatch]);

  useEffect(() => {
    const busesLength = buses.length;
    const seatsTotal = buses.reduce(
      (acc: number, bus: { available_sits: string }) => acc + parseInt(bus.available_sits),
      0,
    );
    setTotalBuses(busesLength);
    setTotalSeats(seatsTotal);
  }, [buses]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setLoading(true);
      const resultAction = await postDispatch(
        GetBuses({
          from: selected.id!,
          to: selected1.id!,
        }),
      );
      if (GetBuses.fulfilled.match(resultAction)) {
        setErrortext('');
      } else {
        setErrortext(resultAction.payload.message);
      }
    } catch (error: any) {
      setErrortext(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className='flex flex-1 flex-col gap-10 bg-white px-4 py-2'>
      {locationStatus !== 'success' && loading ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-14 w-14 animate-spin rounded-full border-y-2 border-gray-900' />
        </div>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center border-b p-4 md:flex-row md:justify-between md:px-8'>
            <div className='flex items-center justify-center'>
              <img src={logo} className='mr-2 h-12 w-11' alt='image logo' />
              <h1 className='mb-4 text-3xl text-orange md:mb-0'>Phatom</h1>
            </div>
            <div className='flex items-center gap-6'>
              {links.map((link) => (
                <h3 key={link.path} onClick={() => navigate(link.path)} className='cursor-pointer text-lg text-black'>
                  {link.name}
                </h3>
              ))}
            </div>
            <button onClick={() => navigate('/login')} className='rounded bg-orange px-6 py-2 text-lg text-white'>
              Login
            </button>
          </div>
          <div className='flex h-full w-full justify-center'>
            <div className='flex w-full max-w-7xl flex-col items-center'>
              <div className='flex w-full justify-between'>
                <div className='border-1 box1 mx-auto mb-12 box-border h-24 w-80 bg-lightBlue'>
                  <h1 className='text-dark ml-6 mt-8 text-lg md:mb-0'>Welcome to phantom</h1>
                  <p className='ml-6'>{buses.length > 1 ? buses[0].routes.route_name : null}</p>
                </div>

                <div className='flex flex-1 justify-end '>
                  <div className='border-1 float-right mr-6 box-border flex h-28 w-52 items-center rounded-md bg-white shadow-lg shadow-indigo-400/20'>
                    <h1 className='border-color-gray ml-4 rounded-full border bg-green px-5 py-4 text-white'>
                      {totalBuses}
                    </h1>
                    <p className='ml-4 text-sm text-gray-500'>Buses available</p>
                  </div>

                  <div className='border-1 box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                    <h1 className='border-color-gray ml-4 rounded-full border bg-red px-5 py-4 text-white'>
                      {totalSeats}
                    </h1>
                    <p className='ml-4 text-sm text-gray-500'>Total Availabe Seats</p>
                  </div>
                  <div className='border-1 relative box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                    <img src={map} alt='map' className='absolute left-0 top-0 h-full w-full' />
                    <div
                      onClick={() => navigate('/map-view')}
                      className='border-color-gray z-10 ml-4 cursor-pointer rounded-full border bg-gray-600/30 p-4 text-white transition-all duration-300 hover:scale-105'
                    >
                      view the map
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative w-full shadow-md shadow-indigo-400/20'>
                <div>
                  {errortext ? (
                    <h1 className='-mt-3 mb-3 text-red'>No Bus found on this route</h1>
                  ) : (
                    <h1 className='-mt-3 mb-3'>Buses on track</h1>
                  )}
                </div>

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
                      <th scope='col' className='px-6 py-3'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Model
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Plate number
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Availabe Seats
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buses.map((bus: BusType, index: number) => (
                      <tr
                        // eslint-disable-next-line react/no-array-index-key
                        key={`i${index}`}
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
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                        >
                          {bus.name}
                        </th>
                        <td className='px-6 py-4'>{bus.model}</td>
                        <td className='px-6 py-4'>{bus.plate_number}</td>
                        <td className='px-6 py-4'>{bus.available_sits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='border-1 mt-10 box-border flex h-20 w-full items-center justify-between bg-white px-4 shadow-md shadow-indigo-400/20 sm:rounded-lg'>
                <Formik
                  initialValues={{ from: selected.id, to: selected1.id }}
                  validationSchema={Yup.object({
                    from: Yup.number().required('Required'),
                    to: Yup.number().required('Required'),
                  })}
                  onSubmit={onSubmit}
                >
                  <Form className='flex w-full'>
                    <div className='flex flex-1 justify-between '>
                      <div className='flex w-[45%] min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                        <div className='flex h-full w-8 items-center justify-center'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                            <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                          </svg>
                        </div>
                        <div className='flex h-full flex-1 flex-col'>
                          <div className='flex w-full items-center'>
                            <span className='truncate px-2'>From</span>
                            <Field
                              as='select'
                              onChange={getInput}
                              name='from'
                              value={selected.id}
                              className='focus:shadow-outline  h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                              placeholder='From: '
                            >
                              <option value={selected.id}>{selected.location_name}</option>
                              {locations.map(
                                (location: {
                                  id: React.Key | undefined | string | number | readonly string[];
                                  location_name:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                    | React.ReactFragment
                                    | React.ReactPortal
                                    | null
                                    | undefined
                                    | React.Key;
                                }) => (
                                  <option key={`${location.id}i`} value={location.id}>
                                    {location.location_name}
                                  </option>
                                ),
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className='flex  w-[45%] min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                        <div className='flex h-full w-8 items-center justify-center'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                            <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                          </svg>
                        </div>
                        <div className='flex h-full flex-1 flex-col'>
                          <div className='flex w-full items-end '>
                            <span className='truncate px-2'>To</span>

                            <Field
                              as='select'
                              onChange={getInput1}
                              name='to'
                              value={selected1.id}
                              className='focus:shadow-outline h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight  text-gray-700 focus:outline-none max-[768px]:w-full'
                              placeholder='From: '
                            >
                              <option value={selected1.id}>{selected1.location_name}</option>
                              {locations.map(
                                (location: {
                                  id: React.Key | undefined | string | number | readonly string[];
                                  location_name:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                    | React.ReactFragment
                                    | React.ReactPortal
                                    | null
                                    | undefined
                                    | React.Key;
                                }) => (
                                  <option value={location.id}>{location.location_name}</option>
                                ),
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='duration-3000 cursor-pointer rounded-lg bg-orange px-5 py-3 font-semibold text-white transition hover:shadow-lg'
                    >
                      {loading ? (
                        <Oval
                          height={20}
                          width={20}
                          color='#fff'
                          wrapperStyle={{}}
                          wrapperClass=''
                          visible
                          ariaLabel='oval-loading'
                          secondaryColor='#ccc'
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      ) : (
                        <span>Search</span>
                      )}
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
