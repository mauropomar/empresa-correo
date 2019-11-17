import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ActividadesService} from "../../services/actividades.service";
import {ActividadModel} from "../../models/actividad.model";
import {GlobalesService} from "../../services/constantes.service";
import {Router} from '@angular/router'
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadComponent implements OnInit {
  actividad: ActividadModel = new class implements ActividadModel {
    activo: number;
    descripcion: string;
    id: number;
    nombre: string;
    id_cargo:number
  };
  editando: boolean = false;
  showLoading: boolean = false;
  actividadForm: FormGroup;
  nombre = new FormControl('', [Validators.required]);

  constructor(private activateRoute: ActivatedRoute,
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
      this.actividadesService.obtener(id)
        .subscribe(data => {
          this.actividad = data
          this.showLoading = false;
        }, (error) => {
          this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
        });
    })
  }

  ngOnInit() {
    this.globales.title = this.activateRoute.snapshot.data.title;
    this.actividad.id_cargo = this.globales.idcargoDefault;
    this.editando = (this.globales.title.indexOf('Nueva') > -1) ? false : true;
    this.actividadForm = this.formBuilder.group({
      'nombre': [this.actividad.nombre, [
        Validators.required
      ]],
      'descripcion': [this.actividad.descripcion, []],
      'activo': [this.actividad.activo, []]
    })
  }

  insertar(cerrar) {
    if (this.editando === true) {
      this.modificar();
      return;
    }
    this.showLoading = true;
    this.actividadesService.crear(this.actividad)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.resetFields();
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
        if (cerrar) {
          this.router.navigate(['actividades'])
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      },)
  }

  modificar() {
    this.showLoading = true;
    this.actividadesService.modificar(this.actividad)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.router.navigate(['actividades'])
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      },)
  }

  resetFields() {
    this.actividadForm.reset();
  }

  cancelar() {
    this.router.navigate(["/actividades"]);
  }

  getErrorMessage() {
    return this.nombre.hasError('required') ? 'Debe introducir un nombre' : ''
  }

  updateModel(id){
     this.actividad.id_cargo = id;
  }
}
