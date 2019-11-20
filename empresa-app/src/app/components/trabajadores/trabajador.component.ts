import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrabajadoresService} from "../../services/trabajadores.service";
import {TrabajadorModel} from "../../models/trabajador.model";
import {GlobalesService} from "../../services/constantes.service";
import {Router} from '@angular/router';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  trabajador: TrabajadorModel = new class implements TrabajadorModel {
    id: number;
    codigo: string;
    nombre: string;
    apellidos: string;
    id_cargo:number;
    activo: number;
    sexo:string;
    edad:number;
    imagen:string;
  };
  editando: boolean = false;
  showLoading: boolean = false;
  trabajadorForm: FormGroup;
  codigo = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required]);
  apellidos = new FormControl('', [Validators.required]);

  constructor(private activateRoute: ActivatedRoute,
              private trabajadorService: TrabajadoresService,
              private globales: GlobalesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.editando = globales.editando;
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id) return;
      this.showLoading = true;
      this.trabajadorService.obtener(id)
        .subscribe(data => {
          this.trabajador = data
          this.showLoading = false;
        }, (error) => {
          this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
        });
    })
  }

  ngOnInit() {
    this.globales.title = this.activateRoute.snapshot.data.title;
    this.editando = (this.globales.title.indexOf('Nuevo') > -1) ? false : true;
    this.trabajadorForm = this.formBuilder.group({
      'codigo': [this.trabajador.codigo, [
        Validators.required
      ]],
      'nombre': [this.trabajador.nombre, [
        Validators.required
      ]],
      'apellidos': [this.trabajador.apellidos, [
        Validators.required
      ]],
      'id_cargo': [this.trabajador.id_cargo, [
        Validators.required
      ]],
      'sexo': [this.trabajador.sexo, []],
      'edad':[this.trabajador.edad, []],
      'imagen': [this.trabajador.imagen, []],
      'activo': [this.trabajador.activo, []]
    })
  }

  insertar(cerrar) {
    if (this.editando === true) {
      this.modificar();
      return;
    }
    this.showLoading = true;
    this.trabajadorService.crear(this.trabajador)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.resetFields();
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
        if (cerrar) {
          this.router.navigate(['trabajadores']);
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      },)
  }

  modificar() {
    this.showLoading = true;
    this.trabajadorService.modificar(this.trabajador)
      .subscribe((data: any) => {
        this.showLoading = false;
        if (data.success === true) {
          this.toastr.success(data.msg, 'Información');
          this.router.navigate(['trabajadores']);
        } else {
          this.toastr.warning(data.msg, 'Información');
        }
      }, (error) => {
        this.showLoading = false;
        this.toastr.error('Ha ocurrido un error al realizar la operación.', 'Error');
      })
  }

  resetFields() {
    this.trabajadorForm.reset();
  }

  cancelar() {
    this.router.navigate(["/trabajador"]);
  }
  getErrorCodigo() {
    return this.codigo.hasError('required') ? 'Debe introducir un código' : ''
  }

  getErrorNombre() {
    return this.nombre.hasError('required') ? 'Debe introducir un nombre' : ''
  }

  getErrorApellidos() {
    return this.apellidos.hasError('required') ? 'Debe introducir los apellidos' : ''
  }

}