import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CargosService} from "../../services/cargos.service";
import {CargoModel} from "../../models/cargo.model";
import {GlobalesService} from "../../services/constantes.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargoComponent implements OnInit {
  editando:boolean = false;
  showLoading: boolean = false;
  textoLoading: string = 'Guardando...'
  private cargo: CargoModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    activo: 0
  }

  constructor(private activateRoute: ActivatedRoute,
              private cargoService: CargosService,
              private globales: GlobalesService,
              private router:Router) {
    this.editando = globales.editando;
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(!id) return;
      this.cargoService.obtener(id)
        .subscribe(data => this.cargo = data);
    })
  }

  ngOnInit() {
    this.globales.title = this.activateRoute.snapshot.data.title;
    this.editando = (this.globales.title.indexOf('Nuevo') > -1)?false:true;
  }

  insertar(cerrar){
    this.showLoading = true;
    this.cargoService.crear(this.cargo)
      .subscribe(data => {
        this.globales.datos.push(this.cargo);
        this.showLoading = false;
        if(cerrar){
           this.router.navigate(['cargos'])
        }
      }, (error) => {
        console.log(error)
      })
  }

  cancelar(){
      this.router.navigate(["/cargos"]);
  }

}
