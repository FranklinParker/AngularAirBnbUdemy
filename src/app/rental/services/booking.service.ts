import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rental} from '../models/rental';
import {Booking} from '../../bookings/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = environment.apiUrl + 'bookings';

  constructor(private http: HttpClient) {
  }

  public createBooking(booking: Booking): Observable<Rental[]> {
    return this.http.post<any>(this.url, booking);
  }

  public getUserBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url + '/manage');
  }
}
