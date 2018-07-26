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
  @Input() price: number;
  @Input() bookings: Booking[];
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

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
    this.getBookedOutDates();
  }

  private checkForInvalidDate(date){
    return this.bookedOutDates.includes(date.format(Booking.DATE_FORMAT))
       || date.diff(moment(), 'days')<0;

  }
  private getBookedOutDates(){
    if(this.bookings){
      this.bookings.forEach((booking: Booking)=>{
        const  tmpDates =
          this.helperService.getBookingRangeOfDates(booking.startAt,
            booking.endAt);
        this.bookedOutDates.push(...tmpDates);
      });
    }
    console.log('booked out dates', this.bookedOutDates);


  }

  public selectedDate(value: any, datepicker?: any) {

    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
