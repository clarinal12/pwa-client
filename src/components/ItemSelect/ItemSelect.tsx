import React, { useState } from 'react';
import {
  Button,
  Modal,
  Icon,
  SearchInput,
  List,
  ListItem,
  Toolbar,
  BackButton,
} from 'react-onsenui';
import styled from 'styled-components';
import { useFireStoreQuery, Filter } from 'hooks/useFirebase';

const StyledButton = styled(Button)`
  padding: 0 !important;
`;

type Props = {
  value?: string | undefined | null;
  onChange: (value: any) => void;
  filter?: Filter;
  disabled?: boolean;
};

const ItemSelect: React.FC<Props> = ({ value, onChange, filter, disabled }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const { loading } = useFireStoreQuery({
    collection: 'items',
    onCompleted: (data) => {
      const entries = [] as any;
      data.forEach((record: any) => {
        entries.push({
          id: record.id,
          ...record.data(),
        });
      });
      setItems(entries);
    },
    filter: filter,
  });

  const handleSelect = (item: any) => {
    onChange(item);
    setOpen(false);
  };

  const newValue = items.filter((item) => item.id === value)[0];

  return (
    <div>
      <StyledButton
        onClick={() => setOpen(true)}
        modifier="quiet"
        disabled={disabled || loading}
      >
        <div
          className={`flex justify-between text-dark ${
            disabled ? 'opacity-75' : ''
          }`}
        >
          {newValue?.name || 'Select Item'}
          <Icon className="ml-3" icon="md-caret-down" size={15} />
        </div>
      </StyledButton>
      <Modal
        animation="lift"
        onDeviceBackButton={() => setOpen(false)}
        isOpen={open}
      >
        <div className="bg-light text-dark p-4 pt-16 h-full">
          <Toolbar>
            <div className="left">
              <BackButton onClick={() => setOpen(false)} />
            </div>
            <div className="center">Items</div>
          </Toolbar>
          <div>
            <div className="mt-3">
              <SearchInput
                className="w-full"
                value=""
                onChange={() => {}}
                modifier="material"
              />
            </div>
            <div className="mt-5">
              {items.length ? (
                <List
                  dataSource={items}
                  renderRow={(row, index) => (
                    <ListItem
                      onClick={() => handleSelect(row)}
                      key={index}
                      modifier="longdivider chevron"
                      tappable
                    >
                      <div className="left">
                        <img
                          className="w-16 h-16"
                          alt="thumbnail"
                          src="https://via.placeholder.com/100"
                        />
                      </div>
                      <div className="">
                        <p>{row.name}</p>
                        <small>{row.description}</small>
                      </div>
                    </ListItem>
                  )}
                />
              ) : (
                <div className="text-center mt-10">Empty</div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ItemSelect;
