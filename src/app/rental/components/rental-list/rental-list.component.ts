import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentalList = [
    {
      test:'1',
    },
    {
      test:'1',
    },
    {
      test:'1',
    },
    {
      test:'1',
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
