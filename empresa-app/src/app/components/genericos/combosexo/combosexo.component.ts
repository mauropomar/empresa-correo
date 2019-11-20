import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combosexo',
  templateUrl: './combosexo.component.html',
  styleUrls: ['./combosexo.component.css']
})
export class CombosexoComponent implements OnInit {
  sexo: any = [
    {value: 'M', nombre: 'Masculino'},
    {value: 'F', nombre: 'Femenino'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
