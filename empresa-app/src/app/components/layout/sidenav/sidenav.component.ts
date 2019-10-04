import {Component, OnInit, Input} from '@angular/core';
import {GlobalesService} from "../../../services/constantes.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    @Input() opened: boolean;
    constructor(private globales:GlobalesService, private router: Router) {
    }

    ngOnInit() {

    }



}
