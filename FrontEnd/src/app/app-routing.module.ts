import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileNumberComponent } from '../app/mobile-number/mobile-number.component' ;
import { OtpComponent } from '../app/otp/otp.component';


const routes: Routes = [
  {
    path:'mobile',component:MobileNumberComponent
  },
  {
    path:'otp',component:OtpComponent
  },
 
  { path: '', redirectTo: 'mobile', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
