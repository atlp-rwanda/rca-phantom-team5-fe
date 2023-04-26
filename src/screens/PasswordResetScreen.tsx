import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getError } from '../utils/error';

export default function PasswordReset() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords don't match.");
      return;
    }
    try {
      const { data } = await axios.put(`http://localhost:3000/api/auth/reset-password/${token}`, {
        password,
      });
      console.log(`${data} Password updated successfully`);
      navigate('/login');
      console.log(data.message);
    } catch (error) {
      console.log(getError(error));
    }
  };
  return (
    <div className='bg-primary'>
      <div className='flex min-h-screen flex-col justify-center  py-12 sm:px-6 lg:px-8 '>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='pb-12'>
              <h2 className='mt-1 text-center text-xl text-black'>Create a new password</h2>
              <p className='max-w mt-2 text-center text-sm text-primary'>
                Or{' '}
                <a href='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  sign in to your account
                </a>
              </p>
            </div>
            <form className='space-y-6' onSubmit={submitHandler}>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  New password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='focus:primar focus:border-primary block w-full appearance-none rounded-md border border-gray-300 px-3
                            py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                             focus:placeholder:text-gray-500 sm:text-sm'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='confirm_password' className='block text-sm font-medium text-gray-700'>
                  Confirm new password
                </label>
                <div className='mt-1'>
                  <input
                    id='confirm_password'
                    name='confirm_password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='focus:primar focus:border-primary block w-full appearance-none rounded-md border border-gray-300 px-3
                                          py-2 shadow-sm placeholder:text-gray-400 focus:outline-none
                                          focus:placeholder:text-gray-500 sm:text-sm'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
