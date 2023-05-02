/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import haversineDistance from 'haversine-distance';
import { io, Socket } from 'socket.io-client';

import RightLeftBus from '../assets/yourbus.svg';

import '../styles/map.css';

type BusState = 'stopped' | 'moving' | 'slowed' | 'traffic';
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
const ENDPOINT = 'http://localhost:3000/';

let socket: Socket;
function MapScreen() {
  const interval: any = useRef('');
  const { isLoaded } = useJsApiLoader({
    id: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4&libraries=places',
    googleMapsApiKey: 'AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4',
  });
  const [route, setRout] = useState({
    id: 2,
    start: {
      lat: -1.9790269705524988,
      lng: 30.22334585735245,
    },
    end: {
      lat: -1.9584938721240128,
      lng: 30.118844082083093,
    },
    busStops: [{ location: { lat: -1.9718749874103298, lng: 30.17669516190937 }, stopover: true }],
  });
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number }>(route.start);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [currentBus, setcurrentBus] = useState<Bus>({
    velocity: 50,
    distance: 0,
    seats: 0,
    initialTime: initialDate,
    startingTime: initialDate,
    position: route.start,
    state: 'moving',
    busId: ' 1',
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
  async function calculateRoute() {
    if (!route.start || !route.end) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      waypoints: route.busStops,
      origin: route.start,
      destination: route.end,
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      toast.info('geolocation not supported');
      console.log('geolocation not supported');
    }

    calculateRoute();
    socket = io(ENDPOINT);

    socket.emit('join', { route_id: route.id, origin: 2, destination: 5 }, (error: any) => {
      if (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    interval.current = currentBus;
    socket.emit('update', {
      route_id: route.id,
      busId: currentBus.busId,
      position: currentBus.position,
      state: currentBus.state,
      seats: currentBus.seats,
    });
  }, [currentBus, route.id]);

  return isLoaded ? (
    <div className='flex h-screen w-full'>
      <div className='relative w-full'>
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
          <MarkerF position={{ lat: currentBus.position.lat, lng: currentBus.position.lng }} icon={RightLeftIcon} />
          {/* <MarkerF position={route.start}  /> */}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
        <div className='absolute left-1/2 bottom-12 z-10 w-1/3  -translate-x-1/2 p-4'>
          <div className='relative flex items-center justify-between gap-4 rounded-lg bg-zinc-900 px-4 py-3 text-white shadow-lg'>
            <p className='text-sm font-medium'>Your are Disconnected</p>
            <button aria-label='Close' className='shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20'>
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
      </div>

      <div className='p-2'>
        <button
          onClick={start}
          type='button'
          className='relative flex w-full items-center justify-center rounded-md bg-black px-5 py-2.5 font-medium capitalize   tracking-wide text-white transition  duration-300   ease-in-out hover:bg-gray-900 focus:outline-none active:scale-95'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            enableBackground='new 0 0 24 24'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='#FFFFFF'
          >
            <g>
              <rect fill='none' height='24' width='24' />
            </g>
            <g>
              <g>
                <path d='M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z' />
              </g>
            </g>
          </svg>
          <span className='mx-1 pl-2'>start journey</span>
        </button>
        <div className='mt-5 rounded-lg bg-white shadow'>
          <div className='flex'>
            <div className='flex-1 overflow-hidden py-5 pl-5'>
              <svg
                className='inline align-text-top'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                xmlns='http://www.w3.org/2000/svg'
                fill='#000000'
              >
                <g>
                  <path d='m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z' fill='none' id='svg_1' stroke='null' />
                  <path
                    d='m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z'
                    id='svg_2'
                  />
                  <circle cx='7.04807' cy='6.97256' r='2.5' id='svg_3' />
                </g>
              </svg>
              <h1 className='inline text-2xl font-semibold leading-none'>Buses</h1>
            </div>
          </div>
          <div className='px-5 pb-5'>
            <input
              placeholder='Number Seats'
              value={currentBus.seats}
              onChange={(e) => setcurrentBus((pre) => ({ ...pre, seats: parseInt(e.target.value, 10) }))}
              className='  mt-2 w-full rounded-lg border-transparent bg-gray-200 px-4   py-2.5 text-base text-black ring-gray-400 ring-offset-2 ring-offset-current transition  duration-500 ease-in-out placeholder:text-gray-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 dark:focus:bg-gray-800'
              type='number'
            />
            <input
              type='number'
              value={currentBus.velocity}
              onChange={(e) => setcurrentBus((pre) => ({ ...pre, velocity: parseInt(e.target.value, 10) }))}
              placeholder='velocity'
              className='mt-2 w-full rounded-lg border-transparent bg-gray-200 px-4   py-2.5 text-base text-black ring-gray-400 ring-offset-2 ring-offset-current transition  duration-500 ease-in-out placeholder:text-gray-600 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 dark:focus:bg-gray-800'
            />
          </div>
          <div className='flex'>
            <div className='flex-1 overflow-hidden py-5 pl-5'>
              <svg
                className='inline align-text-top'
                width='21'
                height='20.5'
                xmlns='http://www.w3.org/2000/svg'
                fill='#000000'
              >
                <g>
                  <path d='m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z' fill='none' id='svg_1' stroke='null' />
                  <path
                    d='m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z'
                    id='svg_2'
                  />
                  <circle cx='7.04807' cy='6.97256' r='2.5' id='svg_3' />
                </g>
              </svg>
              <h1 className='inline text-2xl font-semibold leading-none'>Operations</h1>
            </div>
            <div className='flex-none pt-2.5 pr-2.5 pl-1' />
          </div>
          <div className='px-5 pb-5'>
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            <form className='operations grid w-full max-w-screen-sm grid-cols-3 gap-2'>
              <div className='rounded-md'>
                <input
                  className='hidden'
                  id='radio_1'
                  type='checkbox'
                  onChange={() => setcurrentBus((prev) => ({ ...prev, state: 'slowed', velocity: 20 }))}
                  name='checkbox'
                />
                <label
                  className={` ${
                    currentBus.state === 'slowed' ? 'active ' : ''
                  }flex cursor-pointer flex-col rounded-md border-2 border-gray-400 p-4`}
                  htmlFor='radio_1'
                >
                  <span className='text-xs font-semibold uppercase'>bus</span>
                  <span className='mt-2 truncate text-xl font-bold'>Slowed Down</span>
                </label>
              </div>
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
                  }flex cursor-pointer flex-col rounded-md border-2 border-gray-400 p-4`}
                  htmlFor='radio_2'
                >
                  <span className='text-xs font-semibold uppercase'>bus</span>
                  <span className='mt-2 truncate text-xl font-bold '>In traffic</span>
                </label>
              </div>
              <div className='rounded-md' onClick={stop}>
                <input className='hidden' id='radio_3' type='checkbox' onChange={stop} name='checkbox' />
                <label
                  className={` ${
                    currentBus.state === 'stopped' ? 'active ' : ''
                  }flex cursor-pointer flex-col rounded-md border-2 border-gray-400 p-4`}
                  htmlFor='radio_3'
                >
                  <span className='text-xs font-semibold uppercase'>bus</span>
                  <span className='mt-2 truncate text-xl font-bold'>{`${
                    currentBus.state === 'stopped' ? 'Resume' : 'stopped'
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
  );
}

export default MapScreen;
