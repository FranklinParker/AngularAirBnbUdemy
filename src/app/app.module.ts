import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {Routes, RouterModule} from '@angular/router';
import {RentalModule} from './rental/rental.module';
import {AuthModule} from './auth/auth.module';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rentals',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
