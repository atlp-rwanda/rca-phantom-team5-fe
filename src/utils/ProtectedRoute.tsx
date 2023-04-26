import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = (children: any) => {
  const user = useSelector((state: any) => state.auth);
  const token = localStorage.getItem('userToken');
  let location = useLocation();
  console.log(token);

  if (token === null) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
