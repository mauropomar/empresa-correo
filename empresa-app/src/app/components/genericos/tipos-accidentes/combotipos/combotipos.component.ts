import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {TiposAccidentesService} from "../../../../services/tipos-accidentes.service";
import {ToastrService} from "ngx-toastr";
import {GlobalesService} from "../../../../services/constantes.service";

@Component({
  selector: 'app-combotipos',
  templateUrl: './combotipos.component.html',
  styleUrls: ['./combotipos.component.css']
})
export class CombotiposComponent implements OnInit {
  tipos: [];
  @Input() selected:number;
  @Output() change: EventEmitter<number>;
  @Input() loadfirtsElement;
  @Input() defaultValue: number;
  constructor(private tiposService:TiposAccidentesService, private toastr:ToastrService, private globales: GlobalesService) {
    this.obtenerTodos();
    this.change = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let select = changes['selected'].currentValue;
    if(select)
      this.change.emit(select);
  }

  obtenerTodos(){
    this.tiposService.obtenerTodos()
      .subscribe(data => {
        this.tipos = data;
          if (this.loadfirtsElement) {
            this.selected = data[0].id;
          }
        this.change.emit(this.selected);
      }, (error) => {
        this.toastr.error('Ha ocurrido un error al obtener los tipos de accidentes.', 'Error');
      })
  }

  seleccionar(value){
    this.selected = value;
    this.change.emit(value);
  }

}
