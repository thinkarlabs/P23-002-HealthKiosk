import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneOtpComponent } from './phone-otp/phone-otp.component';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { EpisodeComponent } from './episode/episode.component';
import { UserEpisodeComponent } from './user-episode/user-episode.component';
import { EpisodeWaitComponent } from './episode-wait/episode-wait.component';
import { EpisodeCallComponent } from './episode-call/episode-call.component';
import { EpisodeConfirmComponent } from './episode-confirm/episode-confirm.component';



@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserProfilesComponent,
    KioskComponent,
    FooterComponent,
    PhoneOtpComponent,
    EpisodeComponent,
    UserEpisodeComponent,
    EpisodeWaitComponent,
    EpisodeCallComponent,
    EpisodeConfirmComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebcamModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
