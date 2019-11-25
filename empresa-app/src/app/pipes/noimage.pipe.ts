import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value:string): string {
    if(value == null || value.indexOf('empty') > -1){
      return 'assets/images/empty_usuario.png'
    }
    return value;
  }

}
