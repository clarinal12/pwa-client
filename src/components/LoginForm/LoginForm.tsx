import React, { useState } from 'react';
import { Input, Button, AlertDialog } from 'react-onsenui';
import { useFormik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import { loginSchema } from './validationSchema';

const LoginForm = () => {
  const { signIn, signingIn } = useAuth();
  const [alert, toggleAlert] = useState({
    open: false,
    title: '',
    message: '',
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      const { email, password } = values;
      signIn(email, password);
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
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          name="email"
          className="w-full mt-4"
          modifier="material"
          type="email"
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
          <button
            disabled={signingIn}
            className="button w-full text-center"
            type="submit"
          >
            {signingIn ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
