self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('paddy.jpg') !== -1) {
    event.respondWith(
      fetch('gerbil.jpg')
    );
  }
})
