import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-comboperiodos',
  templateUrl: './comboperiodos.component.html',
  styleUrls: ['./comboperiodos.component.css']
})
export class ComboperiodosComponent implements OnInit {
  @Input() selected:string = 'hoy';
  @Output() change: EventEmitter<number>;
  periodos: any = [
    {value: 'hoy', nombre: 'Hoy'},
    {value: 'ayer', nombre: 'Ayer'},
    {value: 'semana', nombre: 'Semana'},
    {value: 'mes', nombre: 'Mes'},
    {value: 'anno', nombre: 'Año'},
    {value: 'anno_fecha', nombre: 'Año HF'},
    {value: 'hasta_fecha', nombre: 'Hasta Fecha'},
    {value: 'rango_fecha', nombre: 'Rango de Fecha'}
  ];
  constructor() {
    this.change = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  seleccionar(value){
    this.selected = value;
    this.change.emit(value);
  }

}
