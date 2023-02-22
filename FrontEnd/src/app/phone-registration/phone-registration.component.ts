import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-phone-registration',
  templateUrl: './phone-registration.component.html',
  styleUrls: ['./phone-registration.component.css']
})
export class PhoneRegistrationComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['otp']);
   
  }
  

}
