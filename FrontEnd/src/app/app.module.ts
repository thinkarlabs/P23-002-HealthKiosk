import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfilesComponent } from './tab/user-profiles/user-profiles.component';
import { KioskComponent } from './kiosk/kiosk.component';
// import { NgForm } from '@angular/forms';
import { PhoneOtpComponent } from './tab/phone-otp/phone-otp.component';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './tab/user-registration/user-registration.component';
import { EpisodeComponent } from './tab/episode/episode.component';
import { EpisodeWaitComponent } from './tab/episode-wait/episode-wait.component';
import { EpisodeCallComponent } from './tab/episode-call/episode-call.component';
import { EpisodeConfirmComponent } from './tab/episode-confirm/episode-confirm.component';
import { UserEpisodeComponent } from './tab/user-episode/user-episode.component';
import { FooterComponent } from './common/footer/footer.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';



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
    PatientListComponent,
    PhoneNumberComponent,
    
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebcamModule,
    FormsModule,
    ReactiveFormsModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
