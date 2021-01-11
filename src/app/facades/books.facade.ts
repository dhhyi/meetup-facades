import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { BOOKS } from "../models/demo-data";

@Injectable({ providedIn: "root" })
export class BooksFacade {
  /** stream for all books */
  books$ = of(Object.values(BOOKS));

  /** stream for a single book */
  book$(isbn: string) {
    return of(BOOKS[isbn]);
  }
}
