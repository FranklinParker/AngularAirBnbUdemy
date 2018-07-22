import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  rental: Rental;
  constructor(private route: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const rentalId = params['rentalId'];
      this.rental = this.rentalService.getRentalById(rentalId);

    });
  }

}
