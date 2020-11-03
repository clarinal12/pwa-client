import React from 'react';
import { Page, Toolbar, BackButton } from 'react-onsenui';
import TransactionForm from 'components/TransactionForm';
import db from 'utils/idb';
import { getTypeLabel } from 'constants/transactions'

const updateTransaction = async (data: any) => {
  const result = await db.table('transactions').put(data);
  return result;
};


type Props = {
  navigator: any;
  transaction?: { [x: string]: any }
}


const UpdateTransaction: React.FC<Props> = ({ navigator, transaction }) => {
  const pop = () => {
    navigator.popPage();
  };

  const handleSuccess = () => {
    pop();
  };

  const submit = async (data: any) => {
    const result = await updateTransaction({ ...data, id: transaction.id })

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
          <div className="center">{getTypeLabel(transaction.type)}</div>
        </Toolbar>
      )}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full w-full flex items-center justify-center">
          <TransactionForm
            readOnly
            defaultValues={transaction}
            submit={submit} />
        </div>
      </div>
    </Page>
  );
};

export default UpdateTransaction;
