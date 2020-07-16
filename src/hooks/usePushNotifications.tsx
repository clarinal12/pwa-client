import { useState, useEffect } from 'react';
import http from '../utils/http';

import {
  isPushNotificationSupported,
  askUserPermission,
  createNotificationSubscription,
  getUserSubscription,
} from 'utils/push-notifications';

/**
 * Check if the push notifications are supported by the browser
 */
const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  /**
   * Notification.permission is a JavaScript native function that return the current state of the permission
   */
  const [userConsent, setUserConsent] = useState(Notification.permission);

  const [userSubscription, setUserSubscription] = useState(null);

  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  /**
   * Retrieve if there is any push notification subscription for the registered service worker
   */
  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExistingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoading(false);
    };
    getExistingSubscription();
  }, []);

  const onClickAskUserPermission = () => {
    setLoading(true);
    setError(false);
    askUserPermission().then((consent) => {
      setUserConsent(consent);
      if (consent !== 'granted') {
        setError({
          name: 'Consent denied',
          message: 'You denied the consent to receive notifications',
          code: 0,
        });
      }
      setLoading(false);
    });
  };

  /**
   * define a click handler that creates a push notification subscription.
   * Once the subscription is created, it uses the setUserSubscription hook
   */
  const onClickSubscribeToPushNotification = () => {
    setLoading(true);
    setError(false);
    createNotificationSubscription()
      .then(function (subscription) {
        console.log({ subscription });
        setUserSubscription(subscription);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Couldn't create the notification subscription",
          err,
          'name:',
          err.name,
          'message:',
          err.message,
          'code:',
          err.code
        );
        setError(err);
        setLoading(false);
      });
  };

  /**
   * define a click handler that sends the push subscription to the push server.
   */
  const onClickSendSubscriptionToPushServer = () => {
    const host = `https://push-notification-demo-server.herokuapp.com/subscription`;
    console.log({ userSubscription });
    setLoading(true);
    setError(false);
    http
      .post(host, userSubscription)
      .then(function (response) {
        console.log({ response });
        setPushServerSubscriptionId(response.id);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return {
    onClickAskUserPermission,
    onClickSubscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
  };
}
