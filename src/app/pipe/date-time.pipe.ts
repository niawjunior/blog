import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any): any {
    return format(value, 'DD-MMMM-YYYY HH:mm');
  }
}
