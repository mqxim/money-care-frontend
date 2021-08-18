import { Category } from '../../../domain/model/category.model';
import { RandomServiceImpl } from '../../../../shared/infrastructure/service/random.service';

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
  const random = new RandomServiceImpl();

  const categories = db.transaction(STORES.CATEGORY, 'readwrite').objectStore(STORES.CATEGORY);
  categories.add(new Category(random.makeId(), 'Food', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Auto & Transport', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Clothes & Shoes', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Apartments', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Cafes & Restaurants', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Entertainment & Fun', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Trips & Travels', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Health', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Phones & Gadgets', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Rash spending', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Force Majeure', random.makeColor()));
  categories.add(new Category(random.makeId(), 'Salary & Other Incomes', random.makeColor()));
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

      resolve(openDBRequest.result);
    }, { once: true });
  });
};


