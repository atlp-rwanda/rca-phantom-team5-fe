import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from 'redux/store';

type Props = {
  children: React.ReactNode;
  redirectPath: string;
};

const PrivateRoute = ({ children, redirectPath }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthonticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children as React.ReactNode;
};

export default PrivateRoute;
