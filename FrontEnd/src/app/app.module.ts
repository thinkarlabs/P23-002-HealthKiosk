import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileNumberComponent } from './mobile-number/mobile-number.component';
import { OtpComponent } from './otp/otp.component';


const routes: Routes = [
  {
    path:'otp',component:OtpComponent
  },
  {
    path:'mobile-number',component:MobileNumberComponent
  },
  { path: '', redirectTo: 'otp', pathMatch: 'full' }

];



@NgModule({
  declarations: [
    AppComponent,
    MobileNumberComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
