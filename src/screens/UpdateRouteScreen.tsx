import React from 'react';

export default function UpdateRouteScreen() {
  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <form className='rounded-lg bg-white p-8'>
        <div className='pb-12'>
          <h2 className='mt-1 text-center text-xl text-black'>Update Route</h2>
        </div>
        <div className='mb-6 flex flex-wrap'>
          <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='firstName'>
              Name
            </label>
            <input
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='name'
              type='text'
              placeholder='Enter route name'
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='lastName'>
              Start Point
            </label>
            <input
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='startPoint'
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
              className='focus:primary mb-3 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
                            shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
              id='endPoint'
              type='text'
              placeholder='Enter end point'
            />
          </div>
          <div className='w-full px-3 md:w-1/2'>
            <label className='mb-2 block text-xs font-bold  tracking-wide text-gray-700' htmlFor='phone'>
              Stops
            </label>
            <input
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
                                                         bg-primary py-2 px-4 text-sm font-medium text-white
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
