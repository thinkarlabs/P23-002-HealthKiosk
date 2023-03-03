import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../services/user-registration.service';
@Component({
  selector: 'pm-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent {
  constructor(private router: Router, private http: UserRegistrationService) { }
  ngOnInit(): void {
   
  }
 
  onClickSubmit(data:any) {
    //console.warn(data);
      //console.warn(data.sunil)
      this.http.phoneRegRequest(data).subscribe((data) =>{
      console.warn("POst Mobule number data", data);
    })
      this.router.navigate(['otp']);
   
  }
}
