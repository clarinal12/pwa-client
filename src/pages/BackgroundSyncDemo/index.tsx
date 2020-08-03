import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';

const Demo = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsOffline(true);
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
          {isOffline ? (
            <Button>Download for Later</Button>
          ) : (
            <Button onClick={() => getQuote()}>Read Quote</Button>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Demo;
