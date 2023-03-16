import { Component } from '@angular/core';
import { Router } from '@angular/router';
import EpisodeJson from '../episode/episode.json'

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
  selector: 'pm-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {

  Episode: EPISODE[]= EpisodeJson;
  constructor(private router: Router){
    console.log(this.Episode);
  }
onClicking() {
    this.router.navigate(['user_episode']);
   
  }
  onCancel(){
    this.router.navigate(['userprofile']);
  }
  onClickingAdd(){
    this.router.navigate(['user_episode']);
  }
}
