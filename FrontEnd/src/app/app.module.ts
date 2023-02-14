import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { OtpComponent } from './otp/otp.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneNumberComponent,
    OtpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, PhoneNumberComponent]
})
export class AppModule { }
