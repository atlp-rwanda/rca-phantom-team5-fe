import React from 'react';

export default function RouteDetailsCreen() {
  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <form className='rounded-lg bg-white p-4'>
        <button className='top-0 right-0 float-right mt-0 h-[30px] w-[25px] justify-center bg-red-600 text-3xl text-white'>
          &times;
        </button>
        <div className='rounded-lg bg-white p-8'>
          <h1 className='mt-1 pb-4 text-center text-xl text-black'>Route Details</h1>
          <div className='mb-4'>
            <label className='font-bold'>Name:</label>
            <span className='ml-2'>Road A</span>
          </div>
          <div className='mb-4'>
            <label className='font-bold'>Start Point:</label>
            <span className='ml-2'>City X</span>
          </div>
          <div className='mb-4'>
            <label className='font-bold'>End Point:</label>
            <span className='ml-2'>City Y</span>
          </div>
          <div className='mb-8'>
            <label className='font-bold'>Stops:</label>
            <span className='ml-2'>Stop 1, Stop 2, Stop 3</span>
          </div>
        </div>
      </form>
    </div>
  );
}
