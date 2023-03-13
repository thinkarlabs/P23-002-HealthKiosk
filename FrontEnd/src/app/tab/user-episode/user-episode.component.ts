 import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WebcamImage } from "ngx-webcam";

import { BotOpenAiService } from "../../services/bot-open-ai.service";
@Component({
  selector: "pm-user-episode",
  templateUrl: "./user-episode.component.html",
  styleUrls: ["./user-episode.component.css"],
  providers: [BotOpenAiService],
})
export class UserEpisodeComponent {
  flag = true;
  public webcamImage!: WebcamImage;
  showAngularImage =true;
  
 newMessage = '';
 
 summary = '';


  messageList: string[] = [];
  
  constructor(private router: Router, public service: BotOpenAiService) {
    this.service.init();
  }
  ngOnInit() {
   
   
  }

 
  startService() {
    if (this.flag) {
      this.flag = false;
      debugger;
      let elem = document.getElementById("strt");
      elem.textContent = "Finish";
      this.service.start();
      //debugger;
    } else {
      let elem = document.getElementById("strt");
      elem.textContent = "Start";
      this.flag = true;
      this.service.stop();
    }
  }
  
  
  speakService() {
    this.service.speak();
  }
  stopService() {
    this.service.stop();
  }
  onSubmit() {
    this.router.navigate(["episode_wait"]);
    
  

  }
 
 

  triggerSnapshot(webcamImage: WebcamImage):void{}
 
  onClose() {
    this.router.navigate(["userprofile"]);
  }
}
