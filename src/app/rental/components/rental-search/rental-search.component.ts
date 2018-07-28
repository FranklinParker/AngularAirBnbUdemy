import { Component, OnInit } from '@angular/core';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';

@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {
  }

  ngOnInit() {
    this.rentalService.getRentals()
      .subscribe(
        (rentals: Rental[]) => {
          this.rentals = rentals;

        },
        (err) => {

        }
      );
  }

}
