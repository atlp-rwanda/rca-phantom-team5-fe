import React from 'react';

export default function RequestPasswordReset() {
  return (
    <div className='bg-primary'>
      <div className='flex min-h-screen flex-col justify-center  py-12 sm:px-6 lg:px-8 '>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10'>
            <div className='pb-8'>
              <h2 className='mt-1 text-center text-lg text-black'>Reset Your Password</h2>
            </div>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label htmlFor='password' className='block text-sm  text-gray-700'>
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Enter your email'
                    className='focus:primar focus:border-primary block w-full appearance-none rounded-md border border-gray-300 px-3
                    py-2 shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-none
                   focus:placeholder:text-gray-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='bg-primary hover:bg-primary flex w-full justify-center rounded-md
                   border border-transparent py-2 px-4 text-sm font-medium
                    text-white shadow-sm'
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
