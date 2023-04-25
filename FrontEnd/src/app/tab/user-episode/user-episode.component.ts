import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BotOpenAiService } from "../../services/bot-open-ai.service";
import { WebsocketService } from "src/app/services/websocket.service";
@Component({
  selector: "pm-user-episode",
  templateUrl: "./user-episode.component.html",
  styleUrls: ["./user-episode.component.css"],
  providers: [BotOpenAiService],
})
export class UserEpisodeComponent {
  send="her";
  msg! :any;
  flag = true;
  constructor(private router: Router, public service: BotOpenAiService,public webSocketService: WebsocketService) {
    this.service.init();
  }
  // ngOnInit(): void {
    
  //   this.msg=this.send;
  //   this.webSocketService.connect();
  
  // }
  
  // sent:any;
  // message = '';
  

  

  // sendMessage(message: string) {
  //    this.sent=this.message;
  //    console.warn("yeh chahiye",this.sent);
  //   this.webSocketService.sendMessage(message);
   
    
   
  //   console.warn("og data",this.message);
  //   // console.warn("send",this.send);
  //   //  this.router.navigate(['doctorhome']);
  // }

  // // ngOnDestroy() {
  // //   this.webSocketService.close();
  // // }
 
  startService() {
    if (this.flag) {
      this.flag = false;
      let elem = document.getElementById("strt");
      elem.textContent = "Finish";
      this.service.start();
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
    // this.webSocketService.sendMessage(this.message);

    var id = window.location.pathname.split("/").pop()
    this.service.submit(id);
    //  this.router.navigate(["doctorhome"]);
     this.router.navigate(["episode_wait"]);
  console.warn("sumaary",)
  }
  onClose() {
    this.router.navigate(["userprofile"]);
  }
  toggleMic(){}
  toggleMute(){}
}
