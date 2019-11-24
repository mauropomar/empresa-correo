import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {TrabajadoresService} from '../../services/trabajadores.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../genericos/dialog/confirm-delete/confirm-delete.component';
import {TrabajadorModel} from "../../models/trabajador.model";
import {Router} from '@angular/router'
import {GlobalesService} from "../../services/constantes.service";
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from "@angular/material/table";
import {CargoModel} from "../../models/cargo.model";

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  trabajadores:any = [];
  message: string = "Esta seguro que desea eliminar el trabajador seleccionado.";
  showLoading: boolean = false;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private trabajadorService: TrabajadoresService,
              public dialog: MatDialog,
              private globales: GlobalesService,
              private toastr:ToastrService) {
            this.obtenerTodos(true);
  }

  ngOnInit() {
     this.globales.title = this.activeRoute.snapshot.data.title;
  }

  obtenerTodos(activo){
    this.showLoading = true;
    this.trabajadorService.obtenerTodos(activo)
      .subscribe(data => {
        this.trabajadores = data;
        this.globales.datos = this.trabajadores;
        this.showLoading = false;
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }

  openDialogDelete(element) {
    let dialog = this.dialog.open(ConfirmDeleteComponent, {  //muestro la ventana y le paso el mensaje a mostrar
      width: '440px',
      data: {message: this.message}
    })
    dialog.afterClosed().subscribe(result => {
      if (result === true) {   //si voy a eliminar
        let id = element.id;
        this.showLoading = true;
        this.trabajadorService.borrar(id)
          .subscribe((res: any) => {
            if (res.success) {
              this.deleteElement(id);
              this.showLoading = false;
            }
          },(error) => {
            this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
          })
      }
    });
  }

  deleteElement(id) {
    let myArray = this.trabajadores;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === id) {
        myArray.splice(i, 1);
        this.toastr.success('El trabajador fue borrado con éxito.', 'Información');
        break
      }
    }
  }

  nuevo(){
    this.globales.editando = false;
    this.router.navigate(['trabajador/nuevo']);
  }

  editar(element) {
    this.globales.editando = true;
    let id = element.id;
    this.router.navigate(['trabajador', id]);
  }

  filter(texto){

  }

  reload(){
    this.obtenerTodos(true)
  }
}
