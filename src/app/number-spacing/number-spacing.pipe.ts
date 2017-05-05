import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpacing'
})

export class NumberSpacingPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
      return null;
    }
  }
}
