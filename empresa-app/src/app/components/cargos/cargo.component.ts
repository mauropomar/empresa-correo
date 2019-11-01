import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CargosService} from "../../services/cargos.service";
import {CargoModel} from "../../models/cargo.model";
import {ConstantesService} from "../../services/constantes.service";

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

  constructor(private activateRouter: ActivatedRoute,
              private cargoService: CargosService,
              private constantesService: ConstantesService) {
    this.editando = constantesService.editando;
    this.activateRouter.params.subscribe(params => {
      let id = params['id'];
      this.cargoService.obtener(id)
        .subscribe(data => this.cargo = data);
    })
  }

  ngOnInit() {
  }

}
