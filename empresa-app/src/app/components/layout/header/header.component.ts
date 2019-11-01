import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ConstantesService} from "../../../services/constantes.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle: EventEmitter<boolean>;

  constructor(private constantes:ConstantesService) {
    this.sidenavToggle = new EventEmitter();
  }

  ngOnInit() {
  }

  onToggleSideNav(value) {
    this.sidenavToggle.emit(!value)
  }

}
