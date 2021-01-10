import { Component, Input, OnInit } from "@angular/core";
import { BooksFacade } from "../facades/books.facade";

@Component({
  selector: "app-add-to-cart-button",
  template: `
    <button mat-raised-button color="primary" (click)="addToCart()">
      add to cart
    </button>
  `,
})
export class AddToCartButtonComponent {
  @Input() isbn: string;
  @Input() quantity = 1;

  constructor(private facade: BooksFacade) {}

  addToCart() {
    this.facade.addToCart(this.isbn, this.quantity);
  }
}
