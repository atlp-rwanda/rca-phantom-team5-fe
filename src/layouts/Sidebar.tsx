import React, { useEffect, useState } from 'react';
import Logout from '../components/Logout';
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
    <div className="flex h-screen bg-white">
      {/* Sidebar toggle button */}
      <button
        className="lg:hidden fixed z-50 right-0 top-0 p-4"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40 lg:hidden`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`${
          isOpen ? 'w-3/5' : 'w-0'
        } lg:w-1/5 bg-primary fixed top-0 bottom-0 left-0 flex flex-col justify-between z-50 overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        <nav className="mt-6 mb-10">
          <h1 className="mx-4 mt-6 text-white text-lg font-bold font-poppins lg:mt-10 lg:text-2xl text-sm">
            Dashboard
          </h1>
          <ul className="mx-4 mt-4 lg:mt-6">
          </ul>
        </nav>
        <div className="ml-5 mb-6 lg:mb-10">
          <Logout />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'ml-4 w-4/5' : 'ml-0 w-full'
        } bg-white fixed top-0 bottom-0 right-0 overflow-y-auto transition-all duration-300 ease-in-out`}
      >
      </div>
    </div>
  );
};
export default Sidebar;