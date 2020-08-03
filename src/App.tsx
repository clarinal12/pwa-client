import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ProgressCircular } from 'react-onsenui';
import { ProvideAuth } from 'hooks/useAuth';
import 'onsenui/css/onsenui.css';
import 'styles/tailwind.css';
import 'styles/themes/default.css';
// import Authentication from './pages/Authentication';
import BackgroundSyncDemo from './pages/BackgroundSyncDemo';

interface IAppProps {
  client: any;
  loading: boolean;
}

const App: React.FC<IAppProps> = ({ client, loading }) => {
  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ProgressCircular indeterminate />
      </div>
    );

  return (
    <ApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
        <ProvideAuth client={client}>
          <BackgroundSyncDemo />
        </ProvideAuth>
      </ApolloProvider>
    </ApolloHooksProvider>
  );
};

export default App;
