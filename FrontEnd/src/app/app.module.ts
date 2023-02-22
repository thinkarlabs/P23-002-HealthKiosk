import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PhoneOtpComponent } from './phone-otp/phone-otp.component';
import { EpisodeComponent } from './episode/episode.component';
import { PatientlistComponent } from './patientlist/patientlist.component';




@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserProfilesComponent,
    KioskComponent,
    FooterComponent,
    HeaderComponent,
    PhoneOtpComponent,
    EpisodeComponent,
    PatientlistComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    WebcamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
