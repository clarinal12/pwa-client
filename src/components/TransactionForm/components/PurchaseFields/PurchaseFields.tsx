import React from 'react';
import ItemSelect from 'components/ItemSelect'
import { Input } from 'react-onsenui'
import styled from 'styled-components'
import { Controller } from 'react-hook-form';

const StyledInput = styled(Input)`
  input {
    text-align: right !important;
    width: 100px;
  }
`
const StyledTextArea = styled.textarea`
  width: 100%;
`

type Props = {
  useFormValues: any;
  readOnly?: boolean
}


const PurchaseFields: React.FC<Props> = ({ useFormValues, readOnly }) => {
  const { control } = useFormValues

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        Item:
        <Controller
          control={control}
          name="item"
          render={({ onChange, value }) => (
            <ItemSelect value={value} onChange={value => onChange(value.id)} disabled={readOnly} />
          )}
        />
      </div>
      <div className="flex justify-between mb-3">
        <div>
          Quantity:
        </div>
        <Controller
          control={control}
          name="quantity"
          render={({ onChange, value, name }) => (
            <StyledInput
              float
              type="number"
              placeholder="0"
              modifier="underbar"
              name={name}
              onChange={onChange}
              value={value}
              disabled={readOnly}
            />
          )}
        />
      </div>
      <div className="flex justify-between mb-3">
        <div>
          Price:
        </div>
        <Controller
          control={control}
          name="price"
          render={({ onChange, value, name }) => (
            <StyledInput
              float
              type="number"
              placeholder="0"
              modifier="underbar"
              name={name}
              onChange={onChange}
              value={value}
              disabled={readOnly}
            />
          )}
        />
      </div>
      <div className="mb-3">
        <div className="mb-1">
          Note:
        </div>
        <Controller
          control={control}
          name="note"
          render={({ onChange, value, name }) => (
            <StyledTextArea
              className="textarea"
              rows={3}
              placeholder="Additional Note..."
              name={name}
              onChange={onChange}
              value={value}
              disabled={readOnly}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PurchaseFields;
