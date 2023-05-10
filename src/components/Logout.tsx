import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
const Logout = () => {
  return (
    <div className="mt-6">
  <div className="border-t ml-3 mb-6 w-3/4"></div>
  <div className="flex items-center justify-start px-4 py-2 text-sm font-medium text-white">
    <div className="ml-5 flex">
    <div className="mr-1">
        <FaExchangeAlt />
      </div>
      <a href="#logout" className="ml-1">
        Log out
      </a>
    </div>
  </div>
</div>
  );
};
export default Logout;