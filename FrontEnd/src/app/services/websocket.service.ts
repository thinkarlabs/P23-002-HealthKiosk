

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

interface MessageData {
  message: string;
  time?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  send:any;
  
  public socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.webSocketUrl);
       this.socket$.subscribe((data: MessageData) => {
        this.receivedData.push(data);    
      });
      }
    console.warn("araary",this.receivedData);
   }
  
   
  //  public getMessage(): Observable<any> {
  //   return this.messageSubject.asObservable();
  // }

  sendMessage(message: string) {
    // console.warn("send data",this.send);
    this.socket$.next({ message });
  }

  close() {
    this.socket$.complete();
  }
}
