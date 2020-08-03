import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';

const Demo = () => {
  const [isOffline, setIsOffline] = useState(false);

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
      .then((data) => console.log({ data }));
  };

  return (
    <Page>
      <div className="content h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Hello World</h1>
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
