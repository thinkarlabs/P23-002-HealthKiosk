import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserRegistrationService }  from 'src/app/services/user-registration.service';
@Component({
  selector: 'pm-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent {
  constructor(private router: Router,private http:UserRegistrationService){
    
  }
  // onDoctor()
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

}
