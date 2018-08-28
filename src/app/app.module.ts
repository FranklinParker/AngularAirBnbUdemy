import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {Routes, RouterModule} from '@angular/router';
import {RentalModule} from './rental/rental.module';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth/service/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './shared/service/token.interceptor';
import {Daterangepicker} from 'ng2-daterangepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ManageModule} from './manage/manage.module';
import {ImageUploadComponent} from './common/components/image-upload/image-upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rentals',
    pathMatch: 'full'
  },


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule,
    AuthModule,
    FormsModule,
    Daterangepicker,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ManageModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
