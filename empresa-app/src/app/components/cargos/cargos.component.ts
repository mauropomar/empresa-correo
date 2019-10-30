import { Component, OnInit } from '@angular/core';
import { CargosService } from '../../services/cargos.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../genericos/dialog/confirm-delete/confirm-delete.component';
import { CargoModel } from "../../models/cargo.model";
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit{

  message: string = "Esta seguro que desea eliminar el cargo seleccionado.";
  displayedColumns: string[] = ['nombre', 'descripcion','actions'];
  dataSource : MatTableDataSource<CargoModel>;

  constructor( private cargosService:CargosService, public dialog: MatDialog) {
        this.cargosService.obtenerTodos()
          .subscribe(data=>{
              this.dataSource = new MatTableDataSource<CargoModel>(data);
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
              .subscribe((res:any) =>{
                  if(res.success){
                     this.deleteElement(id);
                  }
              })
          }
    });
  }

  deleteElement(id){
      let myArray = this.dataSource.data;
      for(let i = 0; i < myArray.length; i++){
        if(myArray[i].id === id){
          myArray.splice(i, 1);
          this.dataSource = new MatTableDataSource(myArray);
          break
        }
      }
  }

}
