import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.css']
})
export class MobileNumberComponent 
{
  constructor(private router:Router)
  {}
  goToPage(pagename:String):void
  {
    this.router.navigate([`${pagename}`]);
  }

}
