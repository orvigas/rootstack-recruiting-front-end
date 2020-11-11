import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent, } from './home/home.component';
import { FormComponent, } from './home/form.component';
import { CanActivateViaAuthGuard } from './_helpers/auth-guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'home/jobs/form', component: FormComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
