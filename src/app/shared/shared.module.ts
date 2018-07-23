import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { UpperCasePipe } from './pipes/upper-case.pipe';
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'MY_KEY'
    })
  ],
  exports: [
    HttpClientModule,
    NgPipesModule,
    UpperCasePipe,
    MapComponent
  ],
  declarations: [
    UpperCasePipe,
    MapComponent
  ]
})
export class SharedModule { }
