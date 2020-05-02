import React from 'react';
import { Page } from 'react-onsenui';
import LoginForm from 'components/LoginForm';

const Login = () => {
  return (
    <Page>
      <div className="content h-screen w-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </Page>
  );
};

export default Login;
