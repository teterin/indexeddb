// Open database
function openDB(name) {
  return new Promise((resolve,reject) => {
      const request = indexedDB.open(name);
      request.onerror = reject;
      request.onsuccess = event => resolve(event.target.result)
      // apply database migrations
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('objects', { keyPath: 'id' });
      };
  });
}
  
openDB('MyDB')
  .then(db => {
    console.log('DB is ready');
  })
  .catch(console.error)