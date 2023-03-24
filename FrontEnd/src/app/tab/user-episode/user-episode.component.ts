import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BotOpenAiService } from "../../services/bot-open-ai.service";
@Component({
  selector: "pm-user-episode",
  templateUrl: "./user-episode.component.html",
  styleUrls: ["./user-episode.component.css"],
  providers: [BotOpenAiService],
})
export class UserEpisodeComponent {
  flag = true;
  constructor(private router: Router, public service: BotOpenAiService) {
    this.service.init();
  }
  ngOnInit(): void {}
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

    var id = window.location.pathname.split("/").pop()
    this.service.submit(id);
    //elem1 = document.getElementById("summId");
    //elem1.value = "Finish";
    //document.getElementById("summId").innerHTML = this.service.sumText;
    //this.router.navigate(["episode_wait"]);
  }
  onClose() {
    this.router.navigate(["userprofile"]);
  }
}
