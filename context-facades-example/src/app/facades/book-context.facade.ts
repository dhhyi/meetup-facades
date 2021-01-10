import { Injectable } from "@angular/core";
import { RxState } from "@rx-angular/state";
import { combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { CartService } from "../cart/cart.service";
import { Book } from "../models/book.model";
import { BooksFacade } from "./books.facade";

@Injectable()
export class BookContextFacade extends RxState<{
  isbn: string;
  quantity: number;
  book: Book;
  priceSum: number;
}> {
  constructor(private booksFacade: BooksFacade, private cart: CartService) {
    super();

    this.set("quantity", (state) => state.quantity ?? 1);

    this.connect(
      "book",
      this.select("isbn").pipe(
        switchMap((isbn) => this.booksFacade.book$(isbn))
      )
    );

    this.connect(
      "priceSum",
      combineLatest([
        this.select("book", "price"),
        this.select("quantity"),
      ]).pipe(map(([price, qty]) => price * qty))
    );
  }

  addToCart() {
    this.cart.addToCart(this.get("isbn"), this.get("quantity"));
  }
}
