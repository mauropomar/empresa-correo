import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, mergeMap, throttleTime, scan, tap} from 'rxjs/operators';
import { AccidenteModel } from "../models/accidente.model";

@Injectable({
  providedIn: 'root'
})

export class AccidentesService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  getQuery(query:string){
    let url = `http://localhost:5800/empresa-correo/empresa-api/public/api/accidentes/${query}`
    return url;
  }

  obtenerTodos(datos){
    let url = this.getQuery('obtenerTodas');
    return this.http.get(url,{
      params:datos
    })
      .pipe(map(data => data));
  }

  obtener(id){
    let url = this.getQuery('obtener/'+id);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }

  crear(accidente:AccidenteModel){
    let url = this.getQuery('crear');
    return this.http.post(url, accidente)
      .pipe(map(response=> {
        return response
      }));
  }

  modificar(accidente:AccidenteModel){
    let id = accidente.id;
    let url = this.getQuery('editar/'+id);
    return this.http.put(url, accidente)
      .pipe(map(response=> {
        return response
      }));
  }

  borrar(id){
    let url = this.getQuery('eliminar/' + id);
    return this.http.delete(url)
      .pipe(map(response => response));
  }

  filtrar(texto){
    let url = this.getQuery('buscar/'+texto);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }
}
