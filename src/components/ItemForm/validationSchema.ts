import * as yup from 'yup';

export const itemValidation = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
  category: yup.string().required(),
});
