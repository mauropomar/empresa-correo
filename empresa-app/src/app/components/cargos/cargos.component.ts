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
  showLoading: boolean = true;
  textoLoading: string = 'Cargando...'


  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private cargosService: CargosService,
              public dialog: MatDialog,
              private constantes: ConstantesService) {
       this.obtenerTodos(true);
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
        this.textoLoading = 'Eliminando...';
        this.showLoading = true;
        this.cargosService.borrar(id)
          .subscribe((res: any) => {
            if (res.success) {
              this.deleteElement(id);
              this.showLoading = false;
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

  nuevo() {
    this.constantes.editando = false;
    this.router.navigate(['cargo/nuevo']);
  }

  editar(element) {
    this.constantes.editando = true;
    let id = element.id;
    this.router.navigate(['cargo', id]);
  }

  obtenerTodos(activo){
    this.cargosService.obtenerTodos()
      .subscribe(data => {
        this.cargos = new MatTableDataSource<CargoModel>(data);
        this.showLoading = false;
      }, (error) => {
        console.log(error)
      })
  }
}



