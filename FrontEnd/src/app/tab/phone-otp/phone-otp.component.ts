import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-phone-otp',
  templateUrl: './phone-otp.component.html',
  styleUrls: ['./phone-otp.component.css']
})
export class PhoneOtpComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  onEnter() {
    this.router.navigate(['userprofile']);
   
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

