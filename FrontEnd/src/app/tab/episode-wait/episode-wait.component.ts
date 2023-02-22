import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-episode-wait',
  templateUrl: './episode-wait.component.html',
  styleUrls: ['./episode-wait.component.css']
})
export class EpisodeWaitComponent {
  constructor(private router: Router){}
  onConfirmation(){
    this.router.navigate(['episode_confirm']);
  }
  onCall(){
    this.router.navigate(['episode_call']);
  }
  onCancel(){
    this.router.navigate(['user_episode']);
  }
}
