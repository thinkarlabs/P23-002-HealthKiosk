import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

//import ProfilesJson from '../user-profiles/s.json';
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
 Profiles: any;
 
 constructor(private router: Router, private http: UserRegistrationService) {
  console.warn("get api data SUNIL");
  console.log(this.Profiles);   
  }

   
   
   ngOnInit(){
    this.http.getProfiles().subscribe((data) =>{
      console.warn("get api data", data);
      this.Profiles =  data["profile"]
    })
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
