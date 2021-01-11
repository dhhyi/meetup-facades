import { Component } from "@angular/core";
import { BookContextFacade } from "../facades/book-context.facade";

@Component({
  selector: "app-add-to-cart-button",
  template: `
    <button mat-raised-button color="primary" (click)="addToCart()">
      add to cart
    </button>
  `,
})
export class AddToCartButtonComponent {
  constructor(private facade: BookContextFacade) {}

  addToCart() {
    this.facade.addToCart();
  }
}
