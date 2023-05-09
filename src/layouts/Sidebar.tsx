import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard, DirectionsBus, MyLocation, People, Settings, Timeline, Lock } from '@material-ui/icons';
import Navbar from 'components/Navbar';
import { ThunkDispatch } from 'redux-thunk';

import { getProfile, userProfile } from '../redux/api/authApi';
import { RootState } from '../redux/store';
import Logout from '../screens/LogoutScreen';

type Props = {
  children: React.ReactNode;
};

function Sidebar({ children }: Props) {
  const [activeLink, setActiveLink] = useState('/overview');
  const location = useLocation();
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

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const authStatus = useSelector((state: any) => state.auth.userStatus);
  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(getProfile());
    }
  }, [authStatus, dispatch]);

  const user = userProfile();
  const { role } = user;

  return (
    <>
      {authStatus !== 'success' ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-14 w-14 animate-spin rounded-full border-y-2 border-gray-900' />
        </div>
      ) : (
        <div className='flex h-screen flex-row justify-end bg-white'>
          <button className='fixed left-0 top-0 z-50 p-4 lg:hidden' onClick={toggleSidebar}>
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
            className={`${
              isOpen ? 'block' : 'hidden'
            } fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50 lg:hidden`}
            onClick={toggleSidebar}
          />
          <div
            className={`${
              isOpen ? 'w-3/5' : 'w-0'
            } fixed inset-y-0 left-0 z-50 flex flex-col justify-between overflow-y-auto bg-primary transition-all duration-300 ease-in-out lg:w-1/5`}
          >
            <div>
              <div className='ml-4 lg:mt-3 lg:text-2xl'>
                <h1 className='font-poppins mx-4 my-2 text-lg font-bold text-white lg:my-6 lg:text-2xl'>Dashboard</h1>
              </div>

              <ul className='mt-10'>
                <li className='group my-2 flex items-center py-2'>
                  <div
                    className={`h-49 mr-4 w-2  ${
                      location.pathname === '/overview'
                        ? 'bg-orange text-orange'
                        : 'text-primary group-hover:bg-orange group-hover:text-orange'
                    }`}
                  >
                    I
                  </div>
                  <Dashboard
                    className={`h-6 w-6 ${
                      location.pathname === '/overview' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  />
                  <Link
                    to='/overview'
                    className={`ml-2 ${
                      location.pathname === '/overview' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  >
                    Overview
                  </Link>
                </li>

                {role === 'admin' || role === 'super_admin' ? (
                  <li className='group my-2  flex items-center py-2'>
                    <div
                      className={`h-49 mr-4 w-2${
                        location.pathname === '/buses'
                          ? 'bg-orange text-orange'
                          : 'group-hover:bg-orange group-hover:text-orange'
                      }`}
                    >
                      l
                    </div>
                    <Lock
                      className={`h-6 w-6 ${
                        location.pathname === '/roles' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    />
                    <Link
                      to='/roles'
                      className={`ml-2 ${
                        location.pathname === '/roles' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    >
                      Roles
                    </Link>
                  </li>
                ) : null}

                {role === 'driver' && (
                  <li className='group my-2  flex items-center py-2'>
                    <div
                      className={`h-49 mr-4 w-2 ${
                        location.pathname === '/map'
                          ? 'bg-orange text-orange'
                          : 'text-primary group-hover:bg-orange group-hover:text-orange'
                      }`}
                    >
                      l
                    </div>
                    <MyLocation
                      className={`h-6 w-6 ${
                        location.pathname === '/map' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    />
                    <Link
                      to='/map'
                      className={`ml-2 ${
                        location.pathname === '/map' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    >
                      Drive
                    </Link>
                  </li>
                )}
                <li className='group my-2  flex items-center py-2'>
                  <div
                    className={`h-49 mr-4 w-2 ${
                      location.pathname === '/buses'
                        ? 'bg-orange text-orange'
                        : 'text-primary group-hover:bg-orange group-hover:text-orange'
                    }`}
                  >
                    l
                  </div>
                  <DirectionsBus
                    className={`h-6 w-6 ${
                      location.pathname === '/buses' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  />
                  <Link
                    to=''
                    className={`ml-2 ${
                      location.pathname === '/buses' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  >
                    Buses
                  </Link>
                </li>

                <li className='group my-2  flex items-center py-2'>
                  <div
                    className={`h-49 mr-4 w-2 ${
                      location.pathname === '/routes'
                        ? 'bg-orange text-orange'
                        : 'text-primary group-hover:bg-orange group-hover:text-orange'
                    }`}
                  >
                    l
                  </div>
                  <Timeline
                    className={`h-6 w-6 ${
                      location.pathname === '/routes' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  />
                  <Link
                    to=''
                    className={`ml-2 ${
                      location.pathname === '/routes' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  >
                    Routes
                  </Link>
                </li>
                {role === 'admin' || role === 'super_admin' ? (
                  <li className='group my-2  flex items-center py-2'>
                    <div
                      className={`h-49 mr-4 w-2${
                        location.pathname === '/buses'
                          ? 'bg-orange text-orange'
                          : 'text-primary group-hover:bg-orange group-hover:text-orange'
                      }`}
                    >
                      l
                    </div>
                    <People
                      className={`h-6 w-6 ${
                        location.pathname === '/register-user' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    />
                    <Link
                      to='/register-user'
                      className={`ml-2 ${
                        location.pathname === '/routes' ? 'text-orange' : 'text-white'
                      } group-hover:text-orange`}
                    >
                      Register
                    </Link>
                  </li>
                ) : null}

                <li className='group my-2  flex items-center py-2'>
                  <div
                    className={`h-49 mr-4 w-2 ${
                      location.pathname === '/update-profile'
                        ? 'bg-orange text-orange'
                        : 'text-primary group-hover:bg-orange group-hover:text-orange'
                    }`}
                  >
                    l
                  </div>

                  <Settings
                    className={`h-6 w-6 ${
                      location.pathname === '/update-profile' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  />
                  <Link
                    to='/update-profile'
                    className={`ml-2 ${
                      location.pathname === '/update-profile' ? 'text-orange' : 'text-white'
                    } group-hover:text-orange`}
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div className='mb-6 ml-5 lg:mb-10'>
              <Logout />
            </div>
          </div>
          <div className='w-full bg-white transition-all duration-300 ease-in-out lg:w-4/5'>
            <Navbar />
            <div className='self-end'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
export default Sidebar;
