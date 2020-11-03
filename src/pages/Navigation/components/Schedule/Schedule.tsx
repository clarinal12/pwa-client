import React from 'react';
import { Page, Toolbar } from 'react-onsenui';

type Props = {
  title: string;
  navigator: any;
}

const Schedule: React.FC<Props> = ({ title, navigator }) => {
  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{title}</div>
        </Toolbar>
      )}

    >

      <div className="content w-full h-full p-5">
        Coming Soon...
      </div>
    </Page>
  );
};

export default Schedule;
