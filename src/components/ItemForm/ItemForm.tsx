import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'react-onsenui';
import { StyledForm } from 'styles/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { itemValidation } from './validationSchema';
import CategorySelect from 'components/CategorySelect';

type Props = {
  submit: (data: any) => void;
  defaultValues?: { [x: string]: any };
  readOnly?: boolean;
  setReadOnly?: () => void;
};

const ItemForm: React.FC<Props> = ({
  submit,
  defaultValues,
  readOnly,
  setReadOnly,
}) => {
  const { handleSubmit, control, formState, errors, reset } = useForm({
    defaultValues: {
      name: defaultValues?.name || '',
      code: defaultValues?.code || '',
      categories: defaultValues?.categories || [],
      price: defaultValues?.price || null,
      description: defaultValues?.description || null,
      quantity: defaultValues?.quantity || 0,
    },
    resolver: yupResolver(itemValidation),
  });
  const { isDirty } = formState;

  const onSubmit = (data: any) => {
    submit(data);
  };

  return (
    <StyledForm className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          control={control}
          name="name"
          render={({ onChange, value, name }) => (
            <div>
              <Input
                float
                className="w-full"
                placeholder="Name"
                modifier="material"
                name={name}
                onChange={onChange}
                value={value}
                disabled={readOnly}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="code"
          render={({ onChange, value, name }) => (
            <div>
              <Input
                float
                className="w-full"
                placeholder="Code"
                modifier="material"
                name={name}
                onChange={onChange}
                value={value}
                disabled={readOnly}
              />
              {errors.code && (
                <small className="text-danger">{errors.code.message}</small>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="categories"
          render={({ onChange, value }) => (
            <div>
              <CategorySelect
                onChange={(value) => onChange(value)}
                value={value}
                disabled={readOnly}
                type="text"
              />
              {errors.categories && (
                <small className="text-danger">
                  {(errors.categories as any)?.message}
                </small>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ onChange, value, name }) => (
            <Input
              float
              className="w-full"
              placeholder="Description"
              modifier="material"
              name={name}
              onChange={onChange}
              value={value}
              disabled={readOnly}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ onChange, value, name }) => (
            <div>
              <Input
                float
                className="w-full"
                placeholder="Sell Price"
                modifier="material"
                type="number"
                name={name}
                onChange={onChange}
                value={value}
                disabled={readOnly}
              />
              <small className="text-gray-600">
                Adding value to this item will make it available for sale.
              </small>
            </div>
          )}
        />
        <div className={`${defaultValues ? 'visible' : 'invisible'}`}>
          <Controller
            control={control}
            name="quantity"
            render={({ onChange, value, name }) => (
              <Input
                float
                className="mt-5"
                placeholder="Quantity"
                modifier="material"
                type="number"
                name={name}
                onChange={onChange}
                value={value}
                disabled
              />
            )}
          />
        </div>
        <button
          disabled={!isDirty}
          type="submit"
          className={`button ${!readOnly ? 'visible' : 'invisible'}`}
        >
          Submit
        </button>
        <Button
          modifier="quiet"
          onClick={() => {
            reset();
            setReadOnly();
          }}
          className={`text-center ${
            !readOnly && defaultValues ? 'visible' : 'invisible'
          }`}
        >
          Cancel
        </Button>
      </div>
    </StyledForm>
  );
};

export default ItemForm;
