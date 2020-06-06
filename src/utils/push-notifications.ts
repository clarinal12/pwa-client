const pushServerPublicKey =
  'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8';

/**
 * checks if Push notification and service workers are supported by your browser
 */
const isPushNotificationSupported = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
const askUserPermission = async () => {
  return await Notification.requestPermission();
};
/**
 * shows a notification
 */
const sendNotification = () => {
  const img = '/logo192.png';
  const text = 'Take a look at this brand new t-shirt!';
  const title = 'New Product Available';
  const options = {
    body: text,
    icon: '/logo192.png',
    vibrate: [200, 100, 200],
    tag: 'new-product',
    image: img,
    badge: 'https://spyna.it/icons/android-icon-192x192.png',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
    ],
  };
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
};

/**
 *
 */

/**
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
const createNotificationSubscription = async () => {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
};

/**
 * returns the subscription if present or nothing
 */
const getUserSubscription = () => {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
};

export {
  isPushNotificationSupported,
  askUserPermission,
  sendNotification,
  createNotificationSubscription,
  getUserSubscription,
};
