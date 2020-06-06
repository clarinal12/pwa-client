import React from 'react';
import { Card, ProgressCircular, Button } from 'react-onsenui';
import { STORES } from 'queries/stores';
import { useQuery } from 'react-apollo';
import { IStore } from 'interfaces/stores';

interface IStoreListProps {
  pushToUpdateStore: (store: object) => void;
}

const StoresList: React.FC<IStoreListProps> = ({ pushToUpdateStore }) => {
  const { data = {}, loading, error } = useQuery(STORES, {
    fetchPolicy: 'cache-and-network',
  });

  const { listStore = {} }: any = data;
  const { data: edges = [] } = listStore;

  return (
    <div>
      {loading && (
        <div className="text-center py-3">
          <ProgressCircular indeterminate />
        </div>
      )}
      {error && <div className="text-center py-3">{error.message}</div>}
      <div className="grid grid-cols-2 gap-3 p-3">
        {edges.map(({ address, description, id }: IStore) => (
          <Card modifier="material" key={id} style={{ margin: 0 }}>
            <p className="text-xl">{description}</p>
            <p className="text-sm">{address}</p>
            <hr />
            <div className="text-right">
              <Button
                onClick={() => pushToUpdateStore({ id, address, description })}
                modifier="quiet"
              >
                <p className="text-sm">Update</p>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoresList;
