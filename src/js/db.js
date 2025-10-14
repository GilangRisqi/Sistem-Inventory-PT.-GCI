// Database configuration
export const DB_STORES = {
  bahanBakuStock: "bahan_baku_stock",
  bahanBakuTransactions: "bahan_baku_transactions",
  dailyReport: "daily_report",
  iridesseReports: "iridesse-reports",
};

let db = null;

// Force database recreation (for debugging)
export const recreateDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close();
      db = null;
    }

    const deleteRequest = indexedDB.deleteDatabase("PrintingDB");
    deleteRequest.onsuccess = () => {
      openDB().then(resolve).catch(reject);
    };
    deleteRequest.onerror = (event) => {
      console.error("Error deleting database:", event.target.error);
      reject(event.target.error);
    };
  });
};

// Open database connection
export const openDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open("PrintingDB", 4);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;

      // Debug: log database version and available stores
      console.log("Database opened successfully with version:", db.version);
      console.log("Available stores:", [...db.objectStoreNames]);

      // Check specifically for iridesse-reports store
      if (db.objectStoreNames.contains(DB_STORES.iridesseReports)) {
        console.log("✅ iridesse-reports store is available");
      } else {
        console.error("❌ iridesse-reports store is missing!");
      }

      if (db.objectStoreNames.contains(DB_STORES.bahanBakuStock)) {
        const transaction = db.transaction(
          [DB_STORES.bahanBakuStock],
          "readonly"
        );
        const store = transaction.objectStore(DB_STORES.bahanBakuStock);
        console.log("✅ bahanBakuStock store is available");
      }

      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const oldVersion = event.oldVersion;
      const newVersion = event.newVersion;

      // Create Bahan Baku Stock store
      if (!db.objectStoreNames.contains(DB_STORES.bahanBakuStock)) {
        const stockStore = db.createObjectStore(DB_STORES.bahanBakuStock, {
          keyPath: "id",
          autoIncrement: true,
        });
        stockStore.createIndex("category", "category");
        stockStore.createIndex("nomor", "nomor");
        stockStore.createIndex("tanggal", "tanggal");
        stockStore.createIndex("updatedAt", "updatedAt");
        // Composite index untuk kombinasi category + nomor
        stockStore.createIndex("category_nomor", ["category", "nomor"], {
          unique: true,
        });
      } else if (oldVersion < 3) {
        // Add new indexes for existing store
        const transaction = event.target.transaction;
        const stockStore = transaction.objectStore(DB_STORES.bahanBakuStock);

        // Add tanggal index if it doesn't exist
        if (!stockStore.indexNames.contains("tanggal")) {
          stockStore.createIndex("tanggal", "tanggal");
        }

        // Add composite index if it doesn't exist
        if (!stockStore.indexNames.contains("category_nomor")) {
          try {
            stockStore.createIndex("category_nomor", ["category", "nomor"], {
              unique: false,
            });
          } catch (e) {
            console.warn(
              "Could not create unique composite index, creating non-unique:",
              e
            );
          }
        }
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
        transactionsStore.createIndex("nomor", "nomor");
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
        dailyReportStore.createIndex("noSpk", "noSpk");
        dailyReportStore.createIndex("client", "client");
      }

      // Create Iridesse Reports store
      if (!db.objectStoreNames.contains(DB_STORES.iridesseReports)) {
        const iridesseStore = db.createObjectStore(DB_STORES.iridesseReports, {
          keyPath: "id",
          autoIncrement: true,
        });
        iridesseStore.createIndex("tanggal", "tanggal");
        iridesseStore.createIndex("noSpk", "noSpk");
        iridesseStore.createIndex("namaClient", "namaClient");
        iridesseStore.createIndex("status", "status");
      }
    };
  });
};

// Generic add record function
export const addRecord = async (storeName, data) => {
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

// Debug function untuk melihat semua data di database
export const debugDatabase = async () => {
  try {
    const db = await openDB();

    // Check all stores

    // Get all stock data
    const stockData = await getRecords(DB_STORES.bahanBakuStock);

    // Get all transaction data
    const transactionData = await getRecords(DB_STORES.bahanBakuTransactions);

    return { stockData, transactionData };
  } catch (error) {
    console.error("Error debugging database:", error);
    return null;
  }
};

// Update record by ID or timestamp
export const updateRecord = async (storeName, id, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await openDB();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      // First, find the record by id or timestamp
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = (event) => {
        const records = event.target.result;
        let recordToUpdate = null;
        let key = null;

        // Find record by id or timestamp
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          if (
            record.id === id ||
            record.timestamp === id ||
            (typeof id === "string" &&
              record.timestamp &&
              record.timestamp.toString() === id)
          ) {
            recordToUpdate = record;
            // Use the actual key from IndexedDB (usually timestamp)
            key = record.timestamp || record.id;
            break;
          }
        }

        if (!recordToUpdate) {
          reject(new Error("Record tidak ditemukan"));
          return;
        }

        // Update the record with new data
        const updatedRecord = {
          ...recordToUpdate,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };

        // Put the updated record back
        const putRequest = store.put(updatedRecord);

        putRequest.onsuccess = () => {
          console.log("Record updated successfully:", updatedRecord);
          resolve(updatedRecord);
        };

        putRequest.onerror = (event) => {
          console.error("Error updating record:", event.target.error);
          reject(event.target.error);
        };
      };

      getAllRequest.onerror = (event) => {
        console.error("Error finding record:", event.target.error);
        reject(event.target.error);
      };
    } catch (error) {
      console.error("Error in updateRecord:", error);
      reject(error);
    }
  });
};

