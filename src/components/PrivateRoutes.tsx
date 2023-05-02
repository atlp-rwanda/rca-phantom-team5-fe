import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from 'redux/store';

type Props = {
  children: React.ReactNode;
  path: string;
};

const PrivateRoute = ({ children, path }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthonticated);

  if (!isAuthenticated) {
    return <Navigate to={path} />;
  }

  return children as React.ReactNode;
};

export default PrivateRoute;
