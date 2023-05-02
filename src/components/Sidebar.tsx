import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard, DirectionsBus, Settings, Timeline } from '@material-ui/icons';

import Logout from '../screens/LogoutScreen';

export default function Sidebar() {
  const path = useLocation().pathname;
  const items = [
    {
      title: 'Overview',
      link: '/dashboard',
      icon: (
        <Dashboard
          className={`h-6 w-6 ${path === '/dashboard' ? 'text-orange' : 'text-white'} group-hover:text-orange`}
        />
      ),
    },
    {
      title: 'Buses',
      link: '/buses',
      icon: (
        <DirectionsBus
          className={`h-6 w-6 ${path === '/buses' ? 'text-orange' : 'text-white'} group-hover:text-orange`}
        />
      ),
    },
    {
      title: 'Routes',
      link: '/routes',
      icon: (
        <Timeline className={`h-6 w-6 ${path === '/routes' ? 'text-orange' : 'text-white'} group-hover:text-orange`} />
      ),
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: (
        <Settings
          className={`h-6 w-6 ${path === '/settings' ? 'text-orange' : 'text-white'} group-hover:text-orange`}
        />
      ),
    },
  ];
  return (
    <div className='col-span-2 flex flex-col justify-between bg-primary'>
      <div className='gap-30 flex flex-col'>
        <h1 className='font-poppins mx-4 my-2 text-2xl font-bold text-white lg:my-6 lg:text-2xl'>Dashboard</h1>
        <ul>
          {items.map((item, index) => (
            <li key={item.title} className='group my-2 flex items-center py-2'>
              <div
                className={`h-49 mr-4 w-2 ${
                  path === item.link ? 'bg-orange text-orange' : 'group-hover:bg-orange group-hover:text-orange'
                }`}
              >
                I
              </div>
              {item.icon}
              <Link
                to={item.link}
                className={`ml-2 ${path === item.link ? 'text-orange' : 'text-white'} group-hover:text-orange`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='ml-5 mb-6 lg:mb-10'>
        <Logout />
      </div>
    </div>
  );
}
