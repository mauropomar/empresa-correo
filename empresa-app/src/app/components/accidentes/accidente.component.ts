import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AccidentesService} from "../../services/accidentes.service";
import {ActividadesService} from "../../services/actividades.service";
import {TrabajadoresService} from "../../services/trabajadores.service";
import {AccidenteModel} from "../../models/accidente.model";
import {GlobalesService} from "../../services/constantes.service";
import {Router} from '@angular/router'
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-accidente',
  templateUrl: './accidente.component.html',
  styleUrls: ['./accidente.component.css']
})
export class AccidenteComponent implements OnInit {
  accidente: AccidenteModel = new class implements AccidenteModel {
    activo: number;
    codigo: string;
    fecha: string;
    id_trabajador: number;
    trabajador:string;
    id_tipo_accidente: number;
    id_causa: number;
    id: number;
  };
  titulo: string = 'Actividades';
  cargo: string = '';
  actividades: any = [];
  id_cargo: number = null;
  editando: boolean = false;
  showLoading: boolean = false;
  showLoadingTrab: boolean = false;
  showLoadingAct: boolean = false;
  showMessageTrab: boolean = false;
  messageLoadingTrab: string = "Cargando.."
  trabajadoresFiltrados: any = [];
  loadFirtsTipos:boolean = true;
  loadFirtsCausas:boolean = true;
  accidenteForm: FormGroup;
  codigo = new FormControl('', [Validators.required]);
  id_trabajador = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);

  constructor(private activateRoute: ActivatedRoute,
              private accidenteService: AccidentesService,
              private trabajadorService: TrabajadoresService,
              private actividadesService: ActividadesService,
              private globales: GlobalesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.editando = globales.editando;
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id) return;
      this.showLoading = true;
      this.accidenteService.obtener(id)
        .subscribe(data => {
          this.accidente = data
          this.cargo = data['cargo'];
          this.id_cargo = data['id_cargo'];
          this.accidente.fecha = data['fecha']; // eslint-disable-line
          this.obtenerActividades(this.id_cargo);
          this.showLoading = false;
        }, (error) => {
          this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
        });
    })
  }

  ngOnInit() {
    this.globales.title = this.activateRoute.snapshot.data.title;
    this.editando = (this.globales.title.indexOf('Nuevo') > -1) ? false : true;
    if(this.editando){
      this.loadFirtsTipos = false;
      this.loadFirtsCausas = false;
    }
    this.accidenteForm = this.formBuilder.group({
      'codigo': [this.accidente.codigo, [
        Validators.required
      ]],
      'id_trabajador': [this.accidente.id_trabajador, [
        Validators.required
      ]],
      'cargo': [this.cargo, []],
      'fecha': [this.accidente.fecha, [
        Validators.required
      ]],
      'activo': [this.accidente.activo, []]
    })
  }

  filter(field) {
    this.showLoadingTrab = true;
    this.showMessageTrab = true;
    this.messageLoadingTrab = 'Cargando...';
    let texto = field.target.value;
    this.trabajadorService.filtrar(texto)
      .subscribe(data => {
        this.trabajadoresFiltrados = data;
        if (this.trabajadoresFiltrados.length == 0) {
          this.messageLoadingTrab = 'No existen trabajadores con ese nombre.';
          this.showLoadingTrab = false;
          return;
        }
        this.showLoadingTrab = false;
        this.showMessageTrab = false;
      }, (error) => {
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }


  selectTrabajador(event, trabajador) {
    this.accidente.id_trabajador = trabajador.id;
    this.cargo = trabajador.cargo;
    this.id_cargo = trabajador.id_cargo;
    this.obtenerActividades(this.id_cargo);
  }

  obtenerActividades(idcargo) {
    this.showLoadingAct = true;
    let id_trabajador = this.accidente.id_trabajador;
    this.titulo = 'Cargando actividades....'
    this.actividadesService.obtenerPorTrabajador(id_trabajador, idcargo)
      .subscribe(data => {
        this.configurarActividades(data);
      }, (error) => {
      })
  }

  configurarActividades(data) {
    let acts = [];
    for (var j = 0; j < data.length; j++) {
      if (data[j]['select'] == true) {
        acts.push(data[j]);
      }
    }
    this.actividades = acts;
    this.titulo = 'Actividades';
    this.showLoadingAct = false;
  }

  insertar(cerrar) {
    if (this.editando === true) {
      this.modificar();
      return;
    }
    this.showLoading = true;
    this.accidente['id_cargo'] = this.id_cargo;
    this.accidente['fecha'] = this.globales.formatDate(this.accidente['fecha']);
    this.accidenteService.crear(this.accidente)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.resetFields();
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
        if (cerrar) {
          this.router.navigate(['accidentes']);
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }

  modificar() {
    this.showLoading = true;
    this.accidente['id_cargo'] = this.id_cargo;
    this.accidente['fecha'] = this.globales.formatDate(this.accidente['fecha']);
    this.accidenteService.modificar(this.accidente)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.router.navigate(['accidentes'])
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }

  resetFields() {
    this.accidenteForm.reset();
    this.actividades = [];
  }


  cancelar() {
    this.router.navigate(["/accidentes"]);
  }

  getErrorCodigo() {
    return this.codigo.hasError('required') ? 'Debe introducir un código' : ''
  }
}
