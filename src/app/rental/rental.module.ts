import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalListItemComponent } from './components/rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      {
        path: '',
        component: RentalListComponent
      },
      {
        path: ':rentalId',
        component: RentalDetailComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent
  ],
  exports: [
    RentalComponent
  ]
})
export class RentalModule { }
