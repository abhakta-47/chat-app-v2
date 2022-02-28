const setBrowserDB = () => {
  let indexedDB = window.indexedDB;
  // let indexedDB =
  //   window.indexedDB ||
  //   window.mozIndexedDB ||
  //   window.webkitIndexedDB ||
  //   window.msIndexedDB;
  // Let us open our database
  let request = indexedDB.open("keysdb", 2);
  request.onerror = (event) => {
    console.error(event);
  };
  // request.onsuccess = (event: any) => {
  //   console.log("db acceccessed");
  // };
  request.onupgradeneeded = (event: any) => {
    let db = event.target.result;
    if (!db.objectStoreNames.contains("passkeys")) {
      let objectStore = db.createObjectStore("passkeys", {
        keyPath: "room_id",
      });
    }
    // console.log("db upgraded");
  };
};

export const getKey = (roomId: string): Promise<CryptoKey> => {
  return new Promise((resolve, reject) => {
    let indexedDB = window.indexedDB;
    // let indexedDB =
    //   window.indexedDB ||
    //   window.mozIndexedDB ||
    //   window.webkitIndexedDB ||
    //   window.msIndexedDB;
    let request = indexedDB.open("keysdb");
    request.onerror = (event) => {
      console.error(event);
    };
    request.onsuccess = (event: any) => {
      let db = event.target.result;
      let transaction = db.transaction("passkeys", "readonly");
      let passkeys = transaction.objectStore("passkeys");
      // console.log(roomId);
      let addKeyReq = passkeys.get(roomId);
      addKeyReq.onsuccess = function () {
        let key: CryptoKey = addKeyReq.result.key;
        resolve(key);
      };
      addKeyReq.onerror = function () {
        console.error("Error", addKeyReq.error);
      };
    };
  });
};

export const addKey = (roomId: string, key: CryptoKey) => {
  let indexedDB = window.indexedDB;
  // let indexedDB =
  //   window.indexedDB ||
  //   window.mozIndexedDB ||
  //   window.webkitIndexedDB ||
  //   window.msIndexedDB;
  // Let us open our database
  let request = indexedDB.open("keysdb");
  request.onerror = (event) => {
    console.error(event);
  };
  request.onsuccess = (event: any) => {
    let db: IDBDatabase = event.target.result;
    let transaction = db.transaction("passkeys", "readwrite");
    let passkeys = transaction.objectStore("passkeys");
    let addKeyReq = passkeys.add({
      room_id: roomId,
      key: key,
    });
    addKeyReq.onsuccess = function () {
      // console.log("new key added to the store", addKeyReq.result, key);
    };

    addKeyReq.onerror = function () {
      console.error("Error", addKeyReq.error);
    };
  };
};

export { setBrowserDB };
