import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {

  constructor() { 
    
  }

  private showNotification(title: string, body: string) {
    const options = {
      body,
      icon: 'assets/icons/icon-72x72.png',
      badge: 'assets/icons/icon-72x72.png'
    };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, options);
      });
    }
  }
}
