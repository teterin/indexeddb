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
      const transaction = db.transaction(['objects'], 'readwrite');
      const store = transaction.objectStore('objects');
      const promises = [];  
      for(let i=0;i<10;i++) {
          promises.push(promisify(store.add({id:i, data: i})))
      }
    })
    .catch(console.error)