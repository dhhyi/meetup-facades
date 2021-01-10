import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { CartService } from "../cart/cart.service";
import { BOOKS } from "../models/demo-data";

@Injectable({ providedIn: "root" })
export class BooksFacade {
  constructor(private cart: CartService) {}

  /** stream for all books */
  books$ = of(Object.values(BOOKS));

  /** stream for a single book */
  book$(isbn: string) {
    return of(BOOKS[isbn]);
  }

  /** add to cart interaction */
  addToCart(isbn: string, quantity: number) {
    this.cart.addToCart(isbn, quantity);
  }
}
