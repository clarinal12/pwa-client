import React, { useState } from 'react';
import { Page, Toolbar, BackButton, Fab, Icon } from 'react-onsenui';
import ItemForm from 'components/ItemForm';
import useFirebase, { useFireStoreUpdate } from 'hooks/useFirebase';

type Props = {
  navigator: any;
  item?: { [x: string]: any };
  refetch: () => void;
};

const UpdateItem: React.FC<Props> = ({ navigator, item, refetch }) => {
  const { fireStore } = useFirebase();

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

  const [updateItem] = useFireStoreUpdate({
    collection: 'items',
    onCompleted: () => {
      handleSuccess();
    },
  });

  const submit = async (data: any) => {
    const { categories } = data;
    updateItem(item.id, {
      ...data,
      categories: categories.map((id: string) =>
        fireStore.doc('categories/' + id)
      ),
    });
  };

  const handleSetReadOnly = () => {
    setReadOnly((prev) => !prev);
  };

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
      renderFixed={() =>
        readOnly && (
          <Fab position="bottom right" onClick={() => setReadOnly(false)}>
            <div className="h-full w-full flex items-center justify-center">
              <Icon icon="md-edit" size={20} />
            </div>
          </Fab>
        )
      }
    >
      <div className="content w-full h-full p-5">
        <div className="h-full w-full flex items-center justify-center">
          <ItemForm
            setReadOnly={handleSetReadOnly}
            readOnly={readOnly}
            defaultValues={item}
            submit={submit}
          />
        </div>
      </div>
    </Page>
  );
};

export default UpdateItem;
