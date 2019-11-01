import {Component, OnInit, Input} from '@angular/core';
import {ConstantesService} from "../../../services/constantes.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    @Input() opened: boolean;
    constructor(private constantes:ConstantesService, private router: Router) {
    }

    ngOnInit() {

    }



}
