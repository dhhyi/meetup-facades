import { Component, Input, OnChanges } from "@angular/core";
import { Observable } from "rxjs";
import { BooksFacade } from "../facades/books.facade";
import { Book } from "../models/book.model";

@Component({
  selector: "app-book-summed-up-price",
  template: `
    <ng-container *ngIf="book$ | async as book">{{
      book.price * quantity | currency
    }}</ng-container>
  `,
})
export class BookSummedUpPriceComponent implements OnChanges {
  @Input() quantity = 1;
  @Input() isbn: string;

  book$: Observable<Book>;

  constructor(private facade: BooksFacade) {}

  ngOnChanges(): void {
    this.book$ = this.facade.book$(this.isbn);
  }
}
