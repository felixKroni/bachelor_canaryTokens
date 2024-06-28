import { Component, OnInit } from '@angular/core';
import { WebhookService } from './webhook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  webhookData: any;
  constructor(private webhookService: WebhookService) {}

  ngOnInit() {
    this.requestNotificationPermission();
    this.pollData();
  }
  pollData() { //Checks every 5 seconds for new data from the webhook
    setInterval(() => {
      this.webhookService.getWebhookData().subscribe(
        response => {
        if (response && response.length > 0) {
          this.webhookData = response;
          console.log('Data received from webhook:', this.webhookData);
          this.webhookData = this.webhookData.map((item: any) => item.memo);
          console.log('memo:', this.webhookData);
          this.webhookService.showNotification('New Canary Token Alert', this.webhookData)
        }
        },
        error => {
          console.error('Error:', error);
        }
      );
    }, 5000); // Poll every 5 seconds
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

}
