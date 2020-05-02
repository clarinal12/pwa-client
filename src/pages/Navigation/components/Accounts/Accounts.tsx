import React from 'react';
import { string } from 'prop-types';
import { Page, Toolbar, Button } from 'react-onsenui';
import { useAuth } from 'hooks/useAuth';

interface IAccountsProps {
  title: string;
  navigator: any;
}

const Accounts: React.FC<IAccountsProps> = ({ title, navigator }) => {
  const { signOut }: any = useAuth();

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
