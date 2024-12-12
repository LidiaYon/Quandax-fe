import { Navigate, useLocation } from 'react-router-dom';

import { isTokenValid } from '../../utils/session.utils';


interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isValid } = isTokenValid();
 
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  

  return children;
};