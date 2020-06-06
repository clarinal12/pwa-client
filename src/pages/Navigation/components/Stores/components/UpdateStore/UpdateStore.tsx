import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import StoreForm from 'components/StoreForm';

interface IUpdateStoreProps {
  navigator: any;
  store: object;
}

const UpdateStore: React.FC<IUpdateStoreProps> = ({ navigator, store }) => {
  const pop = () => {
    navigator.popPage();
  };

  const handleSuccess = () => {
    pop();
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="left">
            <BackButton />
          </div>
          <div className="center">Update Store</div>
        </Toolbar>
      )}
    >
      <div className="content h-screen w-screen flex items-center justify-center">
        <StoreForm onSuccess={() => handleSuccess()} initialValues={store} />
      </div>
    </Page>
  );
};

export default UpdateStore;
