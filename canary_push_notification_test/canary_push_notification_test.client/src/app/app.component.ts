import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      });
    }
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.error('Notification permission denied.');
        }
      }).catch(error => {
        console.error('Notification permission request error:', error);
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
        }).catch(error => {
          console.error('Service Worker ready error:', error);
        });
      } else {
        console.error('Service Worker is not supported in this browser.');
      }
    } else {
      console.error('No notification permission granted.');
    }
  }

  title = 'canary_push_notification_test.client';
}
