import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  constructor( private cargosService:CargosService) {
        this.cargosService.obtenerTodos()
  }


  ngOnInit() {
  }

}
