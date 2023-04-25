// import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { WebsocketService } from '../services/websocket.service';
// import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
// import { environment } from 'src/environments/environment';
// interface MessageData {
//   message: string;
//   time?: string;
// }

// @Component({
//   selector: 'pm-doctor-home',
//   templateUrl: './doctor-home.component.html',
//   styleUrls: ['./doctor-home.component.css']
// })
// export class DoctorHomeComponent implements OnInit {
//   @Input() msg:any;
//   public data: any;
//   public messages: string[] = [];
//   public socket$!: WebSocketSubject<any>;
//   public receivedData: MessageData[] = [];
//   constructor(private router:Router,public webSocketService: WebsocketService){
//     //  this.webSocketService.connect();
    
    
 
//   }
//   ngOnInit() {
//     // this.webSocketService.connect();
//     // this.webSocketService.getMessage().subscribe((data: any) => {
//     //   console.log('Received message:', data);
//     //   this.messages.push(data);
//     // });
//   }
// //   ngOnInit() :void{
   
// //    this.webSocketService.connect();
   
  
// //  }
//  getdat(){  
//   console.warn("init krna sikho");
//   // if (!this.socket$ || this.socket$.closed) {
//   //   this.socket$ = webSocket(environment.webSocketUrl);
//   //   this.socket$.subscribe((data: MessageData) => {
//   //     this.receivedData.push(data);
//   //   });
//   }
  
// //   console.warn("yahi chahiye",this.receivedData);
  
  
// //   console.warn('data ni aaya',this.webSocketService.send);
// //   return this.receivedData;
// //  }
//   onCall(){
//     this.router.navigate(['/episode_call']);
//   }
//   onConfirm(){
//     this.router.navigate(['/confirmpage']);
//   }

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserRegistrationService } from 'src/app/services/user-registration.service';
@Component({
  selector: 'pm-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {
  Patient: any;
  data:any;
  constructor(private router:Router,private Http: HttpClient
  ,private http: UserRegistrationService){

  }
  ngOnInit(){
    
    // this.Http.post('http://127.0.0.1:8000/doclogin').subscribe((data: any) => {
    //   console.log(data);
    // });
    // this.http.savedoctor().subscribe

    this.http.savedoctor({ "username": "sunil","password": "sunil@123"}).subscribe((data) =>{
      debugger
      
      console.warn("all patient", data);
      this.Patient =  data["patient"]
    })
  }
  inrefresh(){
    
    this.http.pateint().subscribe((data) =>{
      console.warn("get api data", data);
      this.Patient =  data["pro"]
    })
    this.ngOnInit();
  }
  onCall(){
    this.router.navigate(['/episode_call']);
  }
  onConfirm(){
    this.router.navigate(['/confirmpage']);
  }
  
}

