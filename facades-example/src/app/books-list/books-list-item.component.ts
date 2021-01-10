import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BooksFacade } from "../facades/books.facade";
import { Book } from "../models/book.model";

@Component({
  selector: "app-books-list-item",
  template: `
    <mat-card *ngIf="book$ | async as book" class="book-line-item">
      <mat-card-header>
        <mat-card-title>
          <a [routerLink]="['/', book.isbn]">{{ book.title }}</a>
        </mat-card-title>
        <mat-card-subtitle>{{ book.author }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>{{ book.description }}</mat-card-content>
      <mat-card-actions>
        {{ book.price | currency }}
        <app-add-to-cart-button [isbn]="book.isbn"></app-add-to-cart-button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .book-line-item {
        margin: 10px;
        width: 500px;
        background-color: azure;
      }
      .mat-card-actions {
        text-align: right;
      }
    `,
  ],
})
export class BooksListItemComponent implements OnChanges {
  @Input() isbn: string;

  book$: Observable<Book>;

  constructor(private facade: BooksFacade) {}

  ngOnChanges(): void {
    this.book$ = this.facade.book$(this.isbn);
  }

  addToCart(isbn: string) {
    this.facade.addToCart(isbn, 1);
  }
}