// Delete record by ID or timestamp
export const deleteRecord = async (storeName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await openDB();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      // First, find the record by id or timestamp
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = (event) => {
        const records = event.target.result;
        let recordToDelete = null;
        let key = null;

        // Find record by id or timestamp
        console.log(
          "🔍 Searching for record with ID:",
          id,
          "type:",
          typeof id,
          "in",
          records.length,
          "records"
        );

        // Convert ID to both string and number for comparison
        const idAsString = String(id);
        const idAsNumber = Number(id);

        console.log("🔄 ID conversion:", {
          original: id,
          asString: idAsString,
          asNumber: idAsNumber,
          isValidNumber: !isNaN(idAsNumber),
        });
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const recordId = record.id;
          const recordTimestamp = record.timestamp;

          console.log(`🔍 Checking record ${i}:`, {
            recordId: recordId,
            recordIdType: typeof recordId,
            recordTimestamp: recordTimestamp,
            recordTimestampType: typeof recordTimestamp,
          });

          // Try multiple matching strategies
          if (
            recordId === id ||
            recordId === idAsString ||
            recordId === idAsNumber ||
            recordTimestamp === id ||
            recordTimestamp === idAsString ||
            recordTimestamp === idAsNumber ||
            String(recordId) === idAsString ||
            String(recordTimestamp) === idAsString
          ) {
            recordToDelete = record;
            // Always use timestamp as key since that's the primary key in IndexedDB
            key = recordTimestamp;
            console.log("✅ Record found:", recordToDelete);
            console.log("🔑 Using timestamp key for delete:", key);
            console.log("🎯 Record details:", {
              id: recordId,
              timestamp: recordTimestamp,
              category: record.category,
              type: record.type,
              jenisKertas: record.jenisKertas,
              ukuran: record.ukuran,
            });
            break;
          }
        }

        if (!recordToDelete) {
          console.log("❌ Record tidak ditemukan dengan ID:", id);
          console.log(
            "📋 Available records:",
            records.map((r) => ({
              id: r.id,
              idType: typeof r.id,
              timestamp: r.timestamp,
              timestampType: typeof r.timestamp,
              category: r.category,
              type: r.type,
            }))
          );
          reject(new Error("Record tidak ditemukan"));
          return;
        }

        // Delete the record - use timestamp as primary key
        console.log("🗑️ Attempting to delete record with timestamp key:", key);
        const deleteRequest = store.delete(key);

        // Also delete any duplicate records with same ID (fallback)
        console.log("🧹 Checking for duplicate records with same ID...");
        const cursor = store.openCursor();
        const duplicateKeys = [];

        cursor.onsuccess = (event) => {
          const cursorResult = event.target.result;
          if (cursorResult) {
            const record = cursorResult.value;
            if (record.id === recordToDelete.id && record.timestamp !== key) {
              duplicateKeys.push(record.timestamp);
              console.log(
                "🔍 Found duplicate record with same ID:",
                record.timestamp
              );
            }
            cursorResult.continue();
          } else {
            // Delete duplicates if found
            duplicateKeys.forEach((dupKey) => {
              const dupDeleteRequest = store.delete(dupKey);
              dupDeleteRequest.onsuccess = () => {
                console.log("🧹 Duplicate record deleted:", dupKey);
              };
            });
          }
        };

        deleteRequest.onsuccess = () => {
          console.log(
            "✅ Record deleted successfully from IndexedDB:",
            recordToDelete
          );
          console.log("🔑 Key used for deletion:", key);

          // Verify deletion by checking if record still exists AND count
          const verifyRequest = store.get(key);
          verifyRequest.onsuccess = (event) => {
            const stillExists = event.target.result;
            if (stillExists) {
              console.log(
                "⚠️ WARNING: Record still exists after delete!",
                stillExists
              );
            } else {
              console.log(
                "✅ VERIFIED: Record successfully removed from IndexedDB"
              );
            }

            // Additional verification: count all records
            const countRequest = store.count();
            countRequest.onsuccess = (event) => {
              const totalCount = event.target.result;
              console.log("📊 Total records after delete:", totalCount);
            };
          };

          resolve(true);
        };

        deleteRequest.onerror = (event) => {
          console.error(
            "❌ Error deleting record from IndexedDB:",
            event.target.error
          );
          console.error("🔑 Key that failed:", key);
          reject(event.target.error);
        };

        // Ensure transaction completes
        transaction.oncomplete = () => {
          console.log("💾 Database transaction completed successfully");
        };

        transaction.onerror = (event) => {
          console.error("❌ Database transaction error:", event.target.error);
          reject(event.target.error);
        };
      };

      getAllRequest.onerror = (event) => {
        console.error("Error finding record:", event.target.error);
        reject(event.target.error);
      };
    } catch (error) {
      console.error("Error in deleteRecord:", error);
      reject(error);
    }
  });
};

