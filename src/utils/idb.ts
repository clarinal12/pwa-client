import Dexie from 'dexie';

const DB_NAME = 'pwa-client-idb';
const DB_VERSION = 1;

const db = new Dexie(DB_NAME);
db.version(DB_VERSION).stores({
  items: 'id',
  transactions: 'id',
  categories: 'id'
});

export default db;
