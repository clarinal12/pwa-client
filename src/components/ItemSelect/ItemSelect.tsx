import React, { useState, useEffect } from 'react';
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
import db from 'utils/idb';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  padding: 0 !important;
`;

const queryFilteredItems = async (filterFunction: (value: any) => boolean) => {
  const result = await db.table('items').filter(filterFunction).toArray();

  return result || null;
};

const queryItems = async () => {
  const result = await db.table('items').toArray();

  return result || null;
};

const queryCategories = async () => {
  const result = await db.table('categories').toArray();

  return result || null;
};

type Props = {
  value?: string | undefined | null;
  onChange: (value: any) => void;
  filterFunction?: (value: any) => boolean;
  disabled?: boolean;
};

const ItemSelect: React.FC<Props> = ({
  value,
  onChange,
  filterFunction,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchItems = async () => {
    const result = filterFunction
      ? await queryFilteredItems(filterFunction)
      : await queryItems();
    setItems(result);
  };

  const fetchCategories = async () => {
    const result = await queryCategories();
    setCategories(result);
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

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
        disabled={disabled}
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
                  renderRow={(row, index) => {
                    const newValue = categories.filter(
                      (category) => category.id === row.category
                    )[0];
                    return (
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
                          <p>
                            {row.name} - {newValue?.name}
                          </p>
                          <small>{row.description}</small>
                        </div>
                      </ListItem>
                    );
                  }}
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
