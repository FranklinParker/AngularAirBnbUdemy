import { Component, OnInit } from '@angular/core';
import {RentalService} from '../../../rental/services/rental.service';
import {Rental} from '../../../rental/models/rental';

@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.css']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getUserRentals()
      .subscribe((rentals:Rental[])=>{
        this.rentals = rentals;

      })
  }

}
