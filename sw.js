/* eslint-disable no-restricted-globals */

function handleSync(event) {
  console.log('[Service Worker] Sync Received.', event);

  const options = {
    data:
      'https://developers.google.com/web/fundamentals/push-notifications/display-a-notification#icon',
    body: 'Nice Body',
    icon: 'https://via.placeholder.com/128/ff0000',
    vibrate: [200, 100, 200],
    tag: event.tag,
    badge: 'https://via.placeholder.com/128/ff0000',
    actions: [
      {
        action: 'Detail',
        title: 'View',
      },
    ],
  };

  if (event.tag === 'awesome-sync') {
    event.waitUntil(self.registration.showNotification('Nice Title', options));
  }
}

self.addEventListener('sync', handleSync);
