import { Component, OnInit } from '@angular/core';
import {Rental} from '../../models/rental';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental = new Rental();
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  handleImageUpload(event:any){

  }
  handleImageError(){

  }

  createRental(){
    console.log(this.newRental);
  }

}
