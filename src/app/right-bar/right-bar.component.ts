import { Component, OnInit } from '@angular/core';

import { BookItemCsv, BookItem, BookItemSearchKey } from '../store/book.store';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit {

  bookItemSearchKey = new BookItemSearchKey();

  constructor() { }

  ngOnInit(): void {
  }

}
