import {Component, OnInit} from '@angular/core';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental = new Rental();
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleImageUpload(event: any) {

  }

  handleImageError() {

  }

  createRental() {
    this.newRental.image =
      '﻿https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg';
    this.rentalService.createRental(this.newRental)
      .subscribe((rental:Rental) => {
          this.router.navigate([`/rentals/${rental._id}`])
        },
        (err: HttpErrorResponse) => {
          this.errors = err.error.errors;

        });

  }

}
