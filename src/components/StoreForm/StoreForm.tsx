import React, { useState } from 'react';
import { Input, Button, AlertDialog } from 'react-onsenui';
import { useFormik } from 'formik';
import { ADD_STORE, UPDATE_STORE } from 'mutations/store';
import { useMutation } from '@apollo/react-hooks';
import { addStoreSchema } from './addStoreSchema';
import { STORES } from 'queries/stores';

interface IStoreFormProps {
  onSuccess?: (response?: object) => void;
  initialValues?: object;
}

const StoreForm: React.FC<IStoreFormProps> = ({ onSuccess, initialValues }) => {
  const [alert, toggleAlert] = useState({
    open: false,
    title: '',
    message: '',
  });

  const [addStore, { loading: addStoreLoading }] = useMutation(ADD_STORE, {
    onCompleted: (res) => {
      onSuccess(res);
    },
    onError: (err) => {
      const { message } = err;
      toggleAlert({
        open: true,
        title: 'Add Store Error',
        message,
      });
    },
    refetchQueries: [{ query: STORES }],
  });

  const [updateStore, { loading: updateStoreLoading }] = useMutation(
    UPDATE_STORE,
    {
      onCompleted: (res) => {
        onSuccess(res);
      },
      onError: (err) => {
        const { message } = err;
        toggleAlert({
          open: true,
          title: 'Update Store Error',
          message,
        });
      },
      refetchQueries: [{ query: STORES }],
      context: {
        serializationKey: 'ADD_STORE',
      },
    }
  );

  const handleAddStore = (values: { description: string; address: string }) => {
    const { description, address } = values;
    addStore({
      variables: { description, address },
      optimisticResponse: {
        addStore: {
          id: 0,
          description,
          address,
          __typename: 'Store',
        },
      },
      update: (cache, { data }) => {
        const { addStore } = data;
        const newData: any = cache.readQuery({ query: STORES });
        newData.listStore.data.push({
          ...addStore,
        });
        cache.writeQuery({ query: STORES, data: newData });
        onSuccess(data);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      description: '',
      address: '',
      ...initialValues,
    },
    onSubmit: (values: {
      description: string;
      address: string;
      id?: number;
    }) => {
      const { description, address, id } = values;
      if (id) {
        updateStore({
          variables: { id, description, address },
        });
      } else {
        handleAddStore(values);
      }
    },
    validationSchema: addStoreSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values } = formik;

  return (
    <div>
      {alert.open && (
        <AlertDialog
          onCancel={() => toggleAlert({ ...alert, open: false })}
          isOpen
          isCancelable
          modifier="material"
        >
          <div className="alert-dialog-title">{alert.title}</div>
          <div className="alert-dialog-content">{alert.message}</div>
          <div>
            <Button
              onClick={() => toggleAlert({ ...alert, open: false })}
              className="alert-dialog-button"
            >
              OK
            </Button>
          </div>
        </AlertDialog>
      )}
      <form>
        <Input
          float
          value={values.description}
          onChange={handleChange}
          placeholder="Description"
          name="description"
          className="w-full mt-4"
          modifier="material"
        />
        <Input
          float
          value={values.address}
          onChange={handleChange}
          placeholder="Address"
          name="address"
          className="w-full mt-8"
          modifier="material"
        />
        <div className="mt-6 w-full text-right">
          <Button
            className="w-full text-center"
            disabled={addStoreLoading || updateStoreLoading}
            onClick={() => handleSubmit()}
          >
            {addStoreLoading || updateStoreLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
