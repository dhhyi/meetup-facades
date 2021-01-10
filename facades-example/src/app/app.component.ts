import { Component } from "@angular/core";
import { BooksFacade } from "./facades/books.facade";

@Component({
  selector: "app-root",
  template: `
    <app-cart></app-cart>
    <hr />
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
