// Open database
function openDB(name) {
    return new Promise((resolve,reject) => {
        const request = indexedDB.open(name);
        request.onerror = reject;
        request.onsuccess = event => resolve(event.target.result)
    });
  }
  // Callbacks -> promises
  function promisify(request) {
    return new Promise((resolve,reject) => {
      request.onerror = reject;
      request.onsuccess = resolve;
    });
  }
    
  openDB('MyDB')
    .then(db => {
      const transaction = db.transaction(['objects'], 'readonly');
      const store = transaction.objectStore('objects');
        
      return new Promise((resolve,reject) => {
           const request = store.openCursor(IDBKeyRange.lowerBound(5));
           const res = [];
           request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              res.push(cursor.value);
              cursor.continue();
            } else {
             resolve(res);   
            }        
          };
          request.onerror = reject;
      })
    })
    .then(res => console.log(res))  
    .catch(console.error)