import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GlobalesService} from "../../../services/constantes.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle: EventEmitter<boolean>;

  constructor(private globales:GlobalesService) {
    this.sidenavToggle = new EventEmitter();
  }

  ngOnInit() {
  }

  onToggleSideNav(value) {
    this.sidenavToggle.emit(!value)
  }

}
