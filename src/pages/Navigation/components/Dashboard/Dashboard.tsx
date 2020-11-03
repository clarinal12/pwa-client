import React, { useEffect, useState } from 'react';
import { Page, Toolbar, Card, Button } from 'react-onsenui';
import AddTransaction from '../Transactions/components/AddTransaction'
import AddItem from '../Items/components/AddItem'
import db from 'utils/idb'

type Props = {
  title: string;
  navigator: any;
}

const queryTransactions = async () => {
  const result = await db
    .table('transactions')
    .toArray();

  return result || null;
};

const getTotalSales = (transactions: any) => {
  const totalSales = transactions.reduce((acc: number, transaction: any) => {
    const { type, price } = transaction
    if (type === 'SALE') {
      return acc + Number(price)
    }
    return acc;
  }, 0)

  return totalSales
}

const getTotalCash = (transactions: any) => {
  const totalSales = transactions.reduce((acc: number, transaction: any) => {
    const { type, price, amount } = transaction

    if (type === 'SALE' || type === 'CASH_IN') {
      return acc + Number(price || amount)
    }
    else if (type === 'PURCHASE') {
      return acc - Number(price)
    }

    return acc;
  }, 0)

  return totalSales
}

const Dashboard: React.FC<Props> = ({ title, navigator }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const result = await queryTransactions()
    setTransactions(result);
  };

  useEffect(() => {
    fetchTransactions()
  }, [])

  const pushToAddTransaction = () => {
    navigator.pushPage({
      component: AddTransaction,
      props: {
        key: 'add-transaction',
        refetch: fetchTransactions
      }
    });
  };

  const pushToAddItem = () => {
    navigator.pushPage({
      component: AddItem,
      props: {
        key: 'add-item',
      }
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
          <div className="mb-5 w-full">
            <Card modifier="material">
              <div className="flex justify-between">
                <div>Total Sales Amount:</div>
                <div className="text-primary">{getTotalSales(transactions)}</div>
              </div>
            </Card>
          </div>
          <div className="mb-5 w-full">
            <Card modifier="material">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Button className="w-full text-center" onClick={() => pushToAddTransaction()}>Add Transaction</Button>
                </div>
                <div>
                  <Button className="w-full text-center" onClick={() => pushToAddItem()}>Add Item</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page >
  );
};

export default Dashboard;
