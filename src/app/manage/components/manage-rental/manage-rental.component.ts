import {Component, OnInit} from '@angular/core';
import {RentalService} from '../../../rental/services/rental.service';
import {Rental} from '../../../rental/models/rental';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              private toastrServ: ToastrService,) {
  }

  ngOnInit() {
    this.rentalService.getUserRentals()
      .subscribe((rentals: Rental[]) => {
        this.rentals = rentals;

      });
  }

  deleteRental(rental: Rental) {
    this.rentalDeleteIndex = undefined;
    this.rentalService.deleteRental(rental)
      .subscribe((result) => {
          this.rentals.splice(this.rentalDeleteIndex, 1);
          this.rentalDeleteIndex = undefined;
        },
        (error: HttpErrorResponse) => {
          this.toastrServ.error(error.error.errors[0].detail, 'Cannot Delete!');
        });
  }


  activeBookings(rental: Rental): boolean {
    return false; //rental.bookings.length>0;
  }

}
