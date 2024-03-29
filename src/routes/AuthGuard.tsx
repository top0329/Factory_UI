import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GuardProps } from '../types';
import useWeb3 from '../hooks/useWeb3';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isConnected) {
      navigate(-1);
    }
  }, [isConnected, navigate, location]);

  return children;
};

export default AuthGuard;
