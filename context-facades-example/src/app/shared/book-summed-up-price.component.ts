import { Component } from "@angular/core";
import { BookContextFacade } from "../facades/book-context.facade";

@Component({
  selector: "app-book-summed-up-price",
  template: `{{ sum$ | async | currency }}`,
})
export class BookSummedUpPriceComponent {
  sum$ = this.facade.select("priceSum");

  constructor(private facade: BookContextFacade) {}
}
