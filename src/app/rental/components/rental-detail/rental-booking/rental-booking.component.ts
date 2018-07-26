import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Rental} from '../../../models/rental';
import {Daterangepicker, DaterangePickerComponent} from 'ng2-daterangepicker';
import {Booking} from '../../../../bookings/booking.model';
import {HelperService} from '../../../../common/service/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})

export class RentalBookingComponent implements OnInit {
  @Input() rental: Rental;

  bookedOutDates: any[] = [];
  public daterange: any = {};
  public options: any = {
    locale: {format: Booking.DATE_FORMAT},
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate:this.checkForInvalidDate.bind(this)
  };
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;
  newBooking: Booking = new Booking();


  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
    this.getBookedOutDates();
  }

  private checkForInvalidDate(date){
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date))
       || date.diff(moment(), 'days')<0;

  }
  private getBookedOutDates(){
    const bookings = this.rental.bookings;
    if(bookings){
      bookings.forEach((booking: Booking)=>{
        const  tmpDates =
          this.helperService.getBookingRangeOfDates(booking.startAt,
            booking.endAt);
        this.bookedOutDates.push(...tmpDates);
      });
    }
    console.log('booked out dates', this.bookedOutDates);


  }

  public selectedDate(value: any, datepicker?: any) {


    this.newBooking.endAt =
      this.helperService.formatBookingDate(value.end);
    this.newBooking.startAt =
      this.helperService.formatBookingDate(value.start);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    console.log(this.newBooking);
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
