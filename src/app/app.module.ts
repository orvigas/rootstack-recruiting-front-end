import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CanActivateViaAuthGuard } from './_helpers/auth-guard';

import { AgmCoreModule } from '@agm/core';
import { FormComponent } from './home/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOWTVhRfckqqhOyDM1GZAf0UXnY7bga20'
    })
  ],
  providers: [
    authInterceptorProviders,
    CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
