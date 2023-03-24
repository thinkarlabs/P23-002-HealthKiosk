import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-episode-call',
  templateUrl: './episode-call.component.html',
  styleUrls: ['./episode-call.component.css']
})
export class EpisodeCallComponent {
  constructor(private router: Router){}
  onClose(){
    this.router.navigate(['doctorhome']);
  }
  onConfirm(){
    this.router.navigate(['doctorhome']);
  }
}
