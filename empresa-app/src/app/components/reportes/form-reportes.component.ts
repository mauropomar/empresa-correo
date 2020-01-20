import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AccidenteModel} from "../../models/accidente.model";
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-reportes',
  templateUrl: './form-reportes.component.html',
  styleUrls: ['./form-reportes.component.css']
})
export class FormReportesComponent implements OnInit {
  fechaInicio:Date = new Date();
  fechaFin:Date = new Date();
  fechaActual:Date = new Date();
  reporteForm: FormGroup;
  isrango:boolean = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.reporteForm = this.formBuilder.group({})
  }

  filterFecha(){

  }

  selectPeriodo(value){
     let rango = (value == "hasta_fecha")?true:false;
     this.isrango = rango;
  }

}
