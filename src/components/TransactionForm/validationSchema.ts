import * as yup from 'yup';

const purchaseValidation = yup.object().shape({
  item: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.string().required(),
});

const saleValidation = yup.object().shape({
  item: yup.string().required(),
  quantity: yup.string().required(),
  price: yup.string().required(),
});

const cashinValidation = yup.object().shape({
  amount: yup.string().required(),
  note: yup.string().required(),
})

const expendValidation = yup.object().shape({
  amount: yup.string().required(),
  note: yup.string().required(),
})

const cashoutValidation = yup.object().shape({
  amount: yup.string().required(),
  note: yup.string().required(),
})
const schema = {
  PURCHASE: purchaseValidation,
  SALE: saleValidation,
  CASH_IN: cashinValidation,
  EXPEND: expendValidation,
  CASH_OUT: cashoutValidation
}

// @ts-ignore
export const getTypeValidationSchema = (type: string) => schema[type]