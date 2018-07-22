import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {Routes , RouterModule} from '@angular/router';
import {RentalListComponent} from './rental/components/rental-list/rental-list.component';
import { TempComponent } from './temp/temp.component';
import {RentalModule} from './rental/rental.module';

const routes: Routes = [
  {
    path: '',
    component: RentalListComponent
  },
  {
    path: 'temp',
    component: TempComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TempComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
