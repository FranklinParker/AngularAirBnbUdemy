import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CamelizePipe, NgPipesModule} from 'ngx-pipes';
import { UpperCasePipe } from './pipes/upper-case.pipe';
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import {MapService} from './service/map.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {FormsModule} from '@angular/forms';
import {ImageUploadComponent} from '../common/components/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'hide'
    })

  ],
  exports: [
    HttpClientModule,
    NgPipesModule,
    UpperCasePipe,
    MapComponent,
    Daterangepicker,
    FormsModule,
    ImageUploadComponent
  ],
  declarations: [
    UpperCasePipe,
    MapComponent,
    ImageUploadComponent
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class SharedModule { }
