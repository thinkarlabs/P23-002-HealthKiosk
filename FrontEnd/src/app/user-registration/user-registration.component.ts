import { Component } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'pm-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  public webcamImage!: WebcamImage;
private trigger: Subject<void> = new Subject<void>();
triggerSnapshot(): void {
this.trigger.next();
}
handleImage(webcamImage: WebcamImage): void {
console.info('Saved webcam image', webcamImage);
this.webcamImage = webcamImage;
}

public get triggerObservable(): Observable<void> {
return this.trigger.asObservable();
}
constructor (private router:Router)
{

}
goNext():void
{
  this.router.navigate([`episode`]);
}
}


