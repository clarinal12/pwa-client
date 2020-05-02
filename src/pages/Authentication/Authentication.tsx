import React from 'react';
import { useAuth } from 'hooks/useAuth';
import Navigation from 'pages/Navigation';
import Login from 'pages/Login';

const Authentication = () => {
  const { userToken }: any = useAuth();

  if (userToken) return <Navigation />;

  return <Login />;
};

export default Authentication;
