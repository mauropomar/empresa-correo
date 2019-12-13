import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginated',
  templateUrl: './paginated.component.html',
  styleUrls: ['./paginated.component.css']
})
export class PaginatedComponent implements OnInit {
  @Input() limit :number;
  numberPage: number = 0;
  totalPages:number = 0;
  numberRecord:number = 0;
  totalRecords:number = 0;
  constructor() { }

  ngOnInit() {

  }

}
