import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  SearchInput,
  List,
  ListItem,
  Toolbar,
  BackButton,
  Input,
  Card,
  Checkbox,
} from 'react-onsenui';
import styled from 'styled-components';
import db from 'utils/idb';
import uuid from 'utils/uuid';

const StyledButton = styled(Button)`
  width: 80px;
  height: 24px;
`;

const StyledCheckbox = styled(Checkbox)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const queryFilteredCategories = async (
  filterFunction: (value: any) => boolean
) => {
  const result = await db.table('categories').filter(filterFunction).toArray();

  return result || null;
};

const queryCategories = async () => {
  const result = await db.table('categories').toArray();

  return result || null;
};

type Props = {
  value?: String[];
  onChange: (value: any) => void;
  filterFunction?: (value: any) => boolean;
  disabled?: boolean;
  type: 'select' | 'text';
};

const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  filterFunction,
  disabled,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const addCategory = async () => {
    try {
      const result = await db.table('categories').add({
        id: uuid('category'),
        name: categoryName,
      });

      if (result) {
        setCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchCategories = async () => {
    const result = filterFunction
      ? await queryFilteredCategories(filterFunction)
      : await queryCategories();
    setCategories(result);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...value, id]);
    } else {
      const index = value.findIndex((item) => item === id);
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange(newValue);
    }
  };

  const selectedCategories = categories?.filter((category) =>
    value.includes(category.id)
  );

  // console.log({ value, categories, selectedCategories });
  return (
    <div>
      <Input
        float
        className="w-full"
        placeholder="Category"
        modifier="material"
        onFocus={() => setOpen(true)}
        value={
          selectedCategories
            .map((selectedCategory) => ` ${selectedCategory.name}`)
            .toString() || ''
        }
        disabled={disabled}
      />
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
            <div className="center">Categories</div>
          </Toolbar>
          <div>
            <Card>
              <div className="text-sm">Add New Category:</div>
              <div className="mt-3 flex justify-between items-end">
                <Input
                  float
                  className="w-full mr-5"
                  placeholder="Category Name"
                  modifier="material"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={categoryName}
                />
                <StyledButton
                  modifier="material"
                  onClick={() => addCategory()}
                  className="text-center text-xs"
                >
                  Add
                </StyledButton>
              </div>
            </Card>
            <div className="mt-10">
              <SearchInput
                className="w-full"
                value=""
                onChange={() => {}}
                modifier="material"
              />
            </div>
            <div className="mt-5">
              {categories.length ? (
                <List
                  dataSource={categories}
                  renderRow={(row, index) => {
                    return (
                      <ListItem key={index} modifier="longdivider">
                        <StyledCheckbox
                          onChange={(e: any) => {
                            handleSelect(row.id, e.target.checked);
                          }}
                          modifier="noborder"
                        >
                          {row.name}
                        </StyledCheckbox>
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

export default CategorySelect;
