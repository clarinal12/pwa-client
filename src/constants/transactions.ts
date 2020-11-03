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
    // @ts-ignore
    type: types.PURCHASE,
    item: '',
    quantity: '',
    price: '',
    note: '',
  },
  SALE: {
    // @ts-ignore
    type: types.SALE,
    item: '',
    quantity: '',
    price: '',
    discount: '',
    note: '',
  },
  EXPEND: 'Expend',
  CASH_IN: {
    type: types.CASH_IN,
    amount: '',
    note: ''
  },
  CASH_OUT: 'Cash-out',
};

// @ts-ignore
export const getTypeLabel = (type: string) => labels[type];

// @ts-ignore
export const getTypeDefaultValues = (type: string) => defaultFieldValues[type];
