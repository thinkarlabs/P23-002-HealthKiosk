import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-confirmpage',
  templateUrl: './confirmpage.component.html',
  styleUrls: ['./confirmpage.component.css']
})
export class ConfirmpageComponent {
  constructor(private router:Router){

  }
  onConfirm(){
    this.router.navigate(['/doctorhome']);

  }
  admin_episodes(){
    this.router.navigate(['/doctorhome']);

  }


}
