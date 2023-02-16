
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
// import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { PhoneRegistrationComponent } from './phone-registration/phone-registration.component';
import { PhoneOtpComponent } from './phone-otp/phone-otp.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';

const routes: Routes = [
  { path: 'registration', component : UserRegistrationComponent},
  { path:'phone',component :  PhoneRegistrationComponent},
  { path:'', component:KioskComponent},
  { path:'otp',component:PhoneOtpComponent},
  { path:'userprofile', component:UserProfilesComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
