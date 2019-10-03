import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CargosService} from "../../services/cargos.service";
import {CargoModel} from "../../models/cargo.model";
import {ConstantesService} from "../../services/constantes.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargoComponent implements OnInit {
  editando:boolean = false;
  private cargo: CargoModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    activo: 0
  }

  constructor(private activateRoute: ActivatedRoute,
              private cargoService: CargosService,
              private constantesService: ConstantesService,
              private router:Router) {
    this.editando = constantesService.editando;
  //  this.activateRouter.snapshot.data.title
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargoService.obtener(id)
        .subscribe(data => this.cargo = data);
    })
  }

  ngOnInit() {
    this.constantesService.title = this.activateRoute.snapshot.data.title;
  }

  cancelar(){
      this.router.navigate(["/cargos"]);
  }

}
