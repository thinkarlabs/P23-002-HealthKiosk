import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent {
  constructor(private router: Router) { }
  phoneRegistration(data:any){
    console.warn(data);
    // this.router.navigate(['otp']);
    
  }
  onSubmit() {
    this.router.navigate(['otp']);
   
  }
}
