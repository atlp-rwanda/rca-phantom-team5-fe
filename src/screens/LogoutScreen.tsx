import React from 'react';
import { IoSwapHorizontalSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { logout } from '../redux/api/authApi';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(logout() as any);
    navigate('/login');
  };

  return (
    <div className='mt-4'>
      <div className='ml-3 mb-6 w-3/4 border-t' />
      <div className='flex items-center  px-4 py-2 text-sm font-medium text-white'>
        <div className='ml-5 flex'>
          <div className='mr-1'>
            <IoSwapHorizontalSharp />
          </div>
          <button onClick={handleLogout} className='ml-1'>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
