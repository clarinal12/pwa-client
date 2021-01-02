import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, ActionSheet, ActionSheetButton, Icon } from 'react-onsenui';
import { StyledForm } from 'styles/forms';
import { getTypeLabel, getTypeDefaultValues } from 'constants/transactions';
import PurchaseFields from './components/PurchaseFields';
import SaleFields from './components/SaleFields';
import { yupResolver } from '@hookform/resolvers/yup';
import { getTypeValidationSchema } from './validationSchema';
import CashInFields from './components/CashInFields';
import ExpendFields from './components/ExpendFields';
import CashoutFields from './components/CashoutFields';

type Props = {
  submit: (data: any) => void;
  defaultValues?: { [x: string]: any };
  readOnly?: boolean;
  popPage?: () => void;
};

const TransactionForm: React.FC<Props> = ({
  submit,
  defaultValues,
  readOnly,
  popPage,
}) => {
  const [showAction, setShowAction] = useState(
    defaultValues?.type ? false : true
  );
  const [validationSchema, setValidationSchema] = useState(null);
  const [transactionType, setTransactionType] = useState<string | null>(
    defaultValues?.type
  );
  const useFormValues = useForm({
    defaultValues: defaultValues || {},
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control, formState, reset } = useFormValues;

  const onSubmit = (data: any) => {
    submit(data);
  };

  const onError = (error: any) => console.log(error);

  const handleTypeSelect = (type: string) => {
    const validation = getTypeValidationSchema(type);
    const defaultValues = getTypeDefaultValues(type);

    setTransactionType(type);
    setValidationSchema(validation);
    reset(defaultValues);
    setShowAction(false);
  };

  const handleActionCancel = () => {
    setShowAction(false);
    if (!transactionType) {
      popPage();
    }
  };

  return (
    <StyledForm className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          control={control}
          name="type"
          defaultValue={null}
          render={() => (
            <ActionSheet
              onCancel={handleActionCancel}
              title="Transaction Type"
              onDeviceBackButton={popPage}
              modifier="material"
              isOpen={showAction}
            >
              <ActionSheetButton onClick={() => handleTypeSelect('PURCHASE')}>
                Purchase
              </ActionSheetButton>
              <ActionSheetButton onClick={() => handleTypeSelect('SALE')}>
                Sale
              </ActionSheetButton>
              <ActionSheetButton onClick={() => handleTypeSelect('EXPEND')}>
                Expend
              </ActionSheetButton>
              <ActionSheetButton onClick={() => handleTypeSelect('CASH_IN')}>
                Cash-in
              </ActionSheetButton>
              <ActionSheetButton onClick={() => handleTypeSelect('CASH_OUT')}>
                Cash-out
              </ActionSheetButton>
              <ActionSheetButton onClick={() => handleActionCancel()}>
                Cancel
              </ActionSheetButton>
            </ActionSheet>
          )}
        />

        {transactionType && (
          <Button
            className="opacity-100"
            disabled={readOnly}
            onClick={() => setShowAction(true)}
            modifier="outline"
          >
            <div className="flex justify-between">
              <span>{getTypeLabel(transactionType)}</span>
              {!readOnly && (
                <Icon className="ml-3" icon="md-caret-down" size={15} />
              )}
            </div>
          </Button>
        )}

        {transactionType === 'PURCHASE' && (
          <PurchaseFields useFormValues={useFormValues} readOnly={readOnly} />
        )}
        {transactionType === 'SALE' && (
          <SaleFields useFormValues={useFormValues} readOnly={readOnly} />
        )}
        {transactionType === 'CASH_IN' && (
          <CashInFields useFormValues={useFormValues} readOnly={readOnly} />
        )}
        {transactionType === 'EXPEND' && (
          <ExpendFields useFormValues={useFormValues} readOnly={readOnly} />
        )}
        {transactionType === 'CASH_OUT' && (
          <CashoutFields useFormValues={useFormValues} readOnly={readOnly} />
        )}

        {readOnly ? (
          <Button className="text-center" modifier="light">
            Adjust
          </Button>
        ) : (
          <button
            disabled={!formState.isDirty}
            type="submit"
            className={`button`}
          >
            Submit
          </button>
        )}
      </div>
    </StyledForm>
  );
};

export default TransactionForm;
