import { Component } from '@angular/core';
import {Router }from '@angular/router'
@Component({
  selector: 'pm-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent {
  constructor (private router :Router)
  {

  }
  goToPatient()
  {
  
    this.router.navigate([`patientlist`]);
    
  }

}
