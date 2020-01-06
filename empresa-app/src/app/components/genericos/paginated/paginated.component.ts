import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginated',
  templateUrl: './paginated.component.html',
  styleUrls: ['./paginated.component.css']
})
export class PaginatedComponent implements OnInit {
  @Input() limit :number;
  @Input() numberPage: number;
  @Input() numberTo: number;
  @Input() numberFrom: number;
  @Input() totalPages:number;
  @Input() totalRecords:number;
  @Input() disabledFastLeft:boolean;
  @Input() disabledLeft:boolean;
  @Input() disabledFastRight:boolean;
  @Input() disabledRight:boolean;
  @Output() next: EventEmitter<number>;

  constructor() {
    this.next = new EventEmitter();
  }

  ngOnInit() {

  }

  changePage(){
    this.next.emit(this.numberPage);
  }

  nextPage(){
    this.numberPage = this.numberPage + 1;
    this.next.emit(this.numberPage);
  }

  lastPage(){
    this.numberPage = this.totalPages;
    this.next.emit(this.numberPage);
  }

  previousPage(){
    this.numberPage = this.numberPage - 1;
    this.next.emit(this.numberPage);
  }

  firthPage(){
    this.numberPage = 1;
    this.next.emit(this.numberPage);
  }

  refreshPage(){
    this.next.emit(this.numberPage);
  }

}
