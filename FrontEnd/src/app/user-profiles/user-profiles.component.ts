import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ProfilesJson from '../s.json';
interface PROFILES {
  profile_name: String;
  profile_pic: String;
  profile_gender:String,
  profile_age: String;
}
@Component({
  selector: 'pm-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent {
 Profiles: PROFILES[]= ProfilesJson;
 
  constructor(private router: Router) {
    console.log(this.Profiles);
   
      
   }
   
   
  

  onClickingPlus() {
    this.router.navigate(['registration']);
   
  }
  onClicking(){
    this.router.navigate(['episode']);
  }
  onLogOut(){
    this.router.navigate(['phone']);
  }
}
