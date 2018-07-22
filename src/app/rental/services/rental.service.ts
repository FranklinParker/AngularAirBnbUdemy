import {Injectable} from '@angular/core';
import {Rental} from '../models/rental';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  getUrl = environment.apiUrl + 'rentals'
  constructor(private http: HttpClient) {
  }

  public getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.getUrl);


  }



  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(this.getUrl +'/' + rentalId);
  }


}
