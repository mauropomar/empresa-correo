import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CargosService} from '../../services/cargos.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../genericos/dialog/confirm-delete/confirm-delete.component';
import {CargoModel} from "../../models/cargo.model";
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router'
import {ConstantesService} from "../../services/constantes.service";


@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  message: string = "Esta seguro que desea eliminar el cargo seleccionado.";
  displayedColumns: string[] = ['nombre', 'descripcion', 'actions'];
  cargos: MatTableDataSource<CargoModel>;
  cargando: boolean = true;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private cargosService: CargosService,
              public dialog: MatDialog,
              private constantes: ConstantesService) {
    this.cargosService.obtenerTodos()
      .subscribe(data => {
        this.cargos = new MatTableDataSource<CargoModel>(data);
        this.cargando = false;
      })
  }

  ngOnInit() {
    this.constantes.title = this.activeRoute.snapshot.data.title;
  }

  openDialogDelete(element) {
    let dialog = this.dialog.open(ConfirmDeleteComponent, {  //muestro la ventana y le paso el mensaje a mostrar
      width: '440px',
      data: {message: this.message}
    })
    dialog.afterClosed().subscribe(result => {
      if (result === true) {   //si voy a eliminar
        let id = element.id;
        this.cargosService.borrar(id)
          .subscribe((res: any) => {
            if (res.success) {
              this.deleteElement(id);
            }
          })
      }
    });
  }

  deleteElement(id) {
    let myArray = this.cargos.data;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === id) {
        myArray.splice(i, 1);
        this.cargos = new MatTableDataSource(myArray);
        break
      }
    }
  }

  editarForm(element) {
    this.constantes.editando = true;
    let id = element.id;
    this.router.navigate(['cargo', id]);
  }

}
