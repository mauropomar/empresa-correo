import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CargosService} from '../../services/cargos.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteComponent} from '../genericos/dialog/confirm-delete/confirm-delete.component';
import {CargoModel} from "../../models/cargo.model";
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Router} from '@angular/router'
import {GlobalesService} from "../../services/constantes.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
