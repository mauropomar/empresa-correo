import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { CargoModel } from "../models/cargo.model";

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  getQuery(query:string){
    let url = `http://localhost:5800/empresa-correo/empresa-api/public/api/cargos/${query}`
    return url;
  }

  obtenerTodos(){
     let activo = true;
     let url = this.getQuery('obtenerTodas');
     return this.http.get(url)
       .pipe(map(data => data['data']));
  }

  obtener(id){
    let url = this.getQuery('obtener/'+id);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }

  borrar(id){
    let url = this.getQuery('eliminar/' + id);
    return this.http.delete(url)
      .pipe(map(response => response));
  }
}
