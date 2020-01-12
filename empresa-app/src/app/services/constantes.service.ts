import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GlobalesService {
  idcargoDefault:number=null;
  actionCrud:boolean = false;
  editando : boolean = true;
  title:string = 'R.H Plus';
  datos:any = new Array();
  constructor() { }

  pushData(data){
      this.datos.push(data);
  }


  formatDate(fecha) {
    let date = fecha;
    let d = new Date(date);
    let month = (d.getMonth()) + 1 + '';
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-') + ' 00:00:00';
  }


  formatDateFin(fecha) {
    let date = fecha;
    let d = new Date(date),
      month = '' + (d.getMonth()) + 1,
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-') + ' 23:59:59';
  }


}
