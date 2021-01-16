import React, { useState } from 'react';
import {
  Page,
  Toolbar,
  Fab,
  Icon,
  SearchInput,
  List,
  ListItem,
} from 'react-onsenui';
import AddTransaction from './components/AddTransaction';
import UpdateTransaction from './components/UpdateTransaction';
import { getTypeLabel } from 'constants/transactions';
import { useFireStoreQuery } from 'hooks/useFirebase';

const successColorTypes = ['CASH_IN', 'SALE'];
const primaryColorTypes = ['PURCHASE'];
const dangerColorTypes = ['EXPEND', 'CASH_OUT'];

const getIconColor = (type: string) => {
  if (successColorTypes.includes(type)) {
    return 'text-success';
  }
  if (primaryColorTypes.includes(type)) {
    return 'text-primary';
  }
  if (dangerColorTypes.includes(type)) {
    return 'text-danger';
  }
};

type Props = {
  title: string;
  navigator: any;
};

const Transactions: React.FC<Props> = ({ title, navigator }) => {
  const [transactions, setTransactions] = useState([]);

  const { refetch } = useFireStoreQuery({
    collection: 'transactions',
    onCompleted: (data) => {
      const entries = [] as any;
      data.forEach((record: any) => {
        entries.push({
          id: record.id,
          ...record.data(),
        });
      });
      setTransactions(entries);
    },
  });

  const pushToAddTransaction = () => {
    navigator.pushPage({
      component: AddTransaction,
      props: {
        key: 'add-transaction',
        refetch,
      },
    });
  };

  const pushToUpdateTransaction = (transaction: any) => {
    const { item } = transaction;
    navigator.pushPage({
      component: UpdateTransaction,
      props: {
        key: 'update-transaction',
        transaction: {
          ...transaction,
          ...(item && {
            item: item.id,
          }),
        },
      },
    });
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{title}</div>
        </Toolbar>
      )}
      renderFixed={() => (
        <Fab position="bottom right" onClick={() => pushToAddTransaction()}>
          <div className="h-full w-full flex items-center justify-center">
            <Icon icon="md-plus" size={20} />
          </div>
        </Fab>
      )}
      onShow={() => refetch()}
    >
      <div className="content w-full h-full p-5">
        <div className="mt-3">
          <SearchInput
            className="w-full"
            value=""
            onChange={() => {}}
            modifier="material"
          />
        </div>
        <div className="mt-5">
          {transactions.length ? (
            <List
              dataSource={transactions}
              renderRow={(row, index) => {
                return (
                  <ListItem
                    onClick={() => pushToUpdateTransaction(row)}
                    key={index}
                    modifier="longdivider chevron"
                    tappable
                  >
                    <div className="left">
                      <Icon
                        className={getIconColor(row.type)}
                        icon="md-money-box"
                        size={15}
                      />
                    </div>
                    <div className="">
                      <p>{getTypeLabel(row.type)}</p>
                      <small>Petsa</small>
                    </div>
                    <div className="right">
                      <p>{row.price || row.amount}</p>
                    </div>
                  </ListItem>
                );
              }}
            />
          ) : (
            <div className="text-center mt-10">Empty</div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Transactions;
