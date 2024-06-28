import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
    //this.requestNotificationPermission();
  }


    ngOnInit(): void {
        
    }


  requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.subscribeToPushNotifications();
      } else {
        console.log('Notification permission denied.');
      }
    });
  }

  subscribeToPushNotifications() {
    navigator.serviceWorker.ready.then(registration => {
      const vapidPublicKey = 'BF0I-QO3V_5k3XX4cazzrsiRYSJJGOeAv8f-wJV-Idn3qGUA2bCa9ciCdBwD1dxqNd8tc9kyjrPqlwVyAEsVtHw';
      const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      })
        .then(subscription => {
          console.log('User is subscribed:', subscription);

          // Send subscription to the server
          this.sendSubscriptionToServer(subscription);
        })
        .catch(err => {
          console.log('Failed to subscribe the user: ', err);
        });
    });
  }

  sendSubscriptionToServer(subscription: PushSubscription) {
    fetch('https://localhost:7201/api/PushNotification/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      console.log('Subscription successful:', data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  title = 'notification_app.client';
}
