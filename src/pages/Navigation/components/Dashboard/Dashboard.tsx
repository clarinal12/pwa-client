import React, { useState } from 'react';
import { Page, Toolbar, Card, Button } from 'react-onsenui';
import AddTransaction from '../Transactions/components/AddTransaction';
import AddItem from '../Items/components/AddItem';
import { useFireStoreQuery } from 'hooks/useFirebase';

type Props = {
  title: string;
  navigator: any;
};

const addCashTypes = ['CASH_IN', 'SALE'];

const getReports = (transactions: any) => {
  const reports = transactions.reduce(
    (acc: any, transaction: any) => {
      const { type, price, amount } = transaction;
      const newAcc = { ...acc };

      if (type === 'SALE') {
        newAcc.totalSales += Number(price);
      }

      if (type === 'CASH_IN' || type === 'CASH_OUT') {
        if (addCashTypes.includes(type)) {
          newAcc.totalCash += Number(price || amount);
        } else {
          newAcc.totalCash -= Number(price || amount);
        }
      }

      if (type === 'PURCHASE') {
        newAcc.totalPurchase += Number(price);
      }

      if (type === 'EXPEND') {
        newAcc.totalExpense += Number(amount);
      }

      return newAcc;
    },
    {
      totalSales: 0,
      totalCash: 0,
      totalPurchase: 0,
      totalExpense: 0,
    }
  );

  return reports;
};

const Dashboard: React.FC<Props> = ({ title, navigator }) => {
  const [reports, setReports] = useState({
    totalSales: 0,
    totalCash: 0,
    totalPurchase: 0,
    totalExpense: 0,
  });

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
      setReports(getReports(entries));
    },
  });

  const pushToAddTransaction = () => {
    navigator.pushPage({
      component: AddTransaction,
      props: {
        key: 'add-transaction',
        // refetch: fetchTransactions,
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
      onShow={() => refetch()}
    >
      <div className="content w-full h-full p-5">
        <div className="h-full flex flex-col justify-center">
          <div className="w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Cash:</div>
                <div className="text-primary">{reports.totalCash}</div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Sales Amount:</div>
                <div className="text-primary">{reports.totalSales}</div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Purchases Amount:</div>
                <div className="text-primary">{reports.totalPurchase}</div>
              </div>
            </Card>
          </div>
          <div className="mt-1 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Expenses:</div>
                <div className="text-primary">{reports.totalExpense}</div>
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
