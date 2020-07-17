import React, { useEffect } from 'react';

const registerSync = () => {
  navigator.serviceWorker.ready
    .then((serviceWorker) => {
      serviceWorker.sync.register('now-online');
    })
    .catch((error) => console.log({ error }));
};

const askNotificationPermission = () => {
  Notification.requestPermission().then((consent) => {
    if (consent !== 'granted') {
      console.log('Permission not Granted');
    } else {
      console.log('Permission Granted');
    }
  });
};

export default function AppWrapper() {
  useEffect(() => {
    registerSync();
  }, []);

  return (
    <div>
      <p>Hello World</p>
      <br></br>
      <button onClick={() => askNotificationPermission()}>
        Allow Notifications
      </button>
    </div>
  );
}
