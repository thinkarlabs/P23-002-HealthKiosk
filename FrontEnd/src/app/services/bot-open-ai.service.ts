
  


// }
// // submit(){
// //   this.http.submitTranscript(this.text).subscribe((data) => {
// //     console.warn("Return openai summary", data);
// //     this.resText = data["chat"];
 
// //   });
// // }
import { Injectable } from "@angular/core";
import { UserRegistrationService } from "./user-registration.service";
import { Router } from '@angular/router';
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
  nativeElement: any;
  
  tempWord= '';

  constructor(public http: UserRegistrationService,private router: Router) {}
 
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
    // debugger
    if (data) {
      this.http.openaiResult(data).subscribe((data) => {
        console.warn("Return openai data", data);
        this.resText = data["chat"];
        this.speak();
       // this.recognition.start();
        //this.speak11()
        //this.router.navigate(['userprofile']);
      });
    }
  }

    
  submit(data:any){
    // this.router.navigate(['/display-screen'], { queryParams: { data: JSON.stringify(data) } });
      this.http.submitTranscript(this.text).subscribe((data) => {
        console.warn("Return openai summary", data);
        this.resText = data["chat"];
     
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
    //this.tempWords = "";
    // this.text = this.text + "\nPatient: " + this.resText + " \nBot : " + this.tempWords ;
    //this.resText = "";
    ///debugger
    //this.resText = ""
  }

  // wordConcat1() {
  //   this.text = this.text + " " + this.tempWords + ".";
  //   this.tempWords = "";
  // }

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
  async mute() {
    
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(this.tempWord);
    utterance.pitch = 0;
    utterance.rate = 0;
    var voices;
    // Populate voices with available options
    window.speechSynthesis.onvoiceschanged = function () {
      voices = synth.getVoices();
    };
    // Set the voice to US English female
    // utterance.voice = speechSynthesis.getVoices().filter(function (voice) {
    //   return voice.name == "Google US English";
    // })[0];
    // Built-in speak method for the API
    // synth.speak(utterance);
  }
}
