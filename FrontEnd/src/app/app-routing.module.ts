import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KioskComponent } from './kiosk/kiosk.component';
import { UserProfilesComponent } from './tab/user-profiles/user-profiles.component';
import { PhoneOtpComponent } from './tab/phone-otp/phone-otp.component';
import { UserEpisodeComponent } from './tab/user-episode/user-episode.component';
import { UserRegistrationComponent } from './tab/user-registration/user-registration.component';
import { EpisodeCallComponent } from './tab/episode-call/episode-call.component';
import { EpisodeConfirmComponent } from './tab/episode-confirm/episode-confirm.component';
import { EpisodeWaitComponent } from './tab/episode-wait/episode-wait.component';
import { EpisodeComponent } from './tab/episode/episode.component';
import { ConfirmpageComponent } from './confirmpage/confirmpage.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';

const routes: Routes = [
  { path: 'registration', component : UserRegistrationComponent},
  { path:'doctorhome',component :  DoctorHomeComponent},
  { path :'phone',component:PhoneNumberComponent},
  { path:'', component:KioskComponent},
  { path:'otp',component:PhoneOtpComponent},
  { path:'userprofile', component:UserProfilesComponent},
  { path:'episode/:id', component:EpisodeComponent},
  { path:'user_episode/:id',component:UserEpisodeComponent},
  { path:'episode_wait', component:EpisodeWaitComponent},
  { path: 'episode_confirm',component:EpisodeConfirmComponent},
  { path: 'episode_call',component:EpisodeCallComponent},
  { path: 'confirmpage',component:ConfirmpageComponent},
  { path:'user_episode',component:UserEpisodeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
