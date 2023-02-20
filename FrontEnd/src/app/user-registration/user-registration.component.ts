import { Component } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  Gender=['MALE','FEMALE','OTHERS'];
  selected: string="GENDER";
  public webcamImage!: WebcamImage;
private trigger: Subject<void> = new Subject<void>();
triggerSnapshot(): void {
this.trigger.next();
}
handleImage(webcamImage: WebcamImage): void {
console.info('Saved webcam image', webcamImage);
this.webcamImage = webcamImage;
}
constructor(private router: Router){}
public get triggerObservable(): Observable<void> {
return this.trigger.asObservable();
}
postUserRegistration(data:any){
  console.warn(data);

}
onCancel(){ this.router.navigate(['userprofile']);
}

}
