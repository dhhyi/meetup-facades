import { Component } from "@angular/core";
import { BookContextFacade } from "../facades/book-context.facade";

@Component({
  selector: "app-add-to-cart-quantity",
  template: `
    <input
      [value]="quantity$ | async"
      type="number"
      [min]="1"
      (change)="change($event.target)"
      (keydown)="change($event.target)"
    />
  `,
  styles: [
    `
      input {
        width: 30px;
      }
    `,
  ],
})
export class AddToCartQuantityComponent {
  quantity$ = this.facade.select("quantity");

  constructor(private facade: BookContextFacade) {}

  change(target: any) {
    this.facade.set("quantity", () => target?.valueAsNumber);
  }
}