// Force refresh DB connection to ensure fresh data after delete
export const forceRefreshDB = async () => {
  return new Promise((resolve) => {
    if (db) {
      console.log("🔄 Force closing DB connection for fresh data");
      db.close();
      db = null;
    }

    // Longer delay to ensure IndexedDB properly releases resources
    setTimeout(async () => {
      await openDB();
      console.log("✅ DB connection refreshed");

      // Force a dummy operation to ensure connection is active
      const testTransaction = db.transaction(
        [DB_STORES.bahanBakuTransactions],
        "readonly"
      );
      const testStore = testTransaction.objectStore(
        DB_STORES.bahanBakuTransactions
      );
      const countRequest = testStore.count();

      countRequest.onsuccess = () => {
        console.log("✅ DB connection verified active");
      };

      // Immediately verify database state after refresh
      const verifyTransaction = db.transaction(
        [DB_STORES.bahanBakuTransactions],
        "readonly"
      );
      const verifyStore = verifyTransaction.objectStore(
        DB_STORES.bahanBakuTransactions
      );
      const getAllRequest = verifyStore.getAll();

      getAllRequest.onsuccess = (event) => {
        const allRecords = event.target.result;
        const bannerOutRecords = allRecords.filter(
          (r) => r.category === "banner" && r.type === "out"
        );

        console.log("🔍 POST-REFRESH VERIFICATION:");
        console.log("  📊 Total records after refresh:", allRecords.length);
        console.log(
          "  🎯 Banner Out records after refresh:",
          bannerOutRecords.length
        );
        console.log(
          "  📋 Banner Out IDs after refresh:",
          bannerOutRecords.map((r) => r.id)
        );
        console.log(
          "  📝 Banner Out details:",
          bannerOutRecords.map((r) => ({
            id: r.id,
            timestamp: r.timestamp,
            jenisKertas: r.jenisKertas,
            ukuran: r.ukuran,
          }))
        );
      };

      resolve(true);
    }, 100);
  });
};

// Manual delete test function for debugging
const manualDeleteTest = async (recordId) => {
  try {
    console.log(
      "🧪 Manual Delete Test - ID:",
      recordId,
      "type:",
      typeof recordId
    );

    await openDB();
    const transaction = db.transaction(
      [DB_STORES.bahanBakuTransactions],
      "readwrite"
    );
    const store = transaction.objectStore(DB_STORES.bahanBakuTransactions);

    // Check if record exists before delete
    const getAllRequest = store.getAll();
    getAllRequest.onsuccess = (event) => {
      const allRecords = event.target.result;
      const bannerOutRecords = allRecords.filter(
        (r) => r.category === "banner" && r.type === "out"
      );

      console.log(
        "📋 Banner Out records before manual delete:",
        bannerOutRecords.length
      );
      console.log(
        "🎯 Records:",
        bannerOutRecords.map((r) => ({
          id: r.id,
          timestamp: r.timestamp,
          itemName: r.jenisKertas + " " + r.ukuran,
        }))
      );

      // Find target record
      const targetRecord = bannerOutRecords.find((r) => r.id === recordId);
      if (targetRecord) {
        console.log("✅ Target record found for manual delete:", targetRecord);

        // Try to delete manually
        const deleteKey = targetRecord.timestamp || targetRecord.id;
        console.log("🔑 Using delete key:", deleteKey);

        const deleteRequest = store.delete(deleteKey);
        deleteRequest.onsuccess = () => {
          console.log("✅ Manual delete successful");

          // Verify by getting all records again
          setTimeout(() => {
            const verifyTransaction = db.transaction(
              [DB_STORES.bahanBakuTransactions],
              "readonly"
            );
            const verifyStore = verifyTransaction.objectStore(
              DB_STORES.bahanBakuTransactions
            );
            const verifyRequest = verifyStore.getAll();

            verifyRequest.onsuccess = (event) => {
              const afterRecords = event.target.result;
              const afterBannerOut = afterRecords.filter(
                (r) => r.category === "banner" && r.type === "out"
              );
              console.log(
                "📋 Banner Out records after manual delete:",
                afterBannerOut.length
              );
              console.log(
                "🔄 Difference:",
                bannerOutRecords.length - afterBannerOut.length
              );
            };
          }, 100);
        };

        deleteRequest.onerror = (event) => {
          console.log("❌ Manual delete failed:", event.target.error);
        };
      } else {
        console.log("❌ Target record NOT found for manual delete");
      }
    };
  } catch (error) {
    console.error("❌ Manual delete test error:", error);
  }
};

// Make debug functions available globally for console testing
if (typeof window !== "undefined") {
  window.debugDB = debugDatabase;
  window.forceRefreshDB = forceRefreshDB;
  window.manualDeleteTest = manualDeleteTest;
}
