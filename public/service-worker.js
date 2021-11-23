const FILES_TO_CACHE = [
  "/",
  "/public/index.html",
  "/public/manifest.webmanifest",
  "/public/index.js",
  "/public/icons/icon-192x192.png",
  "/public/icons/icon-512x512.png"
];;

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

//retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});