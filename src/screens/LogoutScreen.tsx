import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/api/authApi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { SwapHorizSharp } from '@material-ui/icons';
import Button from 'components/Button';

const Logout = () => {
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
        <div className='ml-3 mb-6 w-3/4 border-t'></div>
        <li className='group my-2  flex items-center py-2'>
          <div className='h-49 ml-0 mr-2 w-2 bg-primary text-primary group-hover:bg-orange group-hover:text-orange'>
            l
          </div>
          <SwapHorizSharp className='ml-4 h-6 w-6  text-white group-hover:text-orange' />
          <button onClick={handleLogout} className='ml-2 text-white group-hover:text-orange'>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
