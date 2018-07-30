import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRentalComponent } from './components/manage-rental/manage-rental.component';
import { ManageBookingComponent } from './components/manage-booking/manage-booking.component';
import {RentalDetailComponent} from '../rental/components/rental-detail/rental-detail.component';
import {RentalCreateComponent} from '../rental/components/rental-create/rental-create.component';
import {RentalListComponent} from '../rental/components/rental-list/rental-list.component';
import {RentalComponent} from '../rental/rental.component';
import {AuthGuard} from '../auth/service/auth.guard';
import {RentalSearchComponent} from '../rental/components/rental-search/rental-search.component';
import {RouterModule, Routes} from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      {
        path: 'rentals',
        component: ManageRentalComponent,
      },
      {
        path: 'bookings',
        component: ManageBookingComponent,
        canActivate: [AuthGuard]

      },

    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ManageRentalComponent,
    ManageBookingComponent,
    ManageComponent
  ]
})
export class ManageModule { }
