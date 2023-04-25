import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { UserRegistrationService } from '../services/user-registration.service';
@Component({
  selector: 'pm-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent {
  
 
  constructor(private router: Router, private http: UserRegistrationService,public webSocketService: WebsocketService) { 
    // this.webSocketService.connect();
  }
  
  // ngOnInit(): void {
  //    this.webSocketService.connect();
  
   
  // // }
  // send:any;
  // message = '';
  

  // sends(message){
  //   //  this.router.navigate(['doctorhome']);
  //   this.webSocketService.sendMessage(message);
  // }

  // sendMessage(message: string) {
  //   this.webSocketService.sendMessage(message);
    
   
  //   console.warn("og data",this.message);
  //   console.warn("send",this.send);
  //     // this.router.navigate(['otp']);
  // }

  ngOnDestroy() {
    this.webSocketService.close();
  }
 
  onClickSubmit(data:any) {
   
      this.http.phoneRegRequest(data).subscribe((data) =>{
      console.warn("POst Mobule number data", data);
    })
      this.router.navigate(['otp']);
   
  }
}
