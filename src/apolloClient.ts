import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { CachePersistor } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { setContext } from 'apollo-link-context';
const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

const getApolloClient = async () => {
  const retryLink = new RetryLink({ attempts: { max: Infinity } });
  const queueLink = new QueueLink();
  const tempHttpLink = new HttpLink();

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = authLink.concat(tempHttpLink);

  window.addEventListener('offline', () => queueLink.close());
  window.addEventListener('online', () => queueLink.open());

  const serializingLink = new SerializingLink();

  const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null;

    const context = operation.getContext();
    const trackedQueries =
      JSON.parse(
        (window.localStorage.getItem('trackedQueries') as any) || null
      ) || [];

    if (context.tracked !== undefined) {
      const { operationName, query, variables } = operation;

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      };

      window.localStorage.setItem(
        'trackedQueries',
        JSON.stringify([...trackedQueries, newTrackedQuery])
      );
    }

    return forward(operation).map((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem(
          'trackedQueries',
          JSON.stringify(trackedQueries)
        );
      }

      return data;
    });
  });

  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    httpLink,
  ]);

  const cache = new InMemoryCache();

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as any,
  });

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge();
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  return new ApolloClient({ link, cache });
};

export default getApolloClient;
