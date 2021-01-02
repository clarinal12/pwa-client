import React from 'react';
import { Page, Toolbar, Fab, Icon } from 'react-onsenui';
import AddStore from './components/AddStore';
// import UpdateStore from './components/UpdateStore';

interface IStoreProps {
  title: string;
  navigator: any;
}

const Stores: React.FC<IStoreProps> = ({ title, navigator }) => {
  const pushToAddStore = () => {
    navigator.pushPage({ component: AddStore, props: { key: 'add-store' } });
  };

  // const pushToUpdateStore = (store: object) => {
  //   navigator.pushPage({
  //     component: UpdateStore,
  //     props: { key: 'update-store', store },
  //   });
  // };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{title}</div>
        </Toolbar>
      )}
      renderFixed={() => (
        <Fab position="bottom right" onClick={() => pushToAddStore()}>
          <div className="h-full w-full flex items-center justify-center">
            <Icon icon="md-plus" size={20} />
          </div>
        </Fab>
      )}
    >
      <div className="p-3">HELLO STORES</div>
    </Page>
  );
};

export default Stores;
