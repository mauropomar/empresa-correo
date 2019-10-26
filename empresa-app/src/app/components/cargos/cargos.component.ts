import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../genericos/dialog/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent {

  message: string = "Esta seguro que desea eliminar el cargo seleccionado.";
  displayedColumns: string[] = ['nombre', 'descripcion','actions'];
  dataSource: any = [];

  constructor( private cargosService:CargosService, public dialog: MatDialog) {
        this.cargosService.obtenerTodos()
          .subscribe(data=>{
              this.dataSource = data;
          })
  }


  ngOnInit() {
  }

  openDialogDelete(){
    this.dialog.open(ConfirmDeleteComponent, {
      width: '440px',
      data: {message: this.message}
    });
  }

}
