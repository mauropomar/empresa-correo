import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKey:string = '';
  @Output() changeText: EventEmitter<string>;
  @Output() cleanText: EventEmitter<number>;
  constructor() {
    this.changeText = new EventEmitter<string>();
    this.cleanText = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  filter(){
    let value = this.searchKey;
    this.changeText.emit(value);
  }

  cleanup(value){
    this.cleanText.emit(value);
    this.searchKey= '';
  }
}
