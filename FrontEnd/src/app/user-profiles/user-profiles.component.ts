import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent {
 
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  onClickingPlus() {
    this.router.navigate(['registration']);
   
  }


}
