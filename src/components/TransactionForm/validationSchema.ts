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
})

const schema = {
  PURCHASE: purchaseValidation,
  SALE: saleValidation,
  CASH_IN: cashinValidation
}

// @ts-ignore
export const getTypeValidationSchema = (type: string) => schema[type]