import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  obtenerTodos(){
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
     this.http.get('http://localhost:5800/empresa-correo/empresa-api/public/api/cargos/obtenerTodas', {headers:headers})
       .subscribe(data => {
            console.log(data)
       })
  }
}
