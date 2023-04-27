import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from 'utils/url';
import { userProfile } from '../redux/api/authApi';

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(true);

  const data = userProfile();

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-primary '>
      <div className='rounded bg-white px-16 py-16 '>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='border-gray-300 py-1 text-base'>You have been Logged in successfully</p>
        <p className='border-blue-300 py-1 text-base text-blue-600'>
          {data.data.role === 'admin' || data.data.role === 'super_admin' ? (
            <Link to='/register-user'> Register User</Link>
          ) : (
            <div></div>
          )}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
