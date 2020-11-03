import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import ItemForm from 'components/ItemForm';
import db from 'utils/idb';
import uuid from 'utils/uuid';

const addItem = async (data: any) => {
  const result = await db.table('items').add({
    id: uuid('item'),
    ...data
  });
  return result;
};


type Props = {
  navigator: any;
  refetch?: () => void;
}

const AddItem: React.FC<Props> = ({ navigator, refetch }) => {
  const pop = () => {
    if (refetch) {
      refetch();
    }
    navigator.popPage();
  };

  const handleSuccess = () => {
    pop();
  };

  const submit = async (data: any) => {
    const result = await addItem(data)

    if (result) {
      handleSuccess()
    }
  }

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="left">
            <BackButton />
          </div>
          <div className="center">Add Item</div>
        </Toolbar>
      )}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full w-full flex items-center justify-center">
          <ItemForm submit={submit} />
        </div>
      </div>
    </Page>
  );
};

export default AddItem;
