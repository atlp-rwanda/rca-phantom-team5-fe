/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { io, Socket } from 'socket.io-client';

import RightLeftBus0 from '../assets/bus0.svg';
import RightLeftBus1 from '../assets/bus1.svg';
import RightLeftBus2 from '../assets/bus2.svg';
import RightLeftBus3 from '../assets/bus3.svg';

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
type BusState = 'stopped' | 'moving' | 'slowed' | 'traffic';
interface Bus {
  busId: string;
  position: { lat: number; lng: number };
  state: BusState;
}
function MapViewScreen() {
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
  const [map, setMap] = useState<google.maps.Map>();
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number }>(route.start);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routeData, setRouteData] = useState<any>();
  const [disconnected, setDisconnected] = useState(false);

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
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      toast.info('geolocation not supported');
    }
    if (route.start && route.start) {
      calculateRoute();
    }
    socket = io(ENDPOINT, { autoConnect: false });
    socket.connect();

    socket.emit('join', { route_id: route.id, origin: 2, destination: 5 }, (error: any) => {
      if (error) {
        console.log(error);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  useEffect(() => {
    socket.on('onUpdate', (busData) => {
      setBuses((prev) => {
        const index = prev.findIndex((bus) => bus.busId === busData.busId);
        if (index !== -1) {
          const newbuses = prev.map((bus) => {
            if (bus.busId === busData.busId) {
              return busData;
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

  return isLoaded ? (
    <div className='flex h-screen w-full'>
      <div className='relative w-full'>
        <div className='absolute left-1/2 top-12 z-10 flex  -translate-x-1/2  items-center space-x-2 rounded-xl bg-white p-2 shadow-lg transition duration-500 hover:scale-105 hover:shadow-xl'>
          <div className='flex min-w-[15rem] cursor-pointer rounded-lg py-3 px-4 font-semibold text-gray-500'>
            <div className='flex h-full w-8 items-center justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
              </svg>
            </div>
            <div className='flex h-full flex-1 flex-col'>
              <div className='flex w-full '>
                <span className='flex-1 truncate'>From</span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                </svg>
              </div>
              <div className='w-[calc(100%-24px)] text-sm text-gray-400'>
                <span>kabuga</span>
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
              <div className='flex w-full '>
                <span className='flex-1 truncate'>To</span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                </svg>
              </div>
              <div className='w-[calc(100%-24px)] text-sm text-gray-400'>
                <span>remera</span>
              </div>
            </div>
          </div>
          <div
            onClick={calculateRoute}
            className='duration-3000 cursor-pointer rounded-lg bg-yellow-400 py-3 px-5 font-semibold text-white transition hover:shadow-lg'
          >
            <span>Search</span>
          </div>
        </div>
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
          })}
          {/* <MarkerF position={route.start}  /> */}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
        {disconnected && (
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
        )}
      </div>
    </div>
  ) : (
    <div>
      <span>error occured while reloading google mapp</span>
    </div>
  );
}

export default MapViewScreen;
