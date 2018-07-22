import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    NgPipesModule
  ],
  declarations: []
})
export class SharedModule { }
