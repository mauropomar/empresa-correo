import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ActividadModel} from "../../models/actividad.model";
import {ActividadesService} from '../../services/actividades.service';
import {CargoModel} from "../../models/cargo.model";
import {GlobalesService} from "../../services/constantes.service";


@Component({
  selector: 'app-tabla-actividades',
  templateUrl: './tabla-actividades.component.html',
  styleUrls: ['./tabla-actividades.component.css']
})
export class TablaActividadesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion'];
  @Input() actividadesCargo;
  actividades = new MatTableDataSource<ActividadModel>();
  selection = new SelectionModel<ActividadModel>(true, []);
  showLoading: boolean = false;

  constructor(private actividadService: ActividadesService,
              private globales: GlobalesService) {

  }

  ngOnInit() {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.actividades.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.actividades.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ActividadModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
