import {Component, OnInit} from '@angular/core';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
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

        },
        () => {
        }
      );
  }

}
