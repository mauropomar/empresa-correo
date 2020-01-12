import { Component, OnInit,EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ElementModel} from "../trabajadores/tabla-actividades.component";

@Component({
  selector: 'app-cargo-actividades',
  templateUrl: './cargo-actividades.component.html',
  styleUrls: ['./cargo-actividades.component.css']
})
export class CargoActividadesComponent implements OnInit {

  displayedColumns = ['nombre', 'descripcion'];
  @Input() actividadesCargos;
  actividades = new MatTableDataSource<ElementModel>();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes['actividadesCargos'].currentValue;
    this.actividades = new MatTableDataSource<ElementModel>(data);
  }

  ngOnInit() {
  }

}
