import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {CargosService} from "../../../../services/cargos.service";
import { ToastrService } from 'ngx-toastr';
import {GlobalesService} from "../../../../services/constantes.service";


@Component({
  selector: 'app-combocargos',
  templateUrl: './combocargos.component.html',
  styleUrls: ['./combocargos.component.css']
})
export class CombocargosComponent implements OnInit {
  cargos: [];
  @Input() selected:number;
  @Output() change: EventEmitter<number>;
  @Output() mostrarActividades: EventEmitter<number>;
  @Input() loadAct: boolean;
  @Input() loadfirtsElement;
  @Input() defaultValue: number;
  constructor(private cargosService:CargosService, private toastr:ToastrService, private globales: GlobalesService) {
    this.obtenerTodos(true);
    this.mostrarActividades = new EventEmitter<number>();
    this.change = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let select = changes['selected'].currentValue;
    if(select)
       this.change.emit(select);
  }

  obtenerTodos(activo){
    this.cargosService.obtenerTodos(activo)
      .subscribe(data => {
        this.cargos = data;
        if(this.globales.idcargoDefault !== null){
          this.selected = this.globales.idcargoDefault;
        }else {
          if (this.loadfirtsElement) {
            this.selected = data[0].id;
            this.globales.idcargoDefault = data[0].id;
          }
        }

        if(this.loadAct){
          this.mostrarActividades.emit(this.selected);
        }
        this.change.emit(this.selected);
      }, (error) => {
        this.toastr.error('Ha ocurrido un error al obtener cargos.', 'Error');
      })
  }

  seleccionar(value){
    this.selected = value;
    this.change.emit(value);
    this.globales.idcargoDefault = value;
    if(this.loadAct)
      this.mostrarActividades.emit(value);
  }
}
