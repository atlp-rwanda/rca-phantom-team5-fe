import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { SwapHorizSharp } from '@material-ui/icons';
import Button from 'components/Button';

import { logout } from '../redux/api/authApi';

export default function Logout() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(logout() as any);
    window.history.replaceState(null, '', '/');
    window.location.replace('/');
  };

  return (
    <div>
      <ul className='mt-1'>
        <div className='ml-3 mb-6 w-3/4 border-t' />
        <li className='group my-2  flex items-center py-2'>
          <div className='h-49 bg-primary text-primary group-hover:bg-orange group-hover:text-orange ml-0 mr-2 w-2'>
            l
          </div>
          <SwapHorizSharp className='group-hover:text-orange ml-4 h-6  w-6 text-white' />
          <button onClick={handleLogout} className='group-hover:text-orange ml-2 text-white'>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
