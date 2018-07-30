import { Component, OnInit } from '@angular/core';
import {RentalService} from '../../../rental/services/rental.service';
import {Rental} from '../../../rental/models/rental';

@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;
  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getUserRentals()
      .subscribe((rentals:Rental[])=>{
        this.rentals = rentals;

      })
  }

  deleteRental(rental:Rental){
    console.log('delete', rental);
    this.rentalDeleteIndex = undefined;
    this.rentalService.deleteRental(rental)
      .subscribe((result)=>{
        this.removeRental(rental);
      })
  }

  private removeRental(rental: Rental){
    const idx = this.rentals.findIndex((rent)=> rent._id=== rental._id);
    if(idx!=-1){
      this.rentals.splice(idx,1);

    }
  }
  activeBookings(rental:Rental): boolean{
    return rental.bookings.length>0;
  }

}
