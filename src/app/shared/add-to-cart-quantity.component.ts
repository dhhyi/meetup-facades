import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-add-to-cart-quantity",
  template: `
    <input
      [value]="quantity"
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
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();

  change(target: any) {
    this.quantityChange.emit(target?.valueAsNumber);
  }
}
