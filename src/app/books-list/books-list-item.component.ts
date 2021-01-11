import { Component } from "@angular/core";
import { BookContextFacade } from "../facades/book-context.facade";

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
        <app-add-to-cart-button></app-add-to-cart-button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .book-line-item {
        margin: 10px;
        width: 350px;
        background-color: azure;
      }
      .mat-card-actions {
        text-align: right;
      }
    `,
  ],
})
export class BooksListItemComponent {
  book$ = this.facade.select("book");

  constructor(private facade: BookContextFacade) {}
}
