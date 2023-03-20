import { Component } from '@angular/core';
import { Router } from '@angular/router';
import EpisodeJson from '../tab/episode/episode.json';
interface EPISODE{
  ep_name:String; 
  ep_pic:String;
  ep_age: String;
  ep_date: String;
  ep_time: String;
  ep_followup: String;
  ep_smry: String;
  ep_doc: String;
  ep_action:String; 
}
@Component({
  selector: 'pm-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  Episode: EPISODE[]= EpisodeJson;
  constructor(private router: Router){
    console.log(this.Episode);
  }
  adminepisodeconfirm(){
    this.router.navigate(['ConfirmPatientAppointmentComponent'])
  }
 
  // constructor() {
  //   console.log(this.Episode);
   
      
  //  }
}
