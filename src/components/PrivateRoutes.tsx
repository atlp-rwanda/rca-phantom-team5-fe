import { Navigate, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

type Props = {
  children: React.ReactNode;
  redirectPath: string;
};

type User = {
  user_id: string;
  exp: number;
  iat: number;
};

const PrivateRoute = ({ children, redirectPath }: Props) => {
  const token = localStorage.getItem('userToken');
  let user: User = jwt_decode(token!);

  if (!user.user_id) {
    return <Navigate to={redirectPath} />;
  }

  return children as React.ReactElement;
};

export default PrivateRoute;
