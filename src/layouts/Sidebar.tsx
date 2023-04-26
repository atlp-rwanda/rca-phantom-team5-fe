import React, { useEffect, useState } from 'react';
import Logout from '../screens/LogoutScreen';
import { Dashboard, DirectionsBus, Settings, Timeline } from '@material-ui/icons';
import '../../src/assets/custom.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex h-screen bg-white'>
      {/* Sidebar toggle button */}
      <button className='fixed right-0 top-0 z-50 p-4 lg:hidden' onClick={toggleSidebar}>
        <svg
          className='h-6 w-6 text-gray-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          {isOpen ? (
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          ) : (
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          )}
        </svg>
      </button>
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 z-40 h-full w-full bg-black opacity-50 lg:hidden`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`${
          isOpen ? 'w-3/5' : 'w-0'
        } fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between overflow-y-auto bg-primary transition-all duration-300 ease-in-out lg:w-1/5`}
      >
        <nav className='mt-6 mb-4 lg:mt-10 lg:text-2xl'>
          <h1 className='font-poppins mx-4 mt-6 text-lg text-sm font-bold text-white lg:mt-10 lg:text-2xl'>
            Dashboard
          </h1>
        </nav>
        <div>
          <ul className='mx-4 mt-3 lg:mt-2'>
            <li className='my-2 flex items-center py-2'>
              <Dashboard className='mr-4 mt-1 h-6 w-6 text-white' />
              <a href='' className=' group ml-2 text-white'>
                Overview
              </a>
            </li>
            <li className='my-2 flex items-center py-2'>
              <div className='group flex items-center '>
                <DirectionsBus className='h-6 w-6 text-white' />
                <a href='' className='ml-2 text-white'>
                  Buses
                </a>
              </div>
            </li>
            <li className='my-2 flex items-center py-2'>
              <Timeline className='h-6 w-6 text-white' />
              <a href='' className='group ml-2 text-white'>
                Routes
              </a>
            </li>
            <li className='my-2 flex items-center py-2'>
              <Dashboard className='mr-4 h-6 w-6 text-white' />
              <a href='' className='group ml-2 text-white'>
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div className='ml-5 mb-6 lg:mb-10'>
          <Logout />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'ml-4 w-4/5' : 'ml-0 w-full'
        } fixed top-0 bottom-0 right-0 overflow-y-auto bg-white transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};
export default Sidebar;
