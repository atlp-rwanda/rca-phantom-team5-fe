/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Field, Form, Formik } from 'formik';
import { AppDispatch } from 'redux/store';
import { io, Socket } from 'socket.io-client';
import baseUrl from 'utils/url';
import * as Yup from 'yup';

import RightLeftBus0 from '../assets/bus0.svg';
import RightLeftBus1 from '../assets/bus1.svg';
import RightLeftBus2 from '../assets/bus2.svg';
import RightLeftBus3 from '../assets/bus3.svg';
import logo from '../assets/logo.png';
import { GetLocations } from '../redux/api/locationApi';
import { GetBuses } from '../redux/api/viewBusesApi';

import { LocationType } from './ViewBusesScreen';

import '../styles/map.css';

const ENDPOINT = 'http://localhost:3000/';

let socket: Socket;

const RightLeftIcon0: google.maps.Icon = {
  url: RightLeftBus0,
  scaledSize: new google.maps.Size(28, 28),
};
const RightLeftIcon1: google.maps.Icon = {
  url: RightLeftBus1,
  scaledSize: new google.maps.Size(28, 28),
};
const RightLeftIcon2: google.maps.Icon = {
  url: RightLeftBus2,
  scaledSize: new google.maps.Size(28, 28),
};
const RightLeftIcon3: google.maps.Icon = {
  url: RightLeftBus3,
  scaledSize: new google.maps.Size(28, 28),
};
type BusState = 'stopped' | 'moving' | 'slowed' | 'traffic' | 'packing';
interface Bus {
  busId: string;
  position: { lat: number; lng: number };
  state: BusState;
  seats: number;
  name: string;
}
function MapViewScreen() {
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
  const { isLoaded } = useJsApiLoader({
    id: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4&libraries=places',
    googleMapsApiKey: 'AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4',
  });
  const [route, setRout] = useState({
    // id: 1,
    // start: {
    //   lat: -1.9790269705524988,
    //   lng: 30.22334585735245,
    // },
    // end: {
    //   lat: -1.9584938721240128,
    //   lng: 30.118844082083093,
    // },
    // busStops: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locations = useSelector((state: any) => state.locations.locations);
  const [loading, setLoading] = useState<boolean>(false);
  const [errortext, setErrortext] = useState<string>('');
  const busesFromRoute = useSelector((state: any) => state.buses.buses);
  const [map, setMap] = useState<google.maps.Map>();
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number }>();
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routeData, setRouteData] = useState<any>();
  const locationStatus = useSelector((state: any) => state.locations.status);
  const [disconnected, setDisconnected] = useState(false);
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
  async function calculateRoute(select?: LocationType, select1?: LocationType) {
    if ((!route.start || !route.end) && (select == 0 || select1 == 0)) {
      return;
    }
    const start = route.start || { lat: parseFloat(select.latitude), lng: parseFloat(select.longitude) };
    const end = route.end || { lat: parseFloat(select1.latitude), lng: parseFloat(select1.longitude) };
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      waypoints: route.busStops || [],
      origin: start,
      destination: end,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
  }

  const fetchbusStops = async (id: number): Promise<any> => {
    const response = await fetch(`${baseUrl}/locations/get-location/${id}`);
    const result = await response.json();
    return result.data;
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      toast.info('geolocation not supported');
    }
    if (route.start && route.start) {
      calculateRoute(selected, selected1);
    }
    socket = io(ENDPOINT, { autoConnect: false });
    socket.connect();
    if (selected.id !== 0 && selected1.id !== 0) {
      socket.emit('join', { route_id: route.id, origin: selected.id, destination: selected1.id }, (error: any) => {
        if (error) {
          console.log(error);
        }
      });
    }
    if (busesFromRoute.length > 0) {
      const BusesInroute = busesFromRoute.map((bus: any) => {
        const { id, name, plate_number, routes } = bus;
        return {
          busId: id,
          name,
          position: {
            lat: parseFloat(routes.locations_start.latitude),
            lng: parseFloat(routes.locations_start.longitude),
          },
          seats: 0,
          plate_number,
          state: 'packing',
        };
      });

      setBuses(BusesInroute);
      const busrouteData = busesFromRoute[0].routes;
      const { locations_start, locations_end, stops } = busrouteData;
      const getStops = async () => {
        const stopsInroute = [];
        await stops.map(async (stop: any) => {
          const { latitude, longitude } = await fetchbusStops(stop);

          stopsInroute.push({ location: { lat: parseFloat(latitude), lng: parseFloat(longitude) }, stopover: true });
          return null;
        });
        setRout({
          id: busrouteData.id,
          start: {
            lat: parseFloat(locations_start.latitude),
            lng: parseFloat(locations_start.longitude),
          },
          end: {
            lat: parseFloat(locations_end.latitude),
            lng: parseFloat(locations_end.longitude),
          },
          busStops: stopsInroute,
        });
      };
      setSelected(locations_start);
      setSelected1(locations_end);
      getStops();
      calculateRoute(selected, selected1);
    }
    if (locationStatus === 'idle') {
      dispatch(GetLocations());
    }
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busesFromRoute]);

  useEffect(() => {
    socket.on('onUpdate', (busData) => {
      setBuses((prev) => {
        const index = prev.findIndex((bus) => bus.busId === busData.busId);
        if (index !== -1) {
          const newbuses = prev.map((bus) => {
            if (bus.busId === busData.busId) {
              return { ...bus, ...busData };
            }
            return bus;
          });
          return newbuses;
        }
        const newData = [...prev, busData];
        return newData;
      });
    });

    socket.on('routeData', (data) => {
      setRouteData(data);
    });
    socket.on('disconnect', (reson) => {
      setDisconnected(true);
    });
  }, []);

  const getInput = (e: any) => {
    const locationId = parseInt(e.target.value, 10);
    const location = locations.find((locatio: LocationType) => locatio.id === locationId);
    setSelected(location);
  };

  const getInput1 = (e: any) => {
    const locationId = parseInt(e.target.value, 10);
    const location = locations.find((locatio: LocationType) => locatio.id === locationId);
    setSelected1(location);
  };
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setLoading(true);
      calculateRoute(selected, selected1);
      const resultAction = dispatch<AppDispatch>(
        GetBuses({
          from: selected.id,
          to: selected1.id,
        }),
      );

      if (GetBuses.fulfilled.match(resultAction)) {
        setErrortext('');
      } else {
        setErrortext(resultAction.payload.message);
      }
    } catch (error) {
      setErrortext(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center border-b p-4 md:flex-row md:justify-between md:px-8'>
        <div className='flex items-center justify-center'>
          <img src={logo} className='mr-2 h-12 w-11' alt='logo' />
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
      {isLoaded ? (
        <div className='flex h-screen w-full'>
          <div className='relative w-full'>
            <div className='absolute left-1/2 top-12 z-10 flex  -translate-x-1/2  items-center space-x-2 rounded-xl bg-white p-2 shadow-lg transition duration-500 hover:scale-105 hover:shadow-xl'>
              <Formik
                initialValues={{ from: selected.id, to: selected1.id }}
                validationSchema={Yup.object({
                  from: Yup.number().required('Required'),
                  to: Yup.number().required('Required'),
                })}
                onSubmit={onSubmit}
              >
                <Form className='flex'>
                  <div className='flex min-w-[15rem] cursor-pointer rounded-lg py-3 px-4 font-semibold text-gray-500'>
                    <div className='flex h-full w-8 items-center justify-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                        <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                      </svg>
                    </div>
                    <div className='flex h-full flex-1 flex-col'>
                      <div className='flex w-full items-center'>
                        <span className='flex-1 truncate'>From</span>
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
                  <div className='flex min-w-[15rem] cursor-pointer rounded-lg py-3 px-4 font-semibold text-gray-500'>
                    <div className='flex h-full w-8 items-center justify-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                        <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                      </svg>
                    </div>
                    <div className='flex h-full flex-1 flex-col'>
                      <div className='flex w-full items-end '>
                        <span className='flex-1 truncate'>To</span>

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
                  <button
                    type='submit'
                    className='duration-3000 cursor-pointer rounded-lg bg-orange py-3 px-5 font-semibold text-white transition hover:shadow-lg'
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
            {route && route.start && (
              <GoogleMap
                center={route.start}
                zoom={16}
                mapContainerStyle={{ flex: 1, height: '100vh' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(mapl) => setMap(mapl)}
              >
                {buses.map((bus, i) => {
                  if (i === 0) {
                    return (
                      <MarkerF
                        key={bus.busId}
                        position={{ lat: bus.position.lat, lng: bus.position.lng }}
                        icon={RightLeftIcon0}
                      />
                    );
                  }
                  if (i === 1) {
                    return (
                      <MarkerF
                        key={bus.busId}
                        position={{ lat: bus.position.lat, lng: bus.position.lng }}
                        icon={RightLeftIcon1}
                      />
                    );
                  }
                  if (i === 2) {
                    return (
                      <MarkerF
                        key={bus.busId}
                        position={{ lat: bus.position.lat, lng: bus.position.lng }}
                        icon={RightLeftIcon2}
                      />
                    );
                  }
                  if (i === 3) {
                    return (
                      <MarkerF
                        key={bus.busId}
                        position={{ lat: bus.position.lat, lng: bus.position.lng }}
                        icon={RightLeftIcon3}
                      />
                    );
                  }
                  return <MarkerF key={bus.busId} position={{ lat: bus.position.lat, lng: bus.position.lng }} />;
                })}
                {/* <MarkerF position={route.start}  /> */}
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
              </GoogleMap>
            )}

            {disconnected && (
              <div className='absolute left-1/2 bottom-12 z-10 w-1/3  -translate-x-1/2 p-4'>
                <div className='bg-primary relative flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-white shadow-lg'>
                  <p className='text-sm font-medium'>Your are Disconnected</p>
                  <button
                    aria-label='Close'
                    className='bg-primary/10 hover:bg-primary/20 shrink-0 rounded-lg p-1 transition'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className='p-2'>
            <div className='mt-5 min-w-[300px]  bg-white '>
              <ul className='flex flex-col '>
                {buses.map((bus, index) => {
                  return (
                    <li key={bus.busId} className='mb-2 flex flex-row border-gray-400'>
                      <div className='flex flex-1 cursor-pointer select-none items-center rounded-md bg-gray-200 p-4  transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
                        <div className='mr-4 flex h-10 w-10 flex-col items-center justify-center rounded-md bg-gray-300'>
                          {index + 1}
                        </div>
                        <div className='mr-3 flex-1 pl-1'>
                          <div className='font-medium'>{`${bus.name} ${bus.plate_number} `}</div>
                          <div className='text-sm text-gray-600'>{bus.seats} remaining seats</div>
                        </div>
                        <div className='text-xs text-gray-600'>{bus.state}</div>
                      </div>
                    </li>
                  );
                })}
                {buses.length < 1 && <p>No Bus In This route</p>}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span>error occured while reloading google mapp</span>
        </div>
      )}
    </>
  );
}

export default MapViewScreen;
