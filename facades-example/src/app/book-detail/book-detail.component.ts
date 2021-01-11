import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BooksFacade } from "../facades/books.facade";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-book-detail",
  template: `
    <div class="book-detail-page">
      <p><a routerLink=".."><< back to list</a></p>
      <ng-container *ngIf="book$ | async as book">
        <h1>{{ book.title }}</h1>
        <h2>{{ book.author }}</h2>
        <h3>{{ book.description }}</h3>

        <app-add-to-cart-quantity
          [(quantity)]="quantity"
        ></app-add-to-cart-quantity>

        <span>x</span>

        <app-add-to-cart-button
          [isbn]="book.isbn"
          [quantity]="quantity"
        ></app-add-to-cart-button>

        <span>=</span>

        <app-book-summed-up-price
          [isbn]="book.isbn"
          [quantity]="quantity"
        ></app-book-summed-up-price>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .book-detail-page {
        margin: 10px;
      }
      span {
        margin: 5px;
      }
    `,
  ],
})
export class BookDetailComponent {
  quantity = 1;

  book$ = this.route.params.pipe(
    map((params) => params.isbn),
    switchMap((isbn) => this.facade.book$(isbn))
  );

  constructor(private facade: BooksFacade, private route: ActivatedRoute) {}
}
