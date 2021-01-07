import React, { useState } from 'react';
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
import { useFireStoreAdd, useFireStoreQuery } from 'hooks/useFirebase';

const StyledButton = styled(Button)`
  width: 80px;
  height: 24px;
`;

const StyledCheckbox = styled(Checkbox)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

type Props = {
  value?: String[];
  onChange: (value: any) => void;
  filterFunction?: (value: any) => boolean;
  disabled?: boolean;
};

const CategorySelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const { refetch } = useFireStoreQuery({
    collection: 'categories',
    onCompleted: (data) => {
      const entries = [] as any;
      data.forEach((record: any) => {
        entries.push({
          id: record.id,
          ...record.data(),
        });
      });
      setCategories(entries);
    },
  });

  const [addCategory, { loading: addingCategory }] = useFireStoreAdd({
    collection: 'categories',
    onCompleted: () => {
      setCategoryName('');
      refetch();
    },
  });

  const handleAddCategory = async () => {
    if (categoryName) {
      addCategory({
        name: categoryName,
      });
    }
  };

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
                  onClick={() => handleAddCategory()}
                  className="text-center text-xs"
                  disabled={addingCategory}
                >
                  {addingCategory ? 'Adding...' : 'Add'}
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
