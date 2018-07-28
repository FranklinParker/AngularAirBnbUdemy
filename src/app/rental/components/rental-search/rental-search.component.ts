import {Component, OnInit} from '@angular/core';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {
  rentals: Rental[] = [];
  errors: any[]= [];

  constructor(private rentalService: RentalService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const city = params.city;
      this.rentalService.getRentals(city)
        .subscribe(
          (rentals: Rental[]) => {
            this.rentals = rentals;

          },
          (err) => {
              this.errors = err.error.errors;
          }
        );
    });

  }

}
