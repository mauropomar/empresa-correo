import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposAccidentesService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  getQuery(query:string){
    let url = `http://localhost:5800/empresa-correo/empresa-api/public/api/tipos_accidentes/${query}`
    return url;
  }

  obtenerTodos(){
    let url = this.getQuery('obtenerTodas');
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }
}
