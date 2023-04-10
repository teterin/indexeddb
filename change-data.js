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
      return Promise.resolve()
        .then(() => promisify(store.add({id:1, data: 'Some text 1'})))
        .then(event => {
          const id = event.target.result;
          return promisify(store.get(id))
        })
         .then(event => {
           const obj = event.target.result;
           obj.data = 'Hello world';
           return promisify(store.put(obj));
         })
         .then(() => {
           
         })
    })
    .catch(console.error)