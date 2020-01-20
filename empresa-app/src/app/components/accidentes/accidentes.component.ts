import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AccidentesService} from '../../services/accidentes.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../genericos/dialog/confirm-delete/confirm-delete.component';
import {AccidenteModel} from "../../models/accidente.model";
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Router} from '@angular/router'
import {GlobalesService} from "../../services/constantes.service";
import { ToastrService } from 'ngx-toastr';
import { FechaformatPipe } from '../../pipes/fechaformat.pipe';

@Component({
  selector: 'app-accidentes',
  templateUrl: './accidentes.component.html',
  styleUrls: ['./accidentes.component.css']
})
export class AccidentesComponent implements OnInit {
  message: string = "Esta seguro que desea eliminar el accidente seleccionado.";
  displayedColumns: string[] = ['imagen', 'codigo', 'trabajador', 'fecha', 'edad' , 'sexo',  'cargo','tipo', 'causa', 'actions'];
  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
  accidentes: MatTableDataSource<AccidenteModel>;
  fechaInicio:Date = new Date();
  fechaFin:Date = new Date();
  fechaActual:Date = new Date();
  showLoading: boolean = false;
  totalPages:number = 0;
  totalRecords:number = 0;
  numberRecords:number = 0;
  numberTo:number = 0;
  numberFrom:number = 0;
  currentPage:number = 0;
  isNextPage:boolean = false;
  isLastPage:boolean = false;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private accidenteService: AccidentesService,
              public dialog: MatDialog,
              private globales: GlobalesService,
              private toastr:ToastrService) {
    this.fechaInicio = this.globales.fechaInicioAccidente;
    this.fechaFin = this.globales.fechaFinAccidente;
    this.obtenerTodos(true, 1);
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
        this.accidenteService.borrar(id)
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
    let myArray = this.accidentes.data;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === id) {
        myArray.splice(i, 1);
        this.accidentes = new MatTableDataSource(myArray);
        this.toastr.success('El accidente fue borrado con éxito.', 'Información');
        break
      }
    }
  }

  nuevo() {
    this.globales.editando = false;
    this.router.navigate(['accidente/nuevo']);
  }

  editar(element) {
    this.globales.editando = true;
    let id = element.id;
    this.router.navigate(['accidente', id]);
  }

  obtenerTodos(activo, page){
    this.showLoading = true;
    let datos = {
      page:page,
      fechaInicio:this.globales.formatDate(this.fechaInicio),
      fechaFin:this.globales.formatDateFin(this.fechaFin),
      activo:activo
    }
    this.accidenteService.obtenerTodos(datos)
      .subscribe(data => {
        let datos = data['data'];
        this.accidentes = new MatTableDataSource<AccidenteModel>(datos);
        this.globales.datos = this.accidentes;
        this.accidentes.sort = this.sort;
        this.accidentes.paginator = this.paginator;
        this.showLoading = false;
        this.currentPage = data['current_page'];
        this.totalRecords = data['total'];
        this.totalPages = data['last_page'];
        this.numberTo = data['to'];
        this.numberFrom = data['from'];
        this.isNextPage = (data['next_page_url'] != null);
        this.isLastPage = (this.currentPage !== 1);
        this.globales.datos = this.accidentes;
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
    let accidentes = this.accidentes.data;
    for(let i = 0; i < accidentes.length; i++){
      let nombre = accidentes[i]['nombre'].trim().toLowerCase();
      if(nombre.indexOf(searchKey) > -1){
        data.push(accidentes[i]);
      }
    }
    this.accidentes = new MatTableDataSource<AccidenteModel>(data);
  }

  filterFecha(){
    this.globales.fechaInicioAccidente = this.fechaInicio;
    this.globales.fechaFinAccidente = this.fechaFin;
    this.obtenerTodos(true, this.currentPage)
  }

  reload(){
    this.obtenerTodos(true, this.currentPage)
  }

  nextPage(page){
    this.currentPage = page;
    this.obtenerTodos(true, this.currentPage);
  }
}
