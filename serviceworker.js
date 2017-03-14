self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response(
        'Welcome to the our service worker test \n'+        
'There seems to be a problem with your connection.\n'+        
'We look forward to telling you about Paddy as soon as you are online'
      );
    })
  );
});
