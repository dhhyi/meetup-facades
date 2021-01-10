import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BooksFacade } from "../facades/books.facade";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-book-detail",
  template: `
    <ng-container *ngIf="book$ | async as book">
      <button (click)="addToCart(book.isbn)">add to cart</button>
      <pre>{{ book | json }}</pre>
    </ng-container>
    <a routerLink="..">back to list</a>
  `,
  styles: [],
})
export class BookDetailComponent {
  book$ = this.route.params.pipe(
    map((params) => params.isbn),
    switchMap((isbn) => this.facade.book$(isbn))
  );

  constructor(private facade: BooksFacade, private route: ActivatedRoute) {}

  addToCart(isbn: string) {
    this.facade.addToCart(isbn, 1);
  }
}
