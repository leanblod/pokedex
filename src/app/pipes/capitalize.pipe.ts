import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): unknown {
    return value.length > 1 ?
      value.charAt(0).toUpperCase()+value.substring(1).toLowerCase() :
      value.toUpperCase();
  }

}
