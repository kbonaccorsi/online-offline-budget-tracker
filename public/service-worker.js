const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/index.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
];

//static cache
const CACHE_NAME = "static-cache-v2";
//dynamic cache
const DATA_CACHE_NAME = "data-cache-v1"

//install event handler
self.addEventListener("install", event => {
  event.waitUntil(
    //open previous cache
    caches.open(CACHE_NAME).then( cache => {
      console.log("Your files were pre-cahced successfully!");
      //update with anything new
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  //skip waiting
  self.skipWaiting();
});

//
self.addEventListener("activate", evt =>  {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
})
//retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});