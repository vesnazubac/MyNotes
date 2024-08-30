import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7241/notificationHub',{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.on('ReceiveReminder', (message: string) => {
      this.showNotification(message);
    });


    this.hubConnection.start().catch(err => console.error('SignalR Connection Error: ', err));
  }

  private showNotification(message: string) {
    // Show a snackbar or toast notification
    console.log("Reminder received:", message);
    console.log(message);
  }
}
