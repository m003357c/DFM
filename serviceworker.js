var CACHE_NAME = 'gih-cache-v5';
var BASEPATH = '/DFM/';
var CACHED_URLS = [
  // Our HTML
    BASEPATH + 'first.html',
  // Stylesheets and fonts    
    BASEPATH +  'min-style.css',
    BASEPATH +  'styles.css',
  // JavaScript
    BASEPATH +  'manifest.json',
    BASEPATH +  'material.js',
  // Images
    BASEPATH + 'appimages/paddy.jpg',
    BASEPATH +  'eventsimages/example-work01.jpg',
    BASEPATH + 'eventsimages/example-work02.jpg',
    BASEPATH +  'eventsimages/example-work03.jpg',
    BASEPATH + 'eventsimages/example-work04.jpg',
    BASEPATH +  'eventsimages/example-work07.jpg',
    BASEPATH +  'eventsimages/example-work08.jpg',
];

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === BASEPATH + 'first.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('first.html').then(function(cachedResponse) {
          var fetchPromise = fetch('first.html').then(function(networkResponse) {
            cache.put('first.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
