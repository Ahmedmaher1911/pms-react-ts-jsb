import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface AuthData {
  token?: string; 
}

interface ProtectedRouteProps {
  loginData: AuthData | null; 
  children: ReactNode; 
}

export default function ProtectedRoute({ loginData, children }: ProtectedRouteProps) {
  
  if (localStorage.getItem('token') || loginData?.token) {
    return <>{children}</>; 
  } else {
    return <Navigate to="/Login" />; 
  }
}
