import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private geoCoder;
  constructor() { }

  geocodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) { this.geoCoder = new (<any>window).google.maps.Geocoder(); }

    return new Observable((observer) => {
      this.geoCoder.geocode({address: location}, (result, status) => {
        if (status === 'OK') {

          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

}
