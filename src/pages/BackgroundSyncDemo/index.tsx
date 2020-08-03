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

  const getQuote = () => {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then((response) => response.json())
      .then((data) => setQuoteData(data));
  };

  const fireSync = () => {
    navigator.serviceWorker.ready.then((swRegistration) => {
      setSyncFired(true);
      return swRegistration.sync.register('quote-sync');
    });
  };

  return (
    <Page>
      <div className="content h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          {quoteData ? (
            <>
              <h1>{quoteData.en}</h1>
              <h3>{quoteData.author}</h3>
            </>
          ) : (
            <h4>Press button to get a quote</h4>
          )}
          <br></br>
          {isOffline && !syncFired ? (
            <Button onClick={() => fireSync()}>Download for Later</Button>
          ) : (
            <Button onClick={() => getQuote()}>Read Quote</Button>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Demo;
