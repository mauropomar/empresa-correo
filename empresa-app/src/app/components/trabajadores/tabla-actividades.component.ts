import {Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActividadesService} from '../../services/actividades.service';
import {GlobalesService} from "../../services/constantes.service";
export interface ElementModel {
  select: boolean;
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-tabla-actividades',
  templateUrl: './tabla-actividades.component.html',
  styleUrls: ['./tabla-actividades.component.css']
})
export class TablaActividadesComponent implements OnInit, OnChanges {

  displayedColumns = ['select' ,'nombre', 'descripcion'];
  @Input() actividadesCargo;
  @Output() seleccionados = new EventEmitter();
  actividades = new MatTableDataSource<ElementModel>();
  showLoading: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes['actividadesCargo'].currentValue;
    this.actividades = new MatTableDataSource<ElementModel>(data);
    this.seleccionados.emit(this.actividades.data);
  }

  changeSelect(){
     this.seleccionados.emit(this.actividades.data);
  }
}



