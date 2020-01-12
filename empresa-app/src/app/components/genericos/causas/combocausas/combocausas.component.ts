import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CausasService} from "../../../../services/causas.service";
import {ToastrService} from "ngx-toastr";
import {GlobalesService} from "../../../../services/constantes.service";

@Component({
  selector: 'app-combocausas',
  templateUrl: './combocausas.component.html',
  styleUrls: ['./combocausas.component.css']
})
export class CombocausasComponent implements OnInit {
  causas: [];
  @Input() selected:number;
  @Output() change: EventEmitter<number>;
  @Input() loadfirtsElement;
  @Input() defaultValue: number;
  constructor(private causasService:CausasService, private toastr:ToastrService, private globales: GlobalesService) {
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
    this.causasService.obtenerTodos()
      .subscribe(data => {
        this.causas = data;
        if (this.loadfirtsElement) {
          this.selected = data[0].id;
        }
        this.change.emit(this.selected);
      }, (error) => {
        this.toastr.error('Ha ocurrido un error al obtener las causas.', 'Error');
      })
  }

  seleccionar(value){
    this.selected = value;
    this.change.emit(value);
  }

}
