import React from 'react';
import { Navigator, Button } from 'react-onsenui';
import usePushNotifications from 'hooks/usePushNotifications';

const Test = () => {
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
        User consent to receive push notifications is{' '}
        <strong>{userConsent}</strong>.
      </p>
      <button onClick={() => onClickAskUserPermission()}>
        Ask user permission
      </button>
      <button onClick={() => onClickSubscribeToPushNotification()}>
        Create Notification subscription
      </button>
      <button onClick={() => onClickSendSubscriptionToPushServer()}>
        Send subscription to push server
      </button>
      <button onClick={() => onClickSendNotification()}>
        Send a notification
      </button>
    </div>
  );
};

export default Test;
