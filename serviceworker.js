self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('gih-cache').then(function(cache) {
      return cache.add('offline.html');
    })
  );
});
