import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';

const URL = 'https://programming-quotes-api.herokuapp.com/quotes/random';

const Demo = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [syncFired, setSyncFired] = useState(false);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOffline(true);
      setQuoteData(null);
      setSyncFired(false);
    });

    window.addEventListener('online', () => {
      setIsOffline(false);
      setQuoteData(null);
      setSyncFired(false);
    });

    return () => {
      window.removeEventListener('offline', () => {});
      window.removeEventListener('online', () => {});
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
    fetch(URL)
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
          {isOffline && <h4>You are offline</h4>}
          {quoteData && !isOffline && (
            <>
              <h1>{quoteData.en}</h1>
              <h3>- {quoteData.author}</h3>
            </>
          )}
          {!quoteData && !isOffline && <h4>Press the button to get a quote</h4>}
          <br></br>
          {isOffline && !syncFired && (
            <Button onClick={() => fireSync()}>Download for Later</Button>
          )}
          {!isOffline && !syncFired && (
            <Button onClick={() => getQuote()}>Read New Quote</Button>
          )}
          {syncFired && isOffline && (
            <h4>Quote will be downloaded once you go online.</h4>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Demo;
