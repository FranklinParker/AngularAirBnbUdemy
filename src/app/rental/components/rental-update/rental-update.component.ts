import { Component, OnInit } from '@angular/core';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';
import {ActivatedRoute} from '@angular/router';
import { Subject } from 'rxjs'

@Component({
  selector: 'bwm-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  rental: Rental;
  locationSubject: Subject<any> = new Subject();
  public rentalCategories = Rental.CATEGORIES;

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const rentalId = params['rentalId'];
      this.getRental(rentalId);

    });
  }


  private getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId)
      .subscribe((rental: Rental) => {
        this.rental = rental;
      });
  }


   updateRental(rentalId, updateData: any){
    console.log('rentalID', rentalId);
    console.log('updateData', updateData);
    this.rentalService.updateRental(this.rental._id,updateData)
      .subscribe((updatedRental: Rental)=>{
        this.rental = updatedRental;
        if(updateData.city || updateData.street){
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      },(err)=>{
        console.log('err update', err);
      })
  }

}
