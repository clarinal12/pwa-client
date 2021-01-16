import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'react-onsenui';
import { StyledForm } from 'styles/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { itemValidation } from './validationSchema';
import CategorySelect from 'components/CategorySelect';
import { useDropzone } from 'react-dropzone';
import { useFireStoreUpload } from 'hooks/useFirebase';

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
  const [imgSrc, setImgSrc] = useState(defaultValues?.image || null);
  const { handleSubmit, control, formState, errors, reset, setValue } = useForm(
    {
      defaultValues: {
        name: defaultValues?.name || '',
        code: defaultValues?.code || '',
        categories:
          defaultValues?.categories.map((category: any) => category.id) || [],
        price: defaultValues?.price || null,
        description: defaultValues?.description || null,
        quantity: defaultValues?.quantity || 0,
        image: defaultValues?.image || null,
      },
      resolver: yupResolver(itemValidation),
    }
  );
  const { isDirty } = formState;

  const onSubmit = (data: any) => {
    submit(data);
  };

  const [upload] = useFireStoreUpload({
    onCompleted: (url: string) => {
      setValue('image', url);
      setImgSrc(url);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      upload({ file, path: 'item_images/' });
    },
    [upload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  return (
    <StyledForm className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          control={control}
          name="image"
          render={() => (
            <div className="p-3 bg-gray-300 text-center" {...getRootProps()}>
              <input {...getInputProps()} />
              {imgSrc && <img className="m-auto" src={imgSrc} alt="Item" />}
              {isDragActive && !imgSrc && <p>Drop the item image here...</p>}
              {!imgSrc && !isDragActive && (
                <p>
                  Drag 'n' drop the file for Item Image here, or click to select
                  a file
                </p>
              )}
            </div>
          )}
        />
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
          render={({ onChange, value }) => {
            return (
              <div>
                <CategorySelect
                  onChange={(value) => onChange(value)}
                  value={value}
                  disabled={readOnly}
                />
                {errors.categories && (
                  <small className="text-danger">
                    {(errors.categories as any)?.message}
                  </small>
                )}
              </div>
            );
          }}
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
