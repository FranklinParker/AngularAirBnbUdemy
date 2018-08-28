import {Component, OnInit} from '@angular/core';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/rental';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {UcWordsPipe} from 'ngx-pipes';

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
              private rentalService: RentalService,
              private toastrServ: ToastrService,
              private ucWordsPipe: UcWordsPipe) {
    this.transformLocation = this.transformLocation.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const rentalId = params['rentalId'];
      this.getRental(rentalId);

    });
  }

  public transformLocation(location: string) : string{

    return this.ucWordsPipe.transform(location);
  }

  updateRental(rentalId, updateData: any) {

    this.rentalService.updateRental(this.rental._id, updateData)
      .subscribe((updatedRental: Rental) => {
        this.rental = updatedRental;
        if (updateData.city || updateData.street) {
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      }, (err: HttpErrorResponse) => {
        this.getRental(rentalId);
        //err.error.errors
        const errorMessage = err.error.errors[0].detail;
        this.toastrServ
          .error(`Error Saving Rental: ${errorMessage}`, 'Error');
      });
  }

  private getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId)
      .subscribe((rental: Rental) => {
        this.rental = rental;
      });
  }

  countBedroomAssets(assetNum: number){
    return parseInt(<any>this.rental.bedrooms || 0,10) + assetNum;
  }
}
