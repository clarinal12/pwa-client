/* eslint-disable no-restricted-globals */

function handleSync(event) {
  console.log('[Service Worker] Notification click Received.', event);

  // event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('sync', handleSync);
