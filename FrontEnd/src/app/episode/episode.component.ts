import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {
  constructor(private router: Router){}
onClicking() {
    this.router.navigate(['user_episode']);
   
  }
}
