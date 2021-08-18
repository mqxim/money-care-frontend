import randomColor from 'randomcolor';

import { Category } from '../../../domain/model/category.model';

let connectionDB: IDBDatabase = null;

const SETTINGS = {
  DB_NAME: 'account_module_db',
  VERSION: 2.0,
};

export const STORES = {
  ACCOUNT: 'account',
  CATEGORY: 'category',
  CURRENCY: 'currency',
  TRANSACTION: 'transaction',
};

const createDefaultValues = (db: IDBDatabase) => {
  const categories = db.transaction(STORES.CATEGORY, 'readwrite').objectStore(STORES.CATEGORY);
  categories.add(new Category('1', 'Food', randomColor()));
  categories.add(new Category('2', 'Auto & Transport', randomColor()));
  categories.add(new Category('3', 'Clothes & Shoes', randomColor()));
  categories.add(new Category('4', 'Apartments', randomColor()));
  categories.add(new Category('5', 'Cafes & Restaurants', randomColor()));
  categories.add(new Category('6', 'Entertainment & Fun', randomColor()));
  categories.add(new Category('7', 'Trips & Travels', randomColor()));
  categories.add(new Category('8', 'Health', randomColor()));
  categories.add(new Category('9', 'Phones & Gadgets', randomColor()));
  categories.add(new Category('10', 'Rash spending', randomColor()));
  categories.add(new Category('11', 'Force Majeure', randomColor()));
};

const makeStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.ACCOUNT)) {
    db.createObjectStore(STORES.ACCOUNT, { keyPath: 'id' });
  }

  if (!db.objectStoreNames.contains(STORES.CATEGORY)) {
    db.createObjectStore(STORES.CATEGORY, { keyPath: 'id' });
  }

  if (!db.objectStoreNames.contains(STORES.CURRENCY)) {
    db.createObjectStore(STORES.CURRENCY, { keyPath: 'id' });
  }

  if (!db.objectStoreNames.contains(STORES.TRANSACTION)) {
    db.createObjectStore(STORES.TRANSACTION, { keyPath: 'id' });
  }
};

export const connect = async (): Promise<IDBDatabase> => {
  if (connectionDB) {
    return connectionDB;
  }

  return await new Promise((resolve, reject) => {
    const openDBRequest = indexedDB.open(SETTINGS.DB_NAME, SETTINGS.VERSION);

    openDBRequest.addEventListener('error', () => {
      reject(openDBRequest.error);
    }, { once: true });

    let updated = false;

    openDBRequest.addEventListener('upgradeneeded', () => {
      makeStore(openDBRequest.result);
      updated = true;
    });

    openDBRequest.addEventListener('success', () => {
      connectionDB = openDBRequest.result;

      try {
        if (updated) {
          createDefaultValues(openDBRequest.result);
        }
      } catch (e) {
      }

      const categories = openDBRequest.result.transaction(STORES.CATEGORY).objectStore(STORES.CATEGORY);
      const r = categories.getAll();
      r.addEventListener('success', () => console.log(r.result));

      resolve(openDBRequest.result);
    }, { once: true });
  });
};


