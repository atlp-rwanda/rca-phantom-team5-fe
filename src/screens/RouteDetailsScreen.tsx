import React from 'react';
import { ArrowLeft } from 'react-feather';

export default function RouteDetailsCreen() {
  return (
    <div className='bg-primary flex h-screen items-center justify-center'>
      <form className='rounded-lg bg-white p-4'>
        <div className='rounded-lg bg-white p-8'>
          <h1 className='mt-1 text-center text-xl text-black pb-4'>Route Details</h1>
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

          <div className='flex justify-start'>
            <button
              className='bg-primary hover:bg-primary flex justify-center rounded-md
                                                         border border-transparent py-2 px-4 text-sm font-medium
                                                         text-white shadow-sm'
              type='submit'
            >
              <ArrowLeft />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
