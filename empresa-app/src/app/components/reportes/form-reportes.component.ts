import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AccidenteModel} from "../../models/accidente.model";

@Component({
  selector: 'app-form-reportes',
  templateUrl: './form-reportes.component.html',
  styleUrls: ['./form-reportes.component.css']
})
export class FormReportesComponent implements OnInit {
  fechaInicio:Date = new Date();
  fechaFin:Date = new Date();
  fechaActual:Date = new Date();
  constructor() { }

  ngOnInit() {
  }

  filterFecha(){

  }

}
