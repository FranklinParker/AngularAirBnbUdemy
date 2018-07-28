import {Injectable} from '@angular/core';
import {Rental} from '../models/rental';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  getUrl = environment.apiUrl + 'rentals';

  constructor(private http: HttpClient) {
  }

  public getRentals(city?: string): Observable<Rental[]> {
    const url = (city && city.length > 0)
      ? this.getUrl + '?city=' + city
      : this.getUrl;

    if(city)
    return this.http.get<Rental[]>(url);


  }


  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(this.getUrl + '/' + rentalId);
  }


}
