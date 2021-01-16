import Dashboard from './components/Dashboard';
import Items from './components/Items';
import Transactions from './components/Transactions';
// import Schedule from './components/Schedule';


export const tabSections = [
  {
    label: 'Dashboard',
    component: Dashboard,
    icon: 'md-view-dashboard',
  },
  {
    label: 'Items',
    component: Items,
    icon: 'md-shopping-cart',
  },
  {
    label: 'Transactions',
    component: Transactions,
    icon: 'md-receipt',
  },
  // {
  //   label: 'Schedule',
  //   component: Schedule,
  //   icon: 'md-calendar-note',
  // },
];
