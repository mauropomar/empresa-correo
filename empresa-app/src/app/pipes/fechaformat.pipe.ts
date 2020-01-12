import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'fechaformat'
})
export class FechaformatPipe implements PipeTransform {

  transform(value:string, isDate:boolean): string {
    var datePipe = new DatePipe("en-us");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }


}
