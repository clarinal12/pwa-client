import React from 'react';
import usePushNotifications from 'hooks/usePushNotifications';
import { Button } from 'react-onsenui';

const Navigation = () => {
  const renderPage = (route: any, navigator: any) => {
    const props = route.props || {};

    return React.createElement(route.component, { ...props, navigator });
  };

  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSubscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications();

  // return (
  //   // <Navigator
  //   //   initialRoute={{ component: Main, props: { key: 'main' } }}
  //   //   renderPage={(route, navigator) => renderPage(route, navigator)}
  //   // />
  //   <div className="h-screen flex align-items-center justify-content-center">
  //     <Button onClick={() => onClickAskUserPermission()}>
  //       Ask user permission
  //     </Button>
  //   </div>
  // );

  return (
    <div>
      {error && (
        <section className="app-error">
          <h2>{error.name}</h2>
          <p>Error message : {error.message}</p>
          <p>Error code : {error.code}</p>
        </section>
      )}
      {loading && 'Loading, please stand by'}
      <p>
        Push notification are {!pushNotificationSupported && 'NOT'} supported by
        your device.
      </p>
      <p>
        User consent to recevie push notificaitons is{' '}
        <strong>{userConsent}</strong>.
      </p>
      <div className="mt-5">
        <Button onClick={() => onClickAskUserPermission()}>
          Ask user permission
        </Button>{' '}
        <Button onClick={() => onClickSubscribeToPushNotification()}>
          Create Notification subscription
        </Button>{' '}
        <Button onClick={() => onClickSendSubscriptionToPushServer()}>
          Send subscription to push server
        </Button>{' '}
        <Button onClick={() => onClickSendNotification()}>
          Send a notification
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
