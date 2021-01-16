import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import ItemForm from 'components/ItemForm';
import useFirebase, { useFireStoreAdd } from 'hooks/useFirebase';

type Props = {
  navigator: any;
  refetch?: () => void;
};

const AddItem: React.FC<Props> = ({ navigator, refetch }) => {
  const { fireStore } = useFirebase();

  const pop = () => {
    if (refetch) {
      refetch();
    }
    navigator.popPage();
  };

  const handleSuccess = () => {
    pop();
  };

  const [addItem] = useFireStoreAdd({
    collection: 'items',
    onCompleted: () => {
      handleSuccess();
    },
  });

  const submit = async (data: any) => {
    const { categories } = data;
    addItem({
      ...data,
      categories: categories.map((id: string) =>
        fireStore.doc('categories/' + id)
      ),
    });
  };

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
