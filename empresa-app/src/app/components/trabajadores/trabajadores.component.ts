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
}
