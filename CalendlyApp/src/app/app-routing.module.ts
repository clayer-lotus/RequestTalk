import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityComponent } from './components/availability/availability.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EditAvailabilityComponent } from './components/edit-availability/edit-availability.component';
import { EditEventTypeComponent } from './components/edit-event-type/edit-event-type.component';
import { EventBookingComponent } from './components/event-booking/event-booking.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { GoogleCalendarIntregrationComponent } from './components/google-calendar-intregration/google-calendar-intregration.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileBookingComponent } from './components/profile-booking/profile-booking.component';
import { SendResetPasswordMailComponent } from './components/send-reset-password-mail/send-reset-password-mail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';
import { SuccessBookingComponent } from './components/success-booking/success-booking.component';
import { AuthGuardService } from './services/auth-service/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'event-types', component: EventTypesComponent, canActivate: [AuthGuardService]},
  {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuardService]},
  {path: 'availability', component: AvailabilityComponent, canActivate: [AuthGuardService]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  {path: 'edit-event-types/:id', component: EditEventTypeComponent, canActivate: [AuthGuardService]},
  {path: 'edit-availability/:id', component: EditAvailabilityComponent, canActivate: [AuthGuardService]},
  {path: 'user/:username', component: ProfileBookingComponent},
  {path: 'user/:username/:event_id', component: EventBookingComponent},
  {path: 'success', component: SuccessBookingComponent},
  {path: 'reset-password', component: SendResetPasswordMailComponent},
  {path: 'calendar-intregration', component: GoogleCalendarIntregrationComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
