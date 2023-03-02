import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
@Component({
  selector: 'pm-phone-otp',
  templateUrl: './phone-otp.component.html',
  styleUrls: ['./phone-otp.component.css']
})
export class PhoneOtpComponent {

  constructor(private router: Router, private http: UserRegistrationService) { }
  ngOnInit(): void {
   
  }
 
  postOtp(data:any) {
      this.http.otpGenRequest(data).subscribe((data) =>{
        console.warn("Post OTP data", data);
        //this.jwt.set('access_key', data.access_token)
        localStorage.setItem ('token', data["access_token"]);
       
        this.router.navigate(['userprofile']);
      })
   
   
  }
   // constructor(private router: Router){}
   onBack(){
    this.router.navigate(['phone']);

  }


}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'pm-mobile-number',
//   templateUrl: './mobile-number.component.html',
//   styleUrls: ['./mobile-number.component.css']
// })
// export class MobileNumberComponent 
// {
//   constructor(private router:Router)
//   {}
//   goToPage(pagename:String):void
//   {
//     this.router.navigate([`${pagename}`]);
//   }

// }

