import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../../rental/services/booking.service';
import {Booking} from '../../../bookings/booking.model';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getUserBookings()
      .subscribe((bookings:Booking[])=>{
        this.bookings = bookings;

      })
  }

}
