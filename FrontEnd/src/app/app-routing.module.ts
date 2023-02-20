
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
// import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { PhoneRegistrationComponent } from './phone-registration/phone-registration.component';
import { PhoneOtpComponent } from './phone-otp/phone-otp.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { EpisodeComponent } from './episode/episode.component';
import { UserEpisodeComponent } from './user-episode/user-episode.component';
import { EpisodeWaitComponent } from './episode-wait/episode-wait.component';
import { EpisodeConfirmComponent } from './episode-confirm/episode-confirm.component';
import { EpisodeCallComponent } from './episode-call/episode-call.component';

const routes: Routes = [
  { path: 'registration', component : UserRegistrationComponent},
  { path:'phone',component :  PhoneRegistrationComponent},
  { path:'', component:KioskComponent},
  { path:'otp',component:PhoneOtpComponent},
  { path:'userprofile', component:UserProfilesComponent},
  { path:'episode', component:EpisodeComponent},
  { path:'user_episode',component:UserEpisodeComponent},
  { path:'episode_wait', component:EpisodeWaitComponent},
  { path: 'episode_confirm',component:EpisodeConfirmComponent},
  { path: 'episode_call',component:EpisodeCallComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
