import React, { useEffect } from 'react';

const registerSync = () => {
  navigator.serviceWorker.ready
    .then((serviceWorker) => {
      serviceWorker.sync.register('now-online');
    })
    .catch((error) => console.log({ error }));
};

export default function AppWrapper() {
  useEffect(() => {
    registerSync();
  }, []);

  return <div>Hello World</div>;
}
