import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empresa-app';
  openedSideNav:boolean= true;
  sizeLeft:number= 15;
  sizeCenter:number= 85;
  constructor() {
  }

  ngOnInit() {

  }

  resizeLayout(opened){
    this.openedSideNav = opened;
     if(!opened){
       this.sizeLeft = 0;
       this.sizeCenter = 100;
     }else{
       this.sizeLeft = 15;
       this.sizeCenter = 85;
     }
  }

}
