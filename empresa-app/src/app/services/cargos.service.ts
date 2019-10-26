import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  obtenerTodos(){
     return this.http.get('http://localhost:5800/empresa-correo/empresa-api/public/api/cargos/obtenerTodas')
       .pipe(map(data =>{
           return data['data']
       }));

  }
}
