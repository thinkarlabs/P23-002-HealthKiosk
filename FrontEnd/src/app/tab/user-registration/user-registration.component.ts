import { Component } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
//import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
@Component({
  selector: 'pm-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  users:any;
  showAngularImage =true;
  Gender=['MALE','FEMALE','OTHERS'];
  selected: string="GENDER";
  public webcamImage!: WebcamImage;
 private trigger: Subject<void> = new Subject<void>();
triggerSnapshot(webcamImage: WebcamImage):void{
this.trigger.next();
this.showAngularImage =! webcamImage;
console.info('Saved webcam image', webcamImage);

}
handleImage(webcamImage: WebcamImage): void {
console.info('Saved webcam image', webcamImage);
this.webcamImage = webcamImage;

}
constructor(private router: Router,private userData:UserRegistrationService){
  // this.userData.users().suscribe((data)=>{
  //   this.users=data;
  // })
  
}
public get triggerObservable(): Observable<void> {
return this.trigger.asObservable();
}

postUserRegistration(data:any){
  console.warn(data);
  
}


onCancel(){ this.router.navigate(['userprofile']);
}
onSubmit(){
    console.log('submit')
  //   this.userData.saveuser().subscribe((result)=>{
  //   console.warn(result)
  // })

}

}
