import React from 'react';
import { string } from 'prop-types';
import { Page, Toolbar, Button } from 'react-onsenui';
import { useAuth } from 'hooks/useAuth';
import usePushNotifications from 'hooks/usePushNotifications';

interface IAccountsProps {
  title: string;
  navigator: any;
}

const Accounts: React.FC<IAccountsProps> = ({ title, navigator }) => {
  const { signOut }: any = useAuth();
  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSubscribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications();

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{title}</div>
        </Toolbar>
      )}
    >
      <div className="content" style={{ padding: 20 }}>
        <h1>Accounts Screen</h1>
        <Button onClick={() => signOut()}>Logout</Button>
        <div className="mt-5">
          {error && (
            <section className="app-error">
              <h2>{error.name}</h2>
              <p>Error message : {error.message}</p>
              <p>Error code : {error.code}</p>
            </section>
          )}
          {loading && 'Loading, please stand by'}
          <p>
            Push notification are {!pushNotificationSupported && 'NOT'}{' '}
            supported by your device.
          </p>
          <p>
            User consent to recevie push notificaitons is{' '}
            <strong>{userConsent}</strong>.
          </p>
          <div className="mt-5">
            <Button onClick={() => onClickAskUserPermission()}>
              Ask user permission
            </Button>
            <br></br> <br></br>
            <Button onClick={() => onClickSubscribeToPushNotification()}>
              Create Notification subscription
            </Button>
            <br></br> <br></br>
            <Button onClick={() => onClickSendSubscriptionToPushServer()}>
              Send subscription to push server
            </Button>
            <br></br> <br></br>
            <Button onClick={() => onClickSendNotification()}>
              Send a notification
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

Accounts.propTypes = {
  title: string,
};

Accounts.defaultProps = {
  title: '',
};

export default Accounts;
