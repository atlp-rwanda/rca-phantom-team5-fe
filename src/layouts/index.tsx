import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex flex-1 flex-col'>{children}</main>
    </div>
  );
}
