import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ActividadesService} from '../../services/actividades.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../genericos/dialog/confirm-delete/confirm-delete.component';
import {ActividadModel} from "../../models/actividad.model";
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Router} from '@angular/router'
import {GlobalesService} from "../../services/constantes.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  message: string = "Esta seguro que desea eliminar la actividad seleccionada.";
  displayedColumns: string[] = ['nombre', 'descripcion', 'actions'];
  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
  actividades: MatTableDataSource<ActividadModel>;
  showLoading: boolean = true;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private actividadesService: ActividadesService,
              public dialog: MatDialog,
              private globales: GlobalesService,
              private toastr:ToastrService) {
   // this.obtenerTodos(true);
  }

  ngOnInit() {
    this.globales.title = this.activeRoute.snapshot.data.title;
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
        this.actividadesService.borrar(id)
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
    let myArray = this.actividades.data;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === id) {
        myArray.splice(i, 1);
        this.actividades = new MatTableDataSource(myArray);
        this.toastr.success('El cargo fue borrado con éxito.', 'Información');
        break
      }
    }
  }

  nuevo() {
    this.globales.editando = false;
    this.router.navigate(['actividad/nuevo']);
  }

  editar(element) {
    this.globales.editando = true;
    let id = element.id;
    this.router.navigate(['actividad', id]);
  }

  obtenerTodos(activo){
    this.showLoading = true;
    this.actividadesService.obtenerTodos(this.globales.idcargoDefault, activo)
      .subscribe(data => {
        this.actividades = new MatTableDataSource<ActividadModel>(data);
        this.globales.datos = this.actividades;
        this.actividades.sort = this.sort;
        this.actividades.paginator = this.paginator;
        this.showLoading = false;
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }

  filter(texto){
    let searchKey = texto.trim().toLowerCase();
    if(searchKey === '')
      this.reload()
    let data = [];
    let actividades = this.actividades.data;
    for(let i = 0; i < actividades.length; i++){
      let nombre = actividades[i]['nombre'].trim().toLowerCase();
      if(nombre.indexOf(searchKey) > -1){
        data.push(actividades[i]);
      }
    }
    this.actividades = new MatTableDataSource<ActividadModel>(data);
  }

  reload(){
    this.obtenerTodos(true)
  }


}
