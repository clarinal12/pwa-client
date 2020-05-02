import * as yup from 'yup';

export const addStoreSchema = () =>
  yup.object().shape({
    description: yup.string().required(),
    address: yup.string().required(),
  });
