import { Component } from "@angular/core";
import { BooksFacade } from "../facades/books.facade";

@Component({
  selector: "app-cart",
  template: `
    <ng-container *ngIf="cart$ | async as cart">
      <ul>
        <li *ngFor="let item of cart | keyvalue">
          {{ item.value }} x {{ item.key }} =
          <app-book-summed-up-price
            [isbn]="item.key"
            [quantity]="item.value"
          ></app-book-summed-up-price>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [],
})
export class CartComponent {
  cart$ = this.facade.cart$;

  constructor(private facade: BooksFacade) {}
}
