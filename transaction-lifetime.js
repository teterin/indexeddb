// Open database
function openDB(name) {
    return new Promise((resolve,reject) => {
        const request = indexedDB.open(name);
        request.onerror = reject;
        request.onsuccess = event => resolve(event.target.result)
    });
  }
  
  openDB('MyDB')
    .then(db => {
      const transaction = db
      .transaction(['objects'], 'readwrite');
      transaction.oncomplete = () => {
        console.log('complete');
      }
      return new Promise(resolve => {
          const store = transaction.objectStore("objects");
          const request = store.get(6);
          request.onsuccess = (event) => {
            console.log('first request') 
            const nextRequest = store.get(7);
            nextRequest.onsuccess = (event) => {
               console.log('second request')
                resolve();
            };
          };
      });
    })
    .then(()=>{
        console.log('next action');
    })  
    .catch(err => {
        // handle err
    });