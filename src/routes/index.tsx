import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import AuthRoutes from './auth.routes';
import PrivateRoutes from './private.routes';

const Routes: React.FC = () => {
  const { loading, signed } = useAuth();

  if (loading) return <Loader />;

  return (
    <BrowserRouter>{signed ? <PrivateRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
};

export default Routes;
