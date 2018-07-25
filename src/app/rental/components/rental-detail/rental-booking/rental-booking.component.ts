import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Rental} from '../../../models/rental';
import {Daterangepicker, DaterangePickerComponent} from 'ng2-daterangepicker';

@Component({
  selector: 'bwm-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})

export class RentalBookingComponent implements OnInit {
  @Input() price: any;
  public daterange: any = {};
  public options: any = {
    locale: {format: 'YYYY-MM-DD'},
    alwaysShowCalendars: false,
    opens: 'left'
  };
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  constructor() {
  }

  ngOnInit() {
  }

  public selectedDate(value: any, datepicker?: any) {

    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
