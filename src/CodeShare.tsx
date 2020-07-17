import React from 'react';

const registerSync = () => {
  navigator.serviceWorker.ready
    .then((serviceWorker) => {
      serviceWorker.sync.register('awesome-sync');
      console.log('Sync registered success');
    })
    .catch((error) => console.log('Sync register failed', { error }));
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
  return (
    <div>
      <p>Service worker's Notification and Background sync</p>
      <br></br>
      <button onClick={() => askNotificationPermission()}>
        Allow Notifications
      </button>
      <br></br>
      <br></br>
      <button onClick={() => registerSync()}>Register Sync</button>
    </div>
  );
}
