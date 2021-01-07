import React from 'react';
import { useAuth } from 'hooks/useAuth';
import Navigation from 'pages/Navigation';
import Login from 'pages/Login';
import { ProgressCircular } from 'react-onsenui';

const Authentication = () => {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ProgressCircular indeterminate />
      </div>
    );
  }

  if (user) return <Navigation />;

  return <Login />;
};

export default Authentication;
