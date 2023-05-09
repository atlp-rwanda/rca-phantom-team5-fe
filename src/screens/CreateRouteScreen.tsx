import React, { useReducer, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import axios from 'axios';
import baseUrl from 'utils/url';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function CreateRouteScreen() {
  const token = localStorage.getItem('userToken');

  const navigate = useNavigate();
  const [route_name, setName] = useState<string>();
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const [stops, setStops] = useState<[]>();
  const [errorText, setErrorText] = useState<string>();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const createHandler = async (e: any) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        `${baseUrl}/routes/create-routes`,
        {
          route_name,
          start,
          end,
          stops,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      setErrorText('');
      console.log(data);
      navigate('/routes');
    } catch (err: any) {
      dispatch({ type: 'CREATE_FAIL' });
      setErrorText(err.message);
      console.log(err.message);
    }
  };
  return (
    <div className='bg-primary flex h-screen items-center justify-center'>
      <form className='rounded-lg bg-white p-4' onSubmit={createHandler}>
        <button
          className='right-0 top-0 float-right mt-0 h-[30px] w-[25px] justify-center bg-red-600 text-3xl text-white'
          onClick={() => navigate('/routes')}
        >
          &times;
        </button>
        <div className='pb-12'>
          <h2 className='mt-1 text-center text-xl text-black'>Create new route</h2>
        </div>
        <div className='mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='routeName'>
              Name
            </label>
            <input
              className='focus:primary focus:border-primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3
                            py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='name'
              name='name'
              type='text'
              placeholder='Enter route name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='startPoint'>
              Start Point
            </label>
            <input
              className='focus:primary focus:border-primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3
                            py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='startPoint'
              name='startPoint'
              type='text'
              placeholder='Enter start point'
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
        </div>
        <div className='mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='endPoint'>
              End point
            </label>
            <input
              className='focus:primary focus:border-primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3
                            py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='endPoint'
              type='text'
              name='endPoint'
              placeholder='Enter end point'
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='stops'>
              Stops
            </label>
            <input
              className='focus:primary focus:border-primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3
                            py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='stops'
              type='text'
              name='stops'
              placeholder='Enter stops'
              onChange={(e) => setStops(e.target.value)}
            />
          </div>
        </div>
        <div>{errorText && <div className='my-1 text-xs text-red-500'>{errorText}</div>}</div>
        <div />
        <div className='flex justify-center'>
          <button
            className='bg-primary hover:bg-primary flex w-[30%] justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm'
            type='submit'
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
              'Create'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
