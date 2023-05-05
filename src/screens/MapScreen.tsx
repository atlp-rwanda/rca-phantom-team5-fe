/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import haversineDistance from 'haversine-distance';
import Sidebar from 'layouts/Sidebar';
import { io, Socket } from 'socket.io-client';
import baseUrl from 'utils/url';

import RightLeftBus from '../assets/yourbus.svg';

import '../styles/map.css';
import { DirectionsBus, MyLocation } from '@material-ui/icons';

type BusState = 'stopped' | 'moving' | 'slowed' | 'traffic' | 'packing';
interface Bus {
  distance: number;
  busId: string;
  initialTime: number;
  seats: number;
  startingTime: number;
  velocity: number;
  position: { lat: number; lng: number };
  state: BusState;
}
const initialDate = new Date().getTime();
const RightLeftIcon: google.maps.Icon = {
  url: RightLeftBus,
  scaledSize: new google.maps.Size(36, 36),
};
const ENDPOINT = baseUrl.split('/api')[0];

let socket: Socket;
function MapScreen() {
  const interval: any = useRef('');
  const { isLoaded } = useJsApiLoader({
    id: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4&libraries=places',
    googleMapsApiKey: 'AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4',
  });
  const [route, setRout] = useState<any>();
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number }>();
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const user = useSelector((state: any) => state.auth.user_id);
  const [disconnect, setDisconnected] = useState(false);
  const [locationIds, setLocationIds] = useState({ start: 0, end: 0 });
  const [currentBus, setcurrentBus] = useState<Bus>({
    velocity: 50,
    distance: 0,
    seats: 0,
    initialTime: initialDate,
    startingTime: initialDate,
    position: { lat: 0, lng: 0 },
    state: 'packing',
    busId: '2',
  });
  const [pathDistance, setPathDistance] = useState<{ lng: number; lat: number; distance: number }[]>();

  const calculateDistance = (router: google.maps.LatLng[]) => {
    const pathCoordinatesWithDistance = router.map((coordinates, index, array) => {
      if (index === 0) {
        return { lat: coordinates.lat(), lng: coordinates.lng(), distance: 0 };
      }
      const latLong1 = { lat: array[0].lat(), lng: array[0].lng() };
      const latLong2 = { lat: coordinates.lat(), lng: coordinates.lng() };
      const distanceBetween = haversineDistance(latLong1, latLong2);
      return { ...latLong2, distance: distanceBetween };
    });

    setPathDistance(pathCoordinatesWithDistance);
  };
  async function calculateRoute(start: any, end: any) {
    if (!start || !end) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      waypoints: [],
      origin: start,
      destination: end,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    calculateDistance(results.routes[0].overview_path);
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
  }

  const getDistance = () => {
    const time = new Date().getTime();
    const differentInTime = (time - interval.current.startingTime) / 1000;
    const distance = differentInTime * ((1000 / 3600) * interval.current.velocity);
    return { distance: interval.current.distance + distance, time };
  };
  const movebus = () => {
    const { distance, time } = getDistance();
    if (!distance) return;
    if (pathDistance) {
      // eslint-disable-next-line array-callback-return
      pathDistance.filter((coordinates) => {
        if (coordinates.distance < distance) {
          setcurrentBus((prev) => {
            return {
              ...prev,
              distance,
              startingTime: time,
              position: {
                lat: coordinates.lat,
                lng: coordinates.lng,
              },
            };
          });
        }
      });
    }

    return null;
  };

  const start = (key: any) => {
    setcurrentBus((prev) => {
      return { ...prev, state: 'moving', startingTime: new Date().getTime(), initialTime: new Date().getTime() };
    });
    key.preventDefault();
    if (pathDistance) {
      for (let index = 0; index < pathDistance.length; index += 1) {
        const timer = 2000 * index;

        window.setTimeout(() => {
          if (interval.current.state !== 'stopped') {
            movebus();
          }
        }, timer);
      }
    }
  };
  const stop = () => {
    setcurrentBus((prev) => {
      return { ...prev, state: prev.state === 'stopped' ? 'moving' : 'stopped', startingTime: new Date().getTime() };
    });
  };
  const getBusInfo = async (id: number) => {
    const bus = await axios.get(`${baseUrl}/buses/get-bus-by-driver/${id}`);
    if (bus.data) {
      setLocationIds({ start: bus.data.data.routes.locations_start.id, end: bus.data.data.routes.locations_end.id });
      calculateRoute(
        {
          lat: parseFloat(bus.data.data.routes.locations_start.latitude),
          lng: parseFloat(bus.data.data.routes.locations_start.longitude),
        },
        {
          lat: parseFloat(bus.data.data.routes.locations_end.latitude),
          lng: parseFloat(bus.data.data.routes.locations_end.longitude),
        },
      );
      setRout({
        id: bus.data.data.routes.id,
        start: {
          lat: parseFloat(bus.data.data.routes.locations_start.latitude),
          lng: parseFloat(bus.data.data.routes.locations_start.longitude),
        },
        end: {
          lat: parseFloat(bus.data.data.routes.locations_end.latitude),
          lng: parseFloat(bus.data.data.routes.locations_end.longitude),
        },
        busStops: [],
      });
      setcurrentBus((prev) => {
        return {
          ...prev,
          busId: bus.data.data.id,
          position: {
            lat: parseFloat(bus.data.data.routes.locations_start.latitude),
            lng: parseFloat(bus.data.data.routes.locations_start.longitude),
          },
          seats: bus.data.data.available_sits,
        };
      });
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      toast.info('geolocation not supported');
      console.log('geolocation not supported');
    }
    getBusInfo(user);
    socket = io(ENDPOINT);

    socket.on('disconnect', (reson) => {
      setDisconnected(true);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    interval.current = currentBus;
    if (route) {
      console.log(currentBus.busId);
      socket.emit('update', {
        route_id: route.id,
        busId: currentBus.busId,
        position: currentBus.position,
        state: currentBus.state,
        seats: currentBus.seats,
      });
    }
  }, [currentBus, route]);

  useEffect(() => {
    if (route) {
      socket.emit(
        'join',
        { route_id: route.id, origin: locationIds.start, destination: locationIds.end },
        (error: any) => {
          if (error) {
            console.log(error);
          }
        },
      );
    }
  }, [route]);

  return (
    <Sidebar>
      {isLoaded ? (
        <div className='flex h-screen w-full'>
          <div className='relative w-full'>
            {route ? (
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
                onLoad={(map) => setMap(map)}
              >
                <MarkerF
                  position={{ lat: currentBus.position.lat, lng: currentBus.position.lng }}
                  icon={RightLeftIcon}
                />
                {/* <MarkerF position={route.start}  /> */}
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
              </GoogleMap>
            ) : (
              <span className='text-2xl text-primary'>loading map ...</span>
            )}

            {disconnect && (
              <div className='absolute bottom-20 left-1/2 z-10 w-1/3  -translate-x-1/2 p-4'>
                <div className='relative flex items-center justify-between gap-4 rounded-lg bg-primary px-4 py-3 text-white shadow-lg'>
                  <p className='truncate text-sm font-medium'>Your are Disconnected</p>
                  <button
                    aria-label='Close'
                    className='shrink-0 rounded-lg bg-primary/10 p-1 transition hover:bg-black/20'
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
            <div className='flex w-full justify-center'>
              <button
                onClick={start}
                type='button'
                className='relative flex h-14 w-1/2 flex-col items-center justify-center self-center rounded-md bg-primary px-5 py-2.5 font-medium capitalize   tracking-wide text-white transition  duration-300   ease-in-out hover:bg-gray-900 focus:outline-none active:scale-95'
              >
                <span className='mx-1 pl-2'>START DRIVE</span>
              </button>
            </div>

            <div className='mt-5 rounded-lg bg-white shadow'>
              <div className='flex'>
                <div className='flex-1 overflow-hidden py-5 pl-5'>
                  <DirectionsBus className={`mb-2 mr-2 h-10 w-10 text-orange`} />
                  <h1 className='inline text-2xl font-semibold leading-none'>Buses</h1>
                </div>
              </div>
              <div className='px-5 pb-5'>
                <label>Remaining Bus Seats</label>
                <input
                  placeholder='Number Seats'
                  value={currentBus.seats}
                  onChange={(e) => setcurrentBus((pre) => ({ ...pre, seats: parseInt(e.target.value, 10) }))}
                  className='  mb-4 mt-2 w-full rounded-lg border-transparent bg-gray-200 px-4   py-2.5 text-base text-black ring-gray-400 ring-offset-2 ring-offset-current transition  duration-500 ease-in-out placeholder:text-gray-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 '
                  type='number'
                />
                <label>Bus Velocity</label>
                <div className='grid grid-cols-4 gap-2'>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 20 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 20 }))}
                  >
                    20
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 40 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 40 }))}
                  >
                    40
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 60 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 60 }))}
                  >
                    60
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 80 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 80 }))}
                  >
                    80
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 100 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 100 }))}
                  >
                    100
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 120 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 120 }))}
                  >
                    120
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 140 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 140 }))}
                  >
                    140
                  </div>
                  <div
                    className={`cursor-pointer rounded-xl bg-gray-200 p-4 shadow-lg ${
                      currentBus.velocity === 160 ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => setcurrentBus((pre) => ({ ...pre, velocity: 160 }))}
                  >
                    160
                  </div>
                </div>
              </div>
              <div className='flex'>
                <div className='flex-1 overflow-hidden py-5 pl-5'>
                  <MyLocation className={`mb-3 mr-2 h-10 w-10 text-orange`} />
                  <h1 className='inline text-2xl font-semibold leading-none'>Mode</h1>
                </div>
                <div className='flex-none pl-1 pr-2.5 pt-2.5' />
              </div>
              <div className='px-5 pb-5'>
                <form className='operations grid w-full max-w-screen-sm grid-cols-2 gap-2'>
                  <div className='rounded-md'>
                    <input
                      className='hidden'
                      id='radio_2'
                      type='checkbox'
                      onChange={() => setcurrentBus((prev) => ({ ...prev, state: 'traffic', velocity: 10 }))}
                      name='checkbox'
                    />
                    <label
                      className={` ${
                        currentBus.state === 'traffic' ? 'active ' : ''
                      }flex  cursor-pointer flex-col items-center justify-center rounded-md border-2 border-gray-400 p-4`}
                      htmlFor='radio_2'
                    >
                      <span className='text-xs font-semibold uppercase'>bus</span>
                      <span className='mt-2 truncate text-xl font-bold '>Traffic</span>
                    </label>
                  </div>
                  <div className='rounded-md' onClick={stop}>
                    <input className='hidden' id='radio_3' type='checkbox' onChange={stop} name='checkbox' />
                    <label
                      className={` ${
                        currentBus.state === 'stopped' ? 'active ' : ''
                      }flex cursor-pointer flex-col items-center rounded-md border-2 border-gray-400 p-4`}
                      htmlFor='radio_3'
                    >
                      <span className='text-xs font-semibold uppercase'>bus</span>
                      <span className='mt-2 truncate text-xl font-bold'>{`${
                        currentBus.state === 'stopped' ? 'Resume' : 'Stop'
                      }`}</span>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span>error occured while reloading google mapp</span>
        </div>
      )}
    </Sidebar>
  );
}

export default MapScreen;
