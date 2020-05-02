import React from 'react';
import { Tab, Page, Tabbar } from 'react-onsenui';
import { tabSections } from '../../nav-list';

interface IStoresProps {
  navigator: any;
}

const Stores: React.FC<IStoresProps> = ({ navigator }) => {
  const renderTabs = () => {
    return tabSections.map((section, key) => {
      return {
        content: (
          <section.component
            key={key}
            title={section.label}
            navigator={navigator}
          />
        ),
        tab: <Tab key={key} label={section.label} icon={section.icon} />,
      };
    });
  };

  return (
    <Page>
      <Tabbar index={0} renderTabs={() => renderTabs()} />
    </Page>
  );
};

export default Stores;
