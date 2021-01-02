import React, { useEffect, useState } from 'react';
import {
  Page,
  Toolbar,
  Fab,
  Icon,
  SearchInput,
  List,
  ListItem,
} from 'react-onsenui';
import AddItem from './components/AddItem';
import db from 'utils/idb';
import UpdateItem from './components/UpdateItem';

const queryItems = async () => {
  const result = await db.table('items').toArray();

  return result || null;
};

const queryCategories = async () => {
  const result = await db.table('categories').toArray();

  return result || null;
};

// const removeItem = async (edgesPath: string) => {
//   await db.table('items').delete(edgesPath);
// };

type Props = {
  title: string;
  navigator: any;
};

const Items: React.FC<Props> = ({ title, navigator }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchItems = async () => {
    const result = await queryItems();
    setItems(result);
  };

  const fetchCategories = async () => {
    const result = await queryCategories();
    setCategories(result);
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const pushToAddItem = () => {
    navigator.pushPage({
      component: AddItem,
      props: {
        key: 'add-item',
        refetch: fetchItems,
      },
    });
  };

  const pushToUpdateItem = (item: object) => {
    navigator.pushPage({
      component: UpdateItem,
      props: {
        key: 'update-item',
        refetch: fetchItems,
        item,
      },
    });
  };

  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{title}</div>
        </Toolbar>
      )}
      renderFixed={() => (
        <Fab position="bottom right" onClick={() => pushToAddItem()}>
          <div className="h-full w-full flex items-center justify-center">
            <Icon icon="md-plus" size={20} />
          </div>
        </Fab>
      )}
      onShow={() => fetchItems()}
    >
      <div className="content w-full h-full p-5">
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
                    onClick={() => pushToUpdateItem(row)}
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
                      <small>{row.code}</small>
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
    </Page>
  );
};

export default Items;
