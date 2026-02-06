import { Navigate } from "react-router-dom"; 
import { JSX } from "react";
import { authService } from "../services/authService";

interface Props {
  guest?: boolean;
  children: JSX.Element;
}

const RouteGuard = ({ guest, children }: Props) => {
  const isAuth = authService.isAuthenticated();
 
  if (guest && isAuth) {
    return <Navigate to="/home" replace />;
  }  

  
  if (!guest && !isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteGuard;
