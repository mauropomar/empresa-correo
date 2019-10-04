import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GlobalesService {
  editando : boolean = true;
  title:string = 'R.H Plus';
  datos:any = new Array();
  constructor() { }

  pushData(data){
      this.datos.push(data);
  }


}
