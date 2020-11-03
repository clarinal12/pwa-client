import React, { useState } from 'react';
import { Page, Toolbar, BackButton, Fab, Icon } from 'react-onsenui';
import ItemForm from 'components/ItemForm';
import db from 'utils/idb';

const updateItem = async (data: any) => {
  const result = await db.table('items').put(data);
  return result;
};


type Props = {
  navigator: any;
  item?: { [x: string]: any },
  refetch: () => void;
}


const UpdateItem: React.FC<Props> = ({ navigator, item, refetch }) => {
  const [readOnly, setReadOnly] = useState(true);

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
    const result = await updateItem({ ...data, id: item.id })

    if (result) {
      handleSuccess()
    }
  }

  const handleSetReadOnly = () => {
    setReadOnly(prev => !prev)
  }

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="left">
            <BackButton />
          </div>
          <div className="center">{item.name}</div>
        </Toolbar>
      )}
      renderFixed={() => readOnly && (
        <Fab
          position="top right"
          modifier="mini"
          onClick={() => setReadOnly(false)}
        >
          <div className="h-full w-full flex items-center justify-center">
            <Icon icon="md-edit" size={15} />
          </div>
        </Fab>
      )}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full w-full flex items-center justify-center">
          <ItemForm setReadOnly={handleSetReadOnly} readOnly={readOnly} defaultValues={item} submit={submit} />
        </div>
      </div>
    </Page>
  );
};

export default UpdateItem;
