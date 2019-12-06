import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, mergeMap, throttleTime, scan, tap} from 'rxjs/operators';
import { TrabajadorModel } from "../models/trabajador.model";

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  getQuery(query:string){
    let url = `http://localhost:5800/empresa-correo/empresa-api/public/api/trabajadores/${query}`
    return url;
  }

  obtenerTodos(activo){
    activo = (activo)?1:0;
    let url = this.getQuery('obtenerTodas/'+activo);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }

  obtener(id){
    let url = this.getQuery('obtener/'+id);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }

  crear(trabajador:TrabajadorModel){
    let url = this.getQuery('crear');
    return this.http.post(url, trabajador)
      .pipe(map(response=> {
        return response
      }));
  }

  modificar(trabajador:TrabajadorModel){
    let id = trabajador.id;
    let url = this.getQuery('editar/'+id);
    return this.http.put(url, trabajador)
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
