import { Component } from "@angular/core";

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
