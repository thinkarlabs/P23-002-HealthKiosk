import { Component } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable, ReplaySubject} from 'rxjs';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  users:any;
  base64Output : string;
  public text: string = 'Click Here To Take Image';

  showAngularImage =true;
  Gender=['MALE','FEMALE','OTHERS'];
  selected: string="GENDER";
  public webcamImage!: WebcamImage;
 private trigger: Subject<void> = new Subject<void>();
  fileBanner: File;
  eventForm: any;
  urlPreviewBanner: any;
triggerSnapshot(webcamImage: WebcamImage):void{
this.trigger.next();
this.showAngularImage =! webcamImage;
if(this.text === 'Click Here To Take Image') { 
  this.text = 'For retake click Camera Again'
  


}
// console.info('Saved webcam image', webcamImage);
// console.log(this.webcamImage.imageAsDataUrl);
    this.myURL=this.webcamImage.imageAsDataUrl;
// console.log('First Name: ',this.first_name);

}
myURL='';
onURLinserted(){
  console.log(this.webcamImage.imageAsDataUrl);
   return this.myURL=this.webcamImage.imageAsDataUrl;
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
  this.userData.saveuser(data).subscribe((result)=>{
    console.warn(result)
  })
  //location.reload()
  this.router.navigate(['userprofile']);
}


onCancel(){ this.router.navigate(['userprofile']);
}
onSubmit(){
    console.log('submit')
    //location.reload();
   

}

}
