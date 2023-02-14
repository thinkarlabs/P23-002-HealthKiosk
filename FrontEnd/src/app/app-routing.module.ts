import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OtpComponent } from './otp/otp.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';


const routes: Routes = [
{ path: 'phone', component: PhoneNumberComponent },
{ path: 'otp', component: OtpComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: '', redirectTo: '/phone', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule{
    
}