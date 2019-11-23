import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-combosexo',
  templateUrl: './combosexo.component.html',
  styleUrls: ['./combosexo.component.css']
})
export class CombosexoComponent implements OnInit {
  @Input() selected:string = 'M';
  @Output() change: EventEmitter<number>;
  sexo: any = [
    {value: 'M', nombre: 'Masculino'},
    {value: 'F', nombre: 'Femenino'}
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
