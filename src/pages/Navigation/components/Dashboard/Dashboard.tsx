import React, { useEffect, useState } from 'react';
import { Page, Toolbar, Card, Button } from 'react-onsenui';
import AddTransaction from '../Transactions/components/AddTransaction';
import AddItem from '../Items/components/AddItem';
import db from 'utils/idb';

type Props = {
  title: string;
  navigator: any;
};

const addCashTypes = ['CASH_IN', 'SALE'];
const subtractCashTypes = ['PURCHASE', 'EXPEND', 'CASH_OUT'];

const queryTransactions = async () => {
  const result = await db.table('transactions').toArray();

  return result || null;
};

const getTotalSales = (transactions: any) => {
  const totalSales = transactions.reduce((acc: number, transaction: any) => {
    const { type, price } = transaction;
    if (type === 'SALE') {
      return acc + Number(price);
    }
    return acc;
  }, 0);

  return totalSales;
};

const getTotalCash = (transactions: any) => {
  const totalSales = transactions.reduce((acc: number, transaction: any) => {
    const { type, price, amount } = transaction;

    if (addCashTypes.includes(type)) {
      return acc + Number(price || amount);
    }

    if (subtractCashTypes.includes(type)) {
      return acc - Number(price || amount);
    }

    return acc;
  }, 0);

  return totalSales;
};

const getTotalPurchases = (transactions: any) => {
  const totalPurchases = transactions.reduce(
    (acc: number, transaction: any) => {
      const { type, price } = transaction;
      if (type === 'PURCHASE') {
        return acc + Number(price);
      }
      return acc;
    },
    0
  );

  return totalPurchases;
};

const getTotalExpenses = (transactions: any) => {
  const totalExpenses = transactions.reduce((acc: number, transaction: any) => {
    const { type, amount } = transaction;
    if (type === 'EXPEND') {
      return acc + Number(amount);
    }
    return acc;
  }, 0);

  return totalExpenses;
};

const Dashboard: React.FC<Props> = ({ title, navigator }) => {
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

  const pushToAddItem = () => {
    navigator.pushPage({
      component: AddItem,
      props: {
        key: 'add-item',
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
      onShow={() => fetchTransactions()}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full flex flex-col justify-center">
          <div className="w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Cash:</div>
                <div className="text-primary">{getTotalCash(transactions)}</div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Sales Amount:</div>
                <div className="text-primary">
                  {getTotalSales(transactions)}
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Purchases Amount:</div>
                <div className="text-primary">
                  {getTotalPurchases(transactions)}
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Expenses:</div>
                <div className="text-primary">
                  {getTotalExpenses(transactions)}
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-3 w-full">
            <Card modifier="material">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Button
                    className="w-full text-center"
                    onClick={() => pushToAddTransaction()}
                  >
                    Add Transaction
                  </Button>
                </div>
                <div>
                  <Button
                    className="w-full text-center"
                    onClick={() => pushToAddItem()}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
