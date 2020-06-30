/* eslint-disable no-restricted-globals */
function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.', event);

  const {
    tag,
    // image, url, title, text
  } = event.data.json();

  const options = {
    data:
      'https://developers.google.com/web/fundamentals/push-notifications/display-a-notification#icon',
    body: 'Notification Body Text',
    icon: 'https://via.placeholder.com/128/ff0000',
    vibrate: [200, 100, 200],
    tag,
    // image,
    badge: 'https://via.placeholder.com/128/ff0000',
    actions: [
      {
        action: 'Detail',
        title: 'View',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  console.log(
    '[Service Worker] Notification click Received.',
    event.notification.data
  );

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);
