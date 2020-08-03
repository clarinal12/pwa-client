import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';

const Demo = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [syncFired, setSyncFired] = useState(false);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOffline(true);
      setQuoteData(null);
    });

    return () => {
      window.removeEventListener('offline', () => {});
    };
  }, []);

  const askNotificationPermission = () => {
    Notification.requestPermission().then((consent) => {
      if (consent !== 'granted') {
        console.log('Permission not Granted');
      } else {
        console.log('Permission Granted');
      }
    });
  };

  const getQuote = () => {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then((response) => response.json())
      .then((data) => setQuoteData(data));
  };

  const fireSync = () => {
    navigator.serviceWorker.ready
      .then((serviceWorker) => {
        serviceWorker.sync.register('quote-sync');
        setSyncFired(true);
        console.log('Sync registered success');
      })
      .catch((error) => console.log('Sync register failed', { error }));
  };

  return (
    <Page>
      <div className="content h-screen w-screen flex items-center justify-center">
        <Button
          onClick={() => askNotificationPermission()}
          style={{ position: 'absolute', left: 20, top: 20 }}
        >
          Allow Notifications
        </Button>
        <div className="text-center">
          {quoteData ? (
            <>
              <h1>{quoteData.en}</h1>
              <h3>- {quoteData.author}</h3>
            </>
          ) : (
            <h4>Press button to get a quote</h4>
          )}
          <br></br>
          {isOffline && !syncFired && (
            <Button onClick={() => fireSync()}>Download for Later</Button>
          )}
          {!isOffline && !syncFired && (
            <Button onClick={() => getQuote()}>Read Quote</Button>
          )}
          {syncFired && <h4>Quote will be downloaded once you go online.</h4>}
        </div>
      </div>
    </Page>
  );
};

export default Demo;
