import {Component, Input, OnInit} from '@angular/core';
import {MapService} from '../service/map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  @Input() location;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
  }

  onMapReady() {
    this.mapService.geocodeLocation(this.location)
      .subscribe((result) => {
          console.log('geocode', result);
        },
        (err) => {
          alert(err);
        });

  }

}
