import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchBtn = 'Search';
  search = '';

  @Output() onSearch = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(searchForm: NgForm) {
    this.onSearch.emit(searchForm.form.value.search);
    this.search = '';
  }
}
