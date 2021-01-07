import React from 'react';
import { ProvideAuth } from 'hooks/useAuth';
import 'onsenui/css/onsenui.css';
import 'styles/tailwind.css';
import 'styles/themes/default.css';
import Authentication from './pages/Authentication';

const App = () => {
  return (
    <ProvideAuth>
      <Authentication />
    </ProvideAuth>
  );
};

export default App;
