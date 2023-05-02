import React, { ReactNode, useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';

type Props = {
  children: JSX.Element;
};

export default function AuthLayout({ children }: Props) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <div className='grid h-screen grid-cols-12'>
      <Sidebar />
      <div className='col-span-10 w-full bg-white'>{children}</div>
    </div>
  );
}
