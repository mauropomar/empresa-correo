import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent {
  displayedColumns: string[] = ['nombre', 'descripcion','actions'];
  dataSource: any = [];
  constructor( private cargosService:CargosService) {
        this.cargosService.obtenerTodos()
          .subscribe(data=>{
              this.dataSource = data['data'];
          })
  }


  ngOnInit() {
  }

}
