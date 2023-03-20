import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-confirm-patient-appointment',
  templateUrl: './confirm-patient-appointment.component.html',
  styleUrls: ['./confirm-patient-appointment.component.css']
})
export class ConfirmPatientAppointmentComponent {
  constructor(private router:Router){

  }
  onConfirm(){
    this.router.navigate(['/patient']);

  }
  admin_episodes(){
    this.router.navigate(['/patient']);

  }

}
