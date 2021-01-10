import { Component } from "@angular/core";
import { BooksFacade } from "../facades/books.facade";

@Component({
  selector: "app-books-list",
  template: `
    <app-books-list-item
      *ngFor="let book of books$ | async"
      bookContext
      [isbn]="book.isbn"
    ></app-books-list-item>
  `,
  styles: [],
})
export class BooksListComponent {
  books$ = this.facade.books$;

  constructor(private facade: BooksFacade) {}
}
