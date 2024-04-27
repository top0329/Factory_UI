import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useWeb3 from '../hooks/useWeb3';
import { GuardProps } from '../types';

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
