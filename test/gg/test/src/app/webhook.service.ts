// src/app/webhook.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {
  private url = 'http://localhost:5000/data'

  constructor(private http : HttpClient) {
    console.log('WebhookService created');

  }

  getWebhookData(): Observable<any> {
    return this.http.get(this.url);
  }


  showNotification(title: string, body: string) {
    const options = {
      body,
      icon: 'assets/icons/icon-72x72.png',
      badge: 'assets/icons/icon-72x72.png'
    };
    console.log('showNotification:');
    if ('serviceWorker' in navigator) {
      console.log('after if');
      navigator.serviceWorker.ready.then(function(registration) {
        console.log('showNotification2');
        registration.showNotification(title, options);
      });
    }
  }
}
