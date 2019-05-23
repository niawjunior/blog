import { Pipe, PipeTransform } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import th from 'javascript-time-ago/locale/th';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any){
    TimeAgo.addLocale(th);
    const timeAgo = new TimeAgo('th-TH');
    return timeAgo.format(value);
  }
}
