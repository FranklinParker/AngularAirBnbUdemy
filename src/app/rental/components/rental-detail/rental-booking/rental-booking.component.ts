import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Rental} from '../../../models/rental';
import {DaterangePickerComponent} from 'ng2-daterangepicker';
import {Booking} from '../../../../bookings/booking.model';
import {HelperService} from '../../../../common/service/helper.service';
import * as moment from 'moment';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {BookingService} from '../../../services/booking.service';

@Component({
  selector: 'bwm-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})

export class RentalBookingComponent implements OnInit {
  @Input() rental: Rental;
  modalRef: NgbModalRef;
  errors: any[] = [];
  bookedOutDates: any[] = [];
  public daterange: any = {};
  public options: any = {
    locale: {format: Booking.DATE_FORMAT},
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDate.bind(this)
  };
  newBooking: Booking = new Booking();
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  constructor(private helperService: HelperService,
              private bookingService: BookingService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getBookedOutDates();
  }

  openRentalConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  public selectedDate(value: any, datepicker?: any) {
    this.newBooking.endAt =
      this.helperService.formatBookingDate(value.end);
    this.newBooking.startAt =
      this.helperService.formatBookingDate(value.start);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.rental.dailyRate * this.newBooking.days;

  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking)
      .subscribe((bookingData) => {
          this.addNewBookingDates(bookingData);
          this.newBooking = new Booking();
          this.modalRef.close();
        },
        err => {
          this.errors = err.error.errors;
        });
  }

  confirm(msg) {

  }

  private checkForInvalidDate(date) {
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date))
      || date.diff(moment(), 'days') < 0;

  }

  private getBookedOutDates() {
    const bookings = this.rental.bookings;
    if (bookings) {
      bookings.forEach((booking: Booking) => {
        const tmpDates =
          this.helperService.getBookingRangeOfDates(booking.startAt,
            booking.endAt);
        this.bookedOutDates.push(...tmpDates);
      });
    }
    console.log('booked out dates', this.bookedOutDates);

  }

  private addNewBookingDates(bookingData: any) {
    const tmpDates =
      this.helperService.getBookingRangeOfDates(bookingData.startAt,
        bookingData.endAt);
    this.bookedOutDates.push(...tmpDates);

  }
}
