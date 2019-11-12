import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ActividadModel } from "../models/actividad.model";

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  getQuery(query:string){
    let url = `http://localhost:5800/empresa-correo/empresa-api/public/api/actividades/${query}`
    return url;
  }

  obtenerTodos(idcargo, activo){
    activo = (activo)?1:0;
    let params = {
      "idcargo":idcargo,
      "activo":activo
    };
    let url = this.getQuery('obtenerTodas');
    return this.http.get(url, {params:params})
      .pipe(map(data => data['data']));
  }

  obtener(id){
    let url = this.getQuery('obtener/'+id);
    return this.http.get(url)
      .pipe(map(data => data['data']));
  }

  crear(actividad:ActividadModel){
    let url = this.getQuery('crear');
    return this.http.post(url, actividad)
      .pipe(map(response=> {
        return response
      }));
  }

  modificar(actividad:ActividadModel){
    let id = actividad.id;
    let url = this.getQuery('editar/'+id);
    return this.http.put(url, actividad)
      .pipe(map(response=> {
        return response
      }));
  }

  borrar(id){
    let url = this.getQuery('eliminar/' + id);
    return this.http.delete(url)
      .pipe(map(response => response));
  }
}
