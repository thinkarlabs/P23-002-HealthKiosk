import { Injectable } from "@angular/core";
import { UserRegistrationService } from "./user-registration.service";
import { WebsocketService } from "./websocket.service";
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: "root",
})
export class BotOpenAiService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = "";
  tempWords = '';
  queText ='';
  resText='';
  tempWord= '';
  sumText='Hi sun summary';
  constructor(public webSocketService: WebsocketService, public http: UserRegistrationService) {
    //this.webSocketService.connect();
  }


  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      this.tempWord = transcript;
      console.log(transcript);
    });
    this.resText = "Hi How can I help you?"
    
    this.speak()
    
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started");
    this.recognition.addEventListener("end", (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition");
      } else {
        this.queText = this.tempWord;

        this.openai(this.tempWord);
        // this.wordConcat();
        //this.speak()
        
      }
    });
  }

  openai(data: any) {
    if (data) {
      this.http.openaiResult(data).subscribe((data) => {
        console.warn("Return openai data", data);
        this.resText = data["chat"];
        this.speak();
       
      });
    }
  }

    
  
  submit(id:any){
    this.http.submitTranscript({'id': id, 'chat':this.text}).subscribe((data) => {
      console.warn("Return openai summary", data);
      this.sumText = data["chat"];
      // this.saveEpisode({"id": id, "summary": data["chat"]});
      //this.webSocketService.sendMessage("Return openai summary")
    });
  }
  
   

    
    
    
  

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log("End speech recognition");
  }
 

  wordConcat() {
   this.text = this.text + " \n Patient: " + this.tempWord + "\nBot: " + this.resText ;
   
  }

 
  speak() {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(this.resText);
    utterance.pitch = 1.0;
    utterance.rate = 1.1;
    var voices;
    // Populate voices with available options
    window.speechSynthesis.onvoiceschanged = function () {
      voices = synth.getVoices();
    };
    // Set the voice to US English female
    utterance.voice = speechSynthesis.getVoices().filter(function (voice) {
      return voice.name == "Google US English";
    })[0];
    // Built-in speak method for the API
    synth.speak(utterance);
  }
 
   
  



  


}
