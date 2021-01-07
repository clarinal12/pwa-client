import React, { createContext, useContext, useState, useEffect } from 'react';
import useFirebase from 'hooks/useFirebase';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { firebase } = useFirebase();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [firebase]);

  const signIn = (email: string, password: string) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  return {
    signIn,
    signingIn: loading,
    user,
  };
};

interface IProvideAuthProps {
  children: React.ReactNode;
}

export const ProvideAuth: React.FC<IProvideAuthProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
