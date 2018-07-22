import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalListItemComponent } from './components/rental-list-item/rental-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RentalComponent, RentalListComponent, RentalListItemComponent],
  exports: [
    RentalComponent
  ]
})
export class RentalModule { }
