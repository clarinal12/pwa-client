import React, { useState, useEffect } from 'react';
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
  readOnly?: boolean;
}

const itemsFilterFunction = (value: any) => value.price !== null


const SaleFields: React.FC<Props> = ({ useFormValues, readOnly }) => {
  const { control, setValue, getValues } = useFormValues
  const [activeItem, setActiveItem] = useState(null)

  const getPrice = (quantity: string | number) => {
    if (activeItem && quantity) {
      setValue('price', Number(activeItem.price) * Number(quantity))
    } else {
      setValue('price', '')
    }
  }

  useEffect(() => {
    const quantity = getValues('quantity')
    getPrice(quantity)
    // eslint-disable-next-line
  }, [activeItem])

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        Item:
        <Controller
          control={control}
          name="item"
          render={({ onChange, value }) => (
            <ItemSelect filterFunction={itemsFilterFunction} value={value}
              onChange={value => {
                onChange(value.id)
                setActiveItem(value)
              }}
              disabled={readOnly}
            />
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
              onChange={e => {
                onChange(e)
                getPrice(e.target.value)
              }}
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
              disabled
            />
          )}
        />
      </div>

      <div className="flex justify-between mb-3">
        <div>
          Discount (%):
        </div>
        <Controller
          control={control}
          name="discount"
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

export default SaleFields;
