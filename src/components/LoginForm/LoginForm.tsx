import React, { useState } from 'react';
import { Input, Button, AlertDialog } from 'react-onsenui';
import { useFormik } from 'formik';
import { AUTH } from 'mutations/authentication';
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from 'hooks/useAuth';
import { loginSchema } from './validationSchema';

const LoginForm = () => {
  const [alert, toggleAlert] = useState({
    open: false,
    title: '',
    message: '',
  });
  const { setUserToken }: any = useAuth();
  const [login, { loading }] = useMutation(AUTH, {
    onCompleted: (result) => {
      const { auth } = result;
      setUserToken(auth.token);
    },
    onError: (err) => {
      const { message } = err;
      toggleAlert({
        open: true,
        title: 'Login Error',
        message,
      });
    },
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: (values) => {
      const { username, password } = values;
      login({
        variables: { username, password },
      });
    },
    validationSchema: loginSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values } = formik;

  return (
    <div>
      {alert.open && (
        <AlertDialog
          onCancel={() => toggleAlert({ ...alert, open: false })}
          isOpen
          isCancelable
          modifier="material"
        >
          <div className="alert-dialog-title">{alert.title}</div>
          <div className="alert-dialog-content">{alert.message}</div>
          <div>
            <Button
              onClick={() => toggleAlert({ ...alert, open: false })}
              className="alert-dialog-button"
            >
              OK
            </Button>
          </div>
        </AlertDialog>
      )}
      <form className="p-10" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          float
          value={values.username}
          onChange={handleChange}
          placeholder="Username"
          name="username"
          className="w-full mt-4"
          modifier="material"
        />
        <Input
          float
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          name="password"
          className="w-full mt-8"
          modifier="material"
        />
        <div className="mt-6 w-full text-right">
          <button disabled={loading} className="button w-full text-center" type="submit">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
