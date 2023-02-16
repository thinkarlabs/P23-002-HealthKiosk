import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  constructor(private router:Router)
  {}
  goBack(pagename:String):void
  {
    this.router.navigate([`${pagename}`]);
  }
 
}
