import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../genericos/dialog/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit{

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

  openDialogDelete(element){
    let dialog = this.dialog.open(ConfirmDeleteComponent, {  //muestro la ventana y le paso el mensaje a mostrar
      width: '440px',
      data: {message: this.message}
    })
    dialog.afterClosed().subscribe(result => {
          if(result === true){   //si voy a eliminar
            let id = element.id;
            this.cargosService.borrar(id)
              .subscribe(res=>{
              })
          }
    });
  }

}
