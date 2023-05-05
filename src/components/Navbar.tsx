import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userProfile } from '../redux/api/authApi';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.auth.userInfo);

  return (
    <nav className='bg-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 justify-end'>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='relative ml-3 cursor-pointer'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15 6.66666C15 5.34057 14.4732 4.0688 13.5355 3.13112C12.5979 2.19344 11.3261 1.66666 10 1.66666C8.67392 1.66666 7.40215 2.19344 6.46447 3.13112C5.52678 4.0688 5 5.34057 5 6.66666C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66666Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.4419 17.5C11.2954 17.7526 11.0851 17.9622 10.8321 18.1079C10.5791 18.2537 10.2922 18.3304 10.0003 18.3304C9.70828 18.3304 9.42142 18.2537 9.16841 18.1079C8.91539 17.9622 8.7051 17.7526 8.55859 17.5'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='relative ml-3'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary'
              >
                <span className='font-medium text-orange'>
                  {user.fname.charAt(0).toUpperCase() + user.lname.charAt(0).toUpperCase()}
                </span>
              </div>
              {isOpen && (
                <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Link to='/update-profile' className='block px-4 py-2 text-sm text-gray-700'>
                    Update Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
