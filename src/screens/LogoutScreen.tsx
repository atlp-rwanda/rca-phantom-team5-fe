import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/api/authApi';


const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout() as any);
    
    // Redirect the user to the login screen or home page
  };

  return (
    <div className="mt-6">
      <div className="border-t ml-3 mb-6 w-3/4"></div>
      <div className="flex items-center justify-start px-4 py-2 text-sm font-medium text-white">
        <div className="ml-5 flex">
          <div className="mr-1">
            <FaExchangeAlt />
          </div>
          <button onClick={handleLogout} className="ml-1">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
