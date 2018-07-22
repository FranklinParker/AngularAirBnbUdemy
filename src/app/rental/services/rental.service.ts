import {Injectable} from '@angular/core';
import {Rental} from '../models/rental';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private rentals: Rental[] = [{
    id: '1',
    title: 'Central Apartment',
    city: 'New York',
    street: 'Times Sqaure',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    createdAt: '24/12/2017'
  },
    {
      id: '2',
      title: 'Central Apartment 2',
      city: 'San Francisco',
      street: 'Main street',
      category: 'condo',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 2,
      description: 'Very nice apartment',
      dailyRate: 12,
      shared: true,
      createdAt: '24/12/2017'
    },
    {
      id: '3',
      title: 'Central Apartment 3',
      city: 'Bratislava',
      street: 'Hlavna',
      category: 'condo',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 2,
      description: 'Very nice apartment',
      dailyRate: 334,
      shared: true,
      createdAt: '24/12/2017'
    },
    {
      id: '4',
      title: 'Central Apartment 4',
      city: 'Berlin',
      street: 'Haupt strasse',
      category: 'house',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 9,
      description: 'Very nice apartment',
      dailyRate: 33,
      shared: true,
      createdAt: '24/12/2017'
    }];

  constructor() {
  }

  public getRentals(): Observable<Rental[]> {
    const rentalObservabe: Observable<Rental[]> = new Observable(
      (observer) => {
        setTimeout(() => {
          observer.next(this.rentals);
        }, 200);
        setTimeout(() => {
          observer.error('test error');
        }, 2000);
        setTimeout(() => {
          observer.complete();
        }, 3000);
      });
    return rentalObservabe;
  }


  getRentalById(rentalId: string): Observable<Rental> {
    const rentalObservabe: Observable<Rental> = new Observable(
      (observer) => {
        setTimeout(() => {
          const rental = this.rentals.find((rental: Rental) => rental.id === rentalId);
          observer.next(rental);
        }, 200);
        setTimeout(() => {
          observer.error('test error');
        }, 2000);
        setTimeout(() => {
          observer.complete();
        }, 3000);
      });
    return rentalObservabe;
  }


}
