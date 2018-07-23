import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { UpperCasePipe } from './pipes/upper-case.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    NgPipesModule,
    UpperCasePipe
  ],
  declarations: [UpperCasePipe]
})
export class SharedModule { }
