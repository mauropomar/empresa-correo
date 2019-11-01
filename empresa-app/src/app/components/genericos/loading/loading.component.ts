import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  color:string = 'primary';
  mode:string = 'indeterminate';
  value:number = 50;
  @Input() textoLoading: string;
  constructor() { }

  ngOnInit() {
  }

}
