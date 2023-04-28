import { useEffect, useRef, useState } from 'react';
import { Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import passenger from '../assets/passanger.png';

import '../styles/map.css';

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4&libraries=places',
    googleMapsApiKey: 'AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4',
  });
  const [route, setRout] = useState({
    start: {
      lat: -1.9790269705524988,
      lng: 30.22334585735245,
    },
    end: {
      lat: -1.9584938721240128,
      lng: 30.118844082083093,
    },
    waypoints: [
      { lat: -1.9790269705524988, lng: 30.22334585735245 },
      { lat: -1.9809674646941666, lng: 30.209660997492943 },
      { lat: -1.9837128373686737, lng: 30.199702171286727 },
      { lat: -1.985428672710757, lng: 30.18751189267899 },
      { lat: -1.9718749874103298, lng: 30.17669516190937 },
      { lat: -1.9581506419143324, lng: 30.151287624446248 },
      { lat: -1.9584938721240128, lng: 30.118844082083093 },
    ],
    busStops: [{ location: { lat: -1.9718749874103298, lng: 30.17669516190937 }, stopover: true }],
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const originRef = useRef<React.LegacyRef<HTMLInputElement>>();
  const destiantionRef = useRef<React.LegacyRef<HTMLInputElement>>();

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
    console.log(results.routes[0].overview_path[0].equals);
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
  }
  const getDistance = () => {
    const differentInTime = (new Date() - initialDate) / 1000;
    return differentInTime * velocity;
  };

  useEffect(() => {
    if (map) {
      calculateRoute();
    }
  }, []);

  return isLoaded ? (
    <>
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
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={route.start} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default App;
