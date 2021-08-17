let connectionDB: IDBDatabase = null;

const SETTINGS = {
  DB_NAME: 'user_module_db',
  VERSION: 1.0,
};

export const STORES = {
  USER: 'account',
};

const makeStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.USER)) {
    db.createObjectStore(STORES.USER, { keyPath: 'id' });
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


