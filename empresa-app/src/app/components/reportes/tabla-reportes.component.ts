import {Component, OnInit} from '@angular/core';

export interface tablaReporte {
  id: number;
  numero: number;
  nombre: string;
}

const ELEMENT_DATA: tablaReporte[] = [
  {id: 1, numero: 1, nombre: "Reporte 1"},
  {id: 2, numero: 2, nombre: "Reporte 2"},
  {id: 3, numero: 3, nombre: "Reporte 3"},
  {id: 4, numero: 4, nombre: "Reporte 4"}
];

@Component({
  selector: 'app-tabla-reportes',
  templateUrl: './tabla-reportes.component.html',
  styleUrls: ['./tabla-reportes.component.css']
})
export class TablaReportesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  displayedColumns: string[] = ['numero','nombre'];
  reportes = ELEMENT_DATA;

}
