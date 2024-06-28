import { Component, OnInit } from '@angular/core';
import { WebhookService } from './webhook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private webhookService: WebhookService) { }
  title = 'canary-notification-app';


  ngOnInit() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      });
    }
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.error('Notification permission denied.');
        }
      });
    } else {
      console.error('Notifications are not supported in this browser.');
    }
  }

  sendTestNotification() {
    const title = 'Test Notification';
    const options = {
      body: 'This is a test notification',
      icon: 'assets/icons/icon-72x72.png',
      badge: 'assets/icons/icon-72x72.png'
    };

    if ('Notification' in window && Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
        });
      } else {
        console.error('Service Worker is not supported in this browser.');
      }
    } else {
      console.error('No notification permission granted.');
    }
  }
}
