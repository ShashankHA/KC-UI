import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent, canActivate : [AuthguardService] },
{ path: '', redirectTo: "login", pathMatch: 'full' },
{ path: 'register', component: RegistrationComponent },
{ path: '**', component: LoginComponent }]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
