import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import StoreForm from 'components/StoreForm';

interface IAddStoreProps {
  navigator: any;
}

const AddStore: React.FC<IAddStoreProps> = ({ navigator }) => {
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
          <div className="center">Add Store</div>
        </Toolbar>
      )}
    >
      <div className="content h-screen w-screen flex items-center justify-center">
        <StoreForm onSuccess={() => handleSuccess()} />
      </div>
    </Page>
  );
};

export default AddStore;
