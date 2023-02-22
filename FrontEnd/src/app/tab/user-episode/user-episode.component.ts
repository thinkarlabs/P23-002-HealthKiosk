import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-user-episode',
  templateUrl: './user-episode.component.html',
  styleUrls: ['./user-episode.component.css']
})
export class UserEpisodeComponent {
  constructor(private router: Router){}
  onSubmit(){
    this.router.navigate(['episode_wait']);
  }
  onClose(){
    this.router.navigate(['userprofile']);
  }
  }

