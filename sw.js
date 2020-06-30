/* eslint-disable no-restricted-globals */
function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.', event);

  const {
    image = 'https://via.placeholder.com/128/ff0000',
    tag = 'my-tag',
    url = 'https://developers.google.com/web/fundamentals/push-notifications/display-a-notification#icon',
    title = 'Notification Title',
    text = 'Notification Body Text',
  } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag,
    image,
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
