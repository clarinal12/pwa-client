import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { ME } from 'queries/me';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = (client: any) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [userDetails, setUserDetails] = useState({});

  const { data = {}, refetch } = useQuery(ME, {
    onCompleted: (response: any) => {
      setUserDetails(response.me);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.me && token) {
      setUserDetails(data.me);
    }
  }, [userDetails, data, token]);

  const setUserToken = (newToken: string) => {
    window.localStorage.setItem('token', newToken);
    setToken(newToken);
    refetch();
  };

  const signOut = () => {
    return new Promise((resolve) => {
      setToken(null);
      setUserDetails({});
      window.localStorage.clear();
      client.clearStore();
      resolve(true);
    });
  };

  return {
    userToken: token,
    setUserToken,
    userDetails,
    signOut,
  };
};

interface IProvideAuthProps {
  children: React.ReactNode;
  client: any;
}

export const ProvideAuth: React.FC<IProvideAuthProps> = ({
  children,
  client,
}) => {
  const auth = useProvideAuth(client);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
