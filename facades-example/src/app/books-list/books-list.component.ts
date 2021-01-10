import { Component, OnInit } from "@angular/core";
import { BooksFacade } from "../facades/books.facade";

@Component({
  selector: "app-books-list",
  template: `
    <ul>
      <li *ngFor="let book of books$ | async">
        <a [routerLink]="book.isbn">
          <pre>{{ book | json }}</pre>
        </a>
      </li>
    </ul>
  `,
  styles: [],
})
export class BooksListComponent {
  books$ = this.facade.books$;

  constructor(private facade: BooksFacade) {}
}
