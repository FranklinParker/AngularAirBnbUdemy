import {Injectable} from '@angular/core';
import {Rental} from '../models/rental';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  rentalUrl = environment.apiUrl + 'rentals';

  constructor(private http: HttpClient) {
  }

  public getRentals(city?: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl);


  }


  public getRentalsByCity(city: string){
    const url = this.rentalUrl + '?city=' + city;
    return this.http.get<Rental[]>(url);
  }

  public getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(this.rentalUrl + '/' + rentalId);
  }

  public getUserRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl + '/manage');
  }

  public createRental(rental: Rental) : Observable<any>{
    return this.http.post(this.rentalUrl, rental);
  }

  public deleteRental(rental: Rental): Observable<any>{
    return this.http.delete(this.rentalUrl+ '/' + rental._id);
  }

}
