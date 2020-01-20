import {Component, OnInit} from '@angular/core';
import {GlobalesService} from "../../services/constantes.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  constructor(private globales: GlobalesService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.globales.title = this.activeRoute.snapshot.data.title;
  }
}
