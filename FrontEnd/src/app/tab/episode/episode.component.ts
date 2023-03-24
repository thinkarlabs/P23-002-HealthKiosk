import { Component } from '@angular/core';
import { Router } from '@angular/router';
import EpisodeJson from '../episode/episode.json'
import { UserRegistrationService } from 'src/app/services/user-registration.service';
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
  Episode: any;
  constructor(private router: Router,  private http: UserRegistrationService){
    //debugger;
    //this.id = this.router.snapshot.params['id'];
    var id = window.location.pathname.split("/").pop()
    //console.log(this.Episode);
    http.getProfile(id).subscribe((data) =>{
      console.warn("get api cons data", data);
      this.Episode =  data["profile"]
    })
  }

  ngOnInit(){
    //debugger;
    // var id = window.location.pathname.split("/").pop()
    // this.http.getProfile(id).subscribe((data) =>{
    //   console.warn("get api  ngin data", data);
    //   debugger;
    //   this.Episode =  data["profile"]
    // })
    //this.id = this.route.snapshot.params['id'];
  }

onClicking() {
    this.router.navigate(['user_episode']);
   
  }
  onCancel(){
    this.router.navigate(['userprofile']);
  }
  onClickingAdd(){
    var id = this.Episode._id.$oid;
    //this.router.navigate(['episode', id]);
    this.router.navigate(['user_episode', id]);
  }
}
