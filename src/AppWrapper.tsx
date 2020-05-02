import React, { useEffect, useState } from 'react';

import getApolloClient from './apolloClient';
import App from './App';

export default function AppWrapper() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApolloClient().then((newClient) => {
      setClient(newClient as any);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    if (!client) return;

    const execute = async () => {
      const trackedQueries =
        JSON.parse(
          (window.localStorage.getItem('trackedQueries') as any) || null
        ) || [];

      const promises = trackedQueries.map((trackedQuery: any) => {
        const {
          variables,
          query,
          context,
          //  operationName
        } = trackedQuery;
        return client.mutate({
          context,
          variables,
          mutation: query,
          // update: updateFunctions[operationName],
          optimisticResponse: context.optimisticResponse,
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.log({ error });
      }

      window.localStorage.setItem('trackedQueries', '');
    };

    execute();
  }, [client]);

  return <App client={client} loading={loading} />;
}
