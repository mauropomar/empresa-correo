import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle: EventEmitter<boolean>;
  constructor() {
    this.sidenavToggle = new EventEmitter();
  }

  ngOnInit() {
  }

  onToggleSideNav(value){
    this.sidenavToggle.emit(!value)
  }

}
