import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../services/user-registration.service';
@Component({
  selector: 'pm-confirmpage',
  templateUrl: './confirmpage.component.html',
  styleUrls: ['./confirmpage.component.css']
})
export class ConfirmpageComponent {
  Patient: any;
  Episode: any;
  constructor(private router:Router,private Http: HttpClient,private http: UserRegistrationService){
    var id = window.location.pathname.split("/").pop()
    //console.log(this.Episode);
    http.getProfile(id).subscribe((data) =>{
      console.warn("get api cons data", data);
      debugger;
      this.Episode =  data["profile"]
    })


  }
  // ngOnInit(){
    
  //   // this.Http.post('http://127.0.0.1:8000/doclogin').subscribe((data: any) => {
  //   //   console.log(data);
  //   // });
  //   // this.http.savedoctor().subscribe

  //   this.http.savedoctor({ "username": "sunil","password": "sunil@123"}).subscribe((data) =>{
  //     debugger
      
  //     console.warn("all patient", data);
  //     this.Patient =  data["patient"]
  //   })
  // }
  onConfirm(){
    this.router.navigate(['/doctorhome']);

  }
  admin_episodes(){
    this.router.navigate(['/doctorhome']);

  }


}
