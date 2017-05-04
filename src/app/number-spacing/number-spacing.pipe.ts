import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpacing'
})

export class NumberSpacingPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString();
  }
}
