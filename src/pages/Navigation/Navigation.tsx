import React from 'react';
import { Navigator } from 'react-onsenui';
import Main from './components/Main';

const Navigation = () => {
  const renderPage = (route: any, navigator: any) => {
    const props = route.props || {};

    return React.createElement(route.component, { ...props, navigator });
  };

  return (
    <Navigator
      initialRoute={{ component: Main, props: { key: 'main' } }}
      renderPage={(route, navigator) => renderPage(route, navigator)}
    />
  );
};

export default Navigation;
