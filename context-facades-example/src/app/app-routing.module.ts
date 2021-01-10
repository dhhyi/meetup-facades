import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BooksListComponent } from "./books-list/books-list.component";

const routes: Routes = [
  { path: "", component: BooksListComponent },
  { path: ":isbn", component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
