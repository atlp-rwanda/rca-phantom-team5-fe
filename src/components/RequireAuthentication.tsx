// function to check if user is signed in

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from 'redux/store';

type Props = {
  element: React.ReactElement;
  path: string;
};

const RequireAuthentication = ({ element, path }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <Route path={path} element={element} />;
};

export default RequireAuthentication;
