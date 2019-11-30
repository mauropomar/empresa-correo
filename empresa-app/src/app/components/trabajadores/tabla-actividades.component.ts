import {Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ActividadModel} from "../../models/actividad.model";
import {ActividadesService} from '../../services/actividades.service';
import {CargoModel} from "../../models/cargo.model";
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

  constructor(private actividadService: ActividadesService,
              private globales: GlobalesService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes['actividadesCargo'].currentValue;
    this.actividades = new MatTableDataSource<ElementModel>(data);
  }

  changeSelect(){
     this.seleccionados.emit(this.actividades);
  }
}



