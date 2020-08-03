/* eslint-disable no-restricted-globals */
const cacheName = 'v1';

const URL = 'https://programming-quotes-api.herokuapp.com/quotes/random';

function openPushNotification(event) {
  console.log(
    '[Service Worker] Notification click Received.',
    event.notification.data
  );

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

function handleSync(event) {
  console.log('[Service Worker] Sync Received.', event);

  if (event.tag === 'quote-sync') {
    fetch(URL).then((response) => {
      console.log({ response });
      caches.open(cacheName).then((cache) => {
        cache.put(URL, response.clone());
      });
    });

    const options = {
      requireInteraction: true,
      data: 'https://pwa-client.netlify.app',
      body: '',
      icon: 'https://via.placeholder.com/128/ff0000',
      vibrate: [200, 100, 200],
      badge: 'https://via.placeholder.com/128/ff0000',
      actions: [
        {
          action: 'Detail',
          title: 'View',
        },
      ],
    };

    console.log('Showing Notification...');
    event.waitUntil(self.registration.showNotification('Nice Title', options));
  }
}

function handleFetch(event) {
  console.log('[Service Worker] Fetch Received.', event);

  const requestUrl = new URL(event.request.url);
  if (requestUrl.hostname === 'programming-quotes-api.herokuapp.com') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log('Return response from cache');
          return response;
        }

        console.log('Return response from network');
        return fetch(event.request);
      })
    );
  }
}

// Installation
self.addEventListener('notificationclick', openPushNotification);
self.addEventListener('sync', handleSync);
self.addEventListener('fetch', handleFetch);
