self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: 'assets/icons/icon-72x72.png',
      badge: 'assets/icons/icon-72x72.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });

  