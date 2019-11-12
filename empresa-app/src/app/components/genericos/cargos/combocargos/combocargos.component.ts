import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CargosService} from "../../../../services/cargos.service";
import {MatTableDataSource} from "@angular/material/table";
import {CargoModel} from "../../../../models/cargo.model";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-combocargos',
  templateUrl: './combocargos.component.html',
  styleUrls: ['./combocargos.component.css']
})
export class CombocargosComponent implements OnInit {
  cargos: [];
  selected = 0;
  @Output() mostrarActividades: EventEmitter<number>;
  @Input() loadAct: boolean;
  @Input() loadFirts: boolean;
  constructor(private cargosService:CargosService, private toastr:ToastrService ) {
    this.obtenerTodos(true);
    this.mostrarActividades = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  obtenerTodos(activo){
    this.cargosService.obtenerTodos(activo)
      .subscribe(data => {
        this.cargos = data;
        if(this.loadFirts){
          this.selected = data[0].id;
          this.mostrarActividades.emit(this.selected);
        }
      }, (error) => {
        this.toastr.error('Ha ocurrido un error al obtener cargos.', 'Error');
      })
  }

  seleccionar(value){
    if(this.loadAct)
      this.mostrarActividades.emit(value);
  }
}
