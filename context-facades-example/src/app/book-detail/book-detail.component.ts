import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { BookContextFacade } from "../facades/book-context.facade";

@Component({
  selector: "app-book-detail",
  template: `
    <div class="book-detail-page">
      <p><a routerLink=".."><< back to list</a></p>
      <ng-container *ngIf="book$ | async as book">
        <h1>{{ book.title }}</h1>
        <h2>{{ book.author }}</h2>
        <h3>{{ book.description }}</h3>
        <app-add-to-cart-quantity></app-add-to-cart-quantity>
        <span>x</span>
        <app-add-to-cart-button></app-add-to-cart-button>
        <span>=</span>
        <app-book-summed-up-price></app-book-summed-up-price>
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
  providers: [BookContextFacade],
})
export class BookDetailComponent {
  book$ = this.facade.select("book");

  constructor(private facade: BookContextFacade, route: ActivatedRoute) {
    this.facade.connect(
      "isbn",
      route.params.pipe(map((params) => params.isbn))
    );
  }
}
