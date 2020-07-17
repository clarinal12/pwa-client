/* eslint-disable no-restricted-globals */

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

  const options = {
    requireInteraction: true,
    data:
      'https://developers.google.com/web/fundamentals/push-notifications/display-a-notification#icon',
    body: 'Nice Body',
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

  if (event.tag === 'awesome-sync') {
    console.log('Showing Notification...');
    event.waitUntil(self.registration.showNotification('Nice Title', options));
  }
}

self.addEventListener('notificationclick', openPushNotification);
self.addEventListener('sync', handleSync);
