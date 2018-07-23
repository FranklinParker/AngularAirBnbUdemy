import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UpperCasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const transFormed = value.toUpperCase();
    return transFormed;
  }

}
