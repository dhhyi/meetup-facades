import { Directive, Input } from "@angular/core";
import { BookContextFacade } from "./book-context.facade";

@Directive({
  selector: "[bookContext]",
  providers: [BookContextFacade],
})
export class BookContextDirective {
  constructor(private facade: BookContextFacade) {}

  @Input() set isbn(isbn: string) {
    this.facade.set("isbn", () => isbn);
  }

  @Input() set quantity(quantity: number) {
    this.facade.set("quantity", () => quantity);
  }
}
