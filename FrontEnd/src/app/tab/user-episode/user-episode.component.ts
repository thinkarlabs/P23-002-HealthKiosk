import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotOpenAiService } from '../../services/bot-open-ai.service';
@Component({
  selector: 'pm-user-episode',
  templateUrl: './user-episode.component.html',
  styleUrls: ['./user-episode.component.css'],
  providers: [BotOpenAiService]
})
export class UserEpisodeComponent {
 flag = true;
  constructor(
    private router: Router, public service : BotOpenAiService
  ) { 
    this.service.init()
   }
  ngOnInit(): void {
  }
  startService(){
    if(this.flag){
    this.flag = false;
    this.service.start()
    debugger;
  }else{
    this.flag = true;
    this.service.stop()
  }
  }
  speakService(){
    this.service.speak()
  }
  stopService(){
    this.service.stop()
  }
  onSubmit(){
    this.router.navigate(['episode_wait']);
  }
  onClose(){
    this.router.navigate(['userprofile']);

 
  }
}

