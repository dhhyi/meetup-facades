import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BooksListComponent } from "./books-list/books-list.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { CartComponent } from "./cart/cart.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { BooksListItemComponent } from "./books-list/books-list-item.component";
import { AddToCartButtonComponent } from "./shared/add-to-cart-button.component";
import { AddToCartQuantityComponent } from "./shared/add-to-cart-quantity.component";
import { MatInputModule } from "@angular/material/input";
import { BookSummedUpPriceComponent } from "./shared/book-summed-up-price.component";
import { BookContextDirective } from "./facades/book-context.directive";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CartComponent,
    BooksListItemComponent,
    AddToCartButtonComponent,
    AddToCartQuantityComponent,
    BookSummedUpPriceComponent,
    BookContextDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
