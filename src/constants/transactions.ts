export const types = {
  PURCHASE: 'PURCHASE',
  SALE: 'SALE',
  EXPEND: 'EXPEND',
  CASH_IN: 'CASH_IN',
  CASH_OUT: 'CASH_OUT',
};

export const labels = {
  PURCHASE: 'Purchase',
  SALE: 'Sale',
  EXPEND: 'Expend',
  CASH_IN: 'Cash-in',
  CASH_OUT: 'Cash-out',
};

export const defaultFieldValues = {
  PURCHASE: {
    type: types.PURCHASE,
    item: '',
    quantity: '',
    price: '',
    note: '',
  },
  SALE: {
    type: types.SALE,
    item: '',
    quantity: '',
    price: '',
    discount: '',
    note: '',
  },
  CASH_IN: {
    type: types.CASH_IN,
    amount: '',
    note: ''
  },
  EXPEND: {
    type: types.EXPEND,
    amount: '',
    note: ''
  },
  CASH_OUT: {
    type: types.CASH_OUT,
    amount: '',
    note: ''
  },
};

// @ts-ignore
export const getTypeLabel = (type: string) => labels[type];

// @ts-ignore
export const getTypeDefaultValues = (type: string) => defaultFieldValues[type];
