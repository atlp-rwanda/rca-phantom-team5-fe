import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from 'utils/url';

export default function UpdateRouteScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: routeId } = params;
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    getRouteById();
  }, []);

  const [route, setRoute] = useState({
    route_name: '',
    start: '',
    end: '',
    stops: '',
  });

  const { route_name, start, end, stops } = route;

  const onInputChange = (e: any) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const getRouteById = async () => {
    const routeInfo = await axios.get(`${baseUrl}/routes/get-route/${routeId}`);
    setRoute(routeInfo.data.data);
  };

  const formHandler = (e: any) => {
    e.preventDefault()
    updateRoute(route);
  };

  const updateRoute = async (data: any) => {
    try {
      await axios.put(`${baseUrl}/routes/update-route/${routeId}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate('/routes');
    } catch (error) {
      console.log('failed to update successfully');
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <form className='rounded-lg bg-white p-4' onSubmit={(e)=>formHandler(e)}>
        <button className='right-0 top-0 float-right mt-0 h-[30px] w-[25px] justify-center bg-red-600 text-3xl text-white'>
          &times;
        </button>
        <div className='pb-12'>
          <h2 className='mt-1 text-center text-xl text-black'>Update Route</h2>
        </div>
        <div className='mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='firstName'>
              Name
            </label>
            <input
              value={route_name}
              name='route_name'
              onChange={(e) => onInputChange(e)}
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              type='text'
              placeholder='Enter route name'
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='lastName'>
              Start Point
            </label>
            <input
              value={start}
              name='start'
              onChange={(e) => onInputChange(e)}
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              type='text'
              placeholder='Enter start point'
            />
          </div>
        </div>
        <div className='mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='email'>
              End point
            </label>
            <input
              value={end}
              name='end'
              onChange={(e) => onInputChange(e)}
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              type='text'
              placeholder='Enter end point'
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='phone'>
              Stops
            </label>
            <input
              name='stops'
              value={stops}
              onChange={(e) => onInputChange(e)}
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='stops'
              type='text'
              placeholder='Enter stops'
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='flex w-[30%] justify-center rounded-md border border-transparent
                                                         bg-primary px-4 py-2 text-sm font-medium text-white
                                                         shadow-sm hover:bg-primary'
            type='submit'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
