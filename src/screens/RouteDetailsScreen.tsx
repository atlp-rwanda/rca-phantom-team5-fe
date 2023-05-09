import React, { useEffect, useReducer } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from 'utils/url';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, route: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function RouteDetailsCreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: routeId } = params;

  const [{ loading, error, route }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    route: {},
  });

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`${baseUrl}/routes/get-route/${routeId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchRoute();
  });
  return (
    <div>
      <div className='flex h-screen items-center justify-center bg-primary'>
        <form className='rounded-lg bg-white p-4'>
          <button
            onClick={() => navigate('/routes')}
            className='right-0 top-0 float-right mt-0 h-[30px] w-[25px] justify-center bg-red-600 text-3xl text-white'
          >
            &times;
          </button>
          <h1 className='my-3'>Order {routeId}</h1>
          <div className='rounded-lg bg-white p-8'>
            <h1 className='mt-1 pb-4 text-center text-xl text-black'>Route Details</h1>
            <div className='mb-4'>
              <label className='font-bold'>Name:</label>
              <span className='ml-2'>{route.route_name}</span>
            </div>
            <div className='mb-4'>
              <label className='font-bold'>Start Point:</label>
              <span className='ml-2'>{route.start}</span>
            </div>
            <div className='mb-4'>
              <label className='font-bold'>End Point:</label>
              <span className='ml-2'>{route.end}</span>
            </div>
            <div className='mb-8'>
              <label className='font-bold'>Stops:</label>
              <span className='ml-2'>[{route.stops}]</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
