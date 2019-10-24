import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http:HttpClient) {
    console.log('servicio listo para usar');
  }

  obtenerTodos(){
     this.http.get('https://localhost:5800/empresa-correo/empresa-api/public/api/cargos/obtenerTodas')
       .subscribe(data => {
            console.log(data)
       })
  }
}
