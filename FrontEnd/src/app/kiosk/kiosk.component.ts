import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { UserRegistrationService } from '../services/user-registration.service';
@Component({
  selector: 'pm-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent {
  constructor(private router: Router,public webSocketService: WebsocketService,private http: UserRegistrationService){
   
  }
  goToPatient(data:any){
    debugger;
  }
  
  postDocRegistration(data:any){
    
    console.warn(data);
    this.http.savedoctor(data).subscribe((result)=>{
      console.warn(result)
      this.router.navigate(['doctorhome']);
    })

  }
  // onDoctor()
  // goToPatient(){
   
  //   this.router.navigate(['doctorhome']);
  // }
}
