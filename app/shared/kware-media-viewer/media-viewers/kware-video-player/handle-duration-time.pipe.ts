import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dsHandleDurationTime',
  standalone:true
})
export class HandleDurationTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60 / 60);
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value - (minutes * 60));

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

}
