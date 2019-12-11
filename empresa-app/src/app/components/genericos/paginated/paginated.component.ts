import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-paginated',
  templateUrl: './paginated.component.html',
  styleUrls: ['./paginated.component.css']
})
export class PaginatedComponent implements OnInit {
  totalpages:number = 0;
  pageForm: FormGroup;
  page = new FormControl('', [Validators.required]);
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pageForm = this.formBuilder.group({
      'page': [this.page, [
        Validators.required
      ]],
      'totalpages': [this.totalpages, []]
    })
  }

}
