import React, { useEffect, useState } from 'react';
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
import db from 'utils/idb';
import UpdateTransaction from './components/UpdateTransaction';
import { getTypeLabel } from 'constants/transactions';

const queryTransactions = async () => {
  const result = await db.table('transactions').toArray();

  return result || null;
};

// const updateItem = async (data: any) => {
//   const result = await db.table('items').put(data, data.id);
//   return result;
// };

// const removeItem = async (edgesPath: string) => {
//   await db.table('items').delete(edgesPath);
// };

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

  const fetchTransactions = async () => {
    const result = await queryTransactions();
    setTransactions(result);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const pushToAddTransaction = () => {
    navigator.pushPage({
      component: AddTransaction,
      props: {
        key: 'add-transaction',
        refetch: fetchTransactions,
      },
    });
  };

  const pushToUpdateTransaction = (transaction: object) => {
    navigator.pushPage({
      component: UpdateTransaction,
      props: {
        key: 'update-transaction',
        transaction,
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
      onShow={() => fetchTransactions()}
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
                    </div>
                    <div className="right">
                      <p>{row.price || row.amount}</p>
                    </div>
                    <div className="expandable-content">Expandable content</div>
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
