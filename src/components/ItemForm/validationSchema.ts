import * as yup from 'yup';

export const itemValidation = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
  categories: yup.array().min(1, 'Please select at least 1 category'),
});
