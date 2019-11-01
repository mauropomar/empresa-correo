import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {
  editando : boolean = true;
  title:string = 'R.H Plus'
  constructor() { }
}
