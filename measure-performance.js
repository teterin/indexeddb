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
      const start = Date.now();
      const transaction = db.transaction(['objects'], 'readwrite', {durability: 'relaxed'});
      const store = transaction.objectStore('objects');
      store.add({id:Math.round(Math.random()*1000000+1000)})
      transaction.oncomplete = (event) => {
          console.log(Date.now() - start);
      };   
  
    })
    .catch(console.error)
  