import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import TransactionForm from 'components/TransactionForm';
import useFirebase, { useFireStoreAdd } from 'hooks/useFirebase';

// const updateItemQuantity = async (data: any) => {
//   const { item: id, quantity, type } = data;
//   const table = await db.table('items');
//   const item = await table.get(id);

//   if (type === 'PURCHASE') {
//     await table.update(id, { quantity: item.quantity + Number(quantity) });
//   } else if (type === 'SALE') {
//     await table.update(id, { quantity: item.quantity - Number(quantity) });
//   }
// };

// const addTransaction = async (data: any) => {
//   const result = await db.table('transactions').add({
//     id: uuid('transaction'),
//     ...data,
//   });

//   if (data.type === 'PURCHASE' || data.type === 'SALE') {
//     await updateItemQuantity(data);
//   }

//   return result;
// };

type Props = {
  navigator: any;
  refetch?: () => void;
};

const AddTransaction: React.FC<Props> = ({ navigator, refetch }) => {
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

  const [addTransaction] = useFireStoreAdd({
    collection: 'transactions',
    onCompleted: () => {
      handleSuccess();
    },
  });

  const submit = async (data: any) => {
    const { item } = data;

    addTransaction({
      ...data,
      ...(item && {
        item: fireStore.doc('items/' + item),
      }),
    });
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="left">
            <BackButton />
          </div>
          <div className="center">Add Transaction</div>
        </Toolbar>
      )}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full w-full flex items-center justify-center">
          <TransactionForm popPage={pop} submit={submit} />
        </div>
      </div>
    </Page>
  );
};

export default AddTransaction;
