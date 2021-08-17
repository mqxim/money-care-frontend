let connectionDB: IDBDatabase = null;

const SETTINGS = {
  DB_NAME: 'account_module_db',
  VERSION: 1.0,
};

export const STORES = {
  ACCOUNT: 'account',
  CATEGORY: 'category',
  CURRENCY: 'currency',
  TRANSACTION: 'transaction',
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

    openDBRequest.addEventListener('upgradeneeded', () => {
      makeStore(openDBRequest.result);
    });

    openDBRequest.addEventListener('success', () => {
      connectionDB = openDBRequest.result;

      resolve(openDBRequest.result);
    }, { once: true });
  });
};


