import {Component, OnInit} from '@angular/core';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental = new Rental();
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService) {
  }

  ngOnInit() {
  }

  handleImageUpload(event: any) {

  }

  handleImageError() {

  }

  createRental() {
    this.newRental.image ='https://www.pexels.com/photo/home-real-estate-106399/'
    this.rentalService.createRental(this.newRental)
      .subscribe((rental) => {
          console.log('rental created', rental);
        },
        (err) => {
          console.log('error', err);

        });

  }

}
