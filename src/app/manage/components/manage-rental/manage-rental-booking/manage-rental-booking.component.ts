import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Rental} from '../../../../rental/models/rental';

@Component({
  selector: 'bwm-manage-rental-booking',
  templateUrl: './manage-rental-booking.component.html',
  styleUrls: ['./manage-rental-booking.component.scss']
})
export class ManageRentalBookingComponent implements OnInit {
  @Input() rental: Rental;
  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }

}
