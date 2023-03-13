import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {UserRegistrationService} from './user-registration.service';
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'angularwebcam';

router: string;
constructor(private _router: Router){
  
    this.router = _router.url; 
}

}
