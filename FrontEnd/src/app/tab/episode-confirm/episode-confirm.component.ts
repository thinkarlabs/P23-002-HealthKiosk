import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'pm-episode-confirm',
  templateUrl: './episode-confirm.component.html',
  styleUrls: ['./episode-confirm.component.css']
})
export class EpisodeConfirmComponent {
   constructor(private router: Router){}
   onClose(){
    this.router.navigate(['userprofile']);

   }
}
