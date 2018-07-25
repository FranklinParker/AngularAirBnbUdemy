import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {Rental} from '../../../models/rental';
import { Daterangepicker,DaterangePickerComponent} from 'ng2-daterangepicker';

@Component({
  selector: 'bwm-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})

export class RentalBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  constructor() {
  }

  ngOnInit() {
  }

  public daterange: any = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: {format: 'YYYY-MM-DD'},
    alwaysShowCalendars: false,
    opens: 'left'
  };

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
