import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minTransform',
})
export class MinTransformPipe implements PipeTransform {
  transform(value: number): string {
    const hoursStr = Math.floor(value / 60) <= 1 ? 'hour' : 'hours';
    const minutes =
      (value % 60).toString().length === 1 ? `0${value % 60}` : `${value % 60}`;
    const hours =
      Math.floor(value / 60).toString().length === 1
        ? `0${Math.floor(value / 60)}`
        : `${Math.floor(value / 60)}`;

    return `${hours}:${minutes} ${hoursStr}`;
  }
}
