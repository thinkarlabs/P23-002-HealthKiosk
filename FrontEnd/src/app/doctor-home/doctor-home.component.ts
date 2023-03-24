import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {
  constructor(private router:Router){

  }
  onCall(){
    this.router.navigate(['/episode_call']);
  }
  onConfirm(){
    this.router.navigate(['/confirmpage']);
  }
  
}
