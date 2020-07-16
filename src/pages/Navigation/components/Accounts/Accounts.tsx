import React from 'react';
import usePushNotifications from 'hooks/usePushNotifications';

const PushNotifExample = () => {
  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSubscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    error,
    loading,
  } = usePushNotifications();

  return (
    <div className="content" style={{ padding: 20 }}>
      <div className="mt-5">
        {error && (
          <section className="app-error">
            <h2>{error.name}</h2>
            <p>Error message : {error.message}</p>
            <p>Error code : {error.code}</p>
          </section>
        )}
        {loading && 'Loading, please stand by'}
        <br></br>
        <p>
          Push notification are {!pushNotificationSupported && 'NOT'} supported
          by your device.
        </p>
        <br></br>
        <p>
          User consent to receive push notification is{' '}
          <strong>{userConsent}</strong>.
        </p>
        <br></br>
        {pushServerSubscriptionId && (
          <p>
            Subscription ID: <b>{pushServerSubscriptionId}</b>
          </p>
        )}
        <div className="mt-5">
          <button onClick={() => onClickAskUserPermission()}>
            Ask user permission
          </button>
          <br></br>
          <button onClick={() => onClickSubscribeToPushNotification()}>
            Create notification subscription
          </button>
          <br></br>
          <button onClick={() => onClickSendSubscriptionToPushServer()}>
            Send subscription to push server
          </button>
        </div>
      </div>
    </div>
  );
};

export default PushNotifExample;
