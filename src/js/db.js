// Database configuration
export const DB_STORES = {
  bahanBakuStock: "bahan_baku_stock",
  bahanBakuTransactions: "bahan_baku_transactions",
  dailyReport: "daily_report",
};

// Open database connection
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PrintingDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create Bahan Baku Stock store
      if (!db.objectStoreNames.contains(DB_STORES.bahanBakuStock)) {
        const stockStore = db.createObjectStore(DB_STORES.bahanBakuStock, {
          keyPath: "id",
          autoIncrement: true,
        });
        stockStore.createIndex("category", "category");
        stockStore.createIndex("updatedAt", "updatedAt");
      }

      // Create Bahan Baku Transactions store
      if (!db.objectStoreNames.contains(DB_STORES.bahanBakuTransactions)) {
        const transactionsStore = db.createObjectStore(
          DB_STORES.bahanBakuTransactions,
          {
            keyPath: "id",
            autoIncrement: true,
          }
        );
        transactionsStore.createIndex("category", "category");
        transactionsStore.createIndex("type", "type");
        transactionsStore.createIndex("timestamp", "timestamp");
      }

      // Create Daily Report store
      if (!db.objectStoreNames.contains(DB_STORES.dailyReport)) {
        const dailyReportStore = db.createObjectStore(DB_STORES.dailyReport, {
          keyPath: "id",
          autoIncrement: true,
        });
        dailyReportStore.createIndex("tanggal", "tanggal");
        dailyReportStore.createIndex("shift", "shift");
      }
    };
  });
};

// Generic add record function
export const addRecord = async (storeName, data) => {
  console.log("Adding record to store:", storeName, data);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    // Ensure tanggal is a Date object
    const processedData = {
      ...data,
      tanggal: data.tanggal ? new Date(data.tanggal) : new Date(),
      timestamp: new Date().toISOString(),
    };

    const request = store.add(processedData);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Generic get records function
export const getRecords = async (storeName, query = null) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      let results = request.result;
      if (query) {
        results = results.filter((record) => {
          for (let key in query) {
            if (record[key] !== query[key]) return false;
          }
          return true;
        });
      }
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

// Get records by date range
export const getRecordsByDateRange = async (storeName, startDate, endDate) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result.filter((record) => {
        const recordDate = new Date(record.tanggal);
        return recordDate >= startDate && recordDate <= endDate;
      });
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

// Get records by index
export const getRecordsByIndex = async (storeName, indexName, value) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Sync queue management
export const addToSyncQueue = async (data) => {
  const queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
  queue.push({
    id: Date.now(),
    data,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("syncQueue", JSON.stringify(queue));
};

export const processSyncQueue = async () => {
  if (!navigator.onLine) return;

  const queue = JSON.parse(localStorage.getItem("syncQueue") || "[]");
  if (queue.length === 0) return;

  // Process each item in the queue
  // This is where you would implement the actual sync logic with your backend
  // For now, we'll just clear the queue
  localStorage.setItem("syncQueue", "[]");
};
