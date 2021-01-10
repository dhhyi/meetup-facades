import { Injectable } from "@angular/core";
import { BehaviorSubject, of, ReplaySubject } from "rxjs";
import { scan, shareReplay } from "rxjs/operators";
import { BOOKS } from "../models/demo-data";

@Injectable({ providedIn: "root" })
export class BooksFacade {
  private _cart$ = new BehaviorSubject<{ [isbn: string]: number }>({});

  cart$ = this._cart$.asObservable();

  /** stream for all books */
  books$ = of(Object.values(BOOKS));

  /** stream for a single book */
  book$(isbn: string) {
    return of(BOOKS[isbn]);
  }

  /** add to cart interaction */
  addToCart(isbn: string, quantity: number) {
    const prev = this._cart$.value;
    this._cart$.next({ ...prev, [isbn]: (prev[isbn] || 0) + quantity });
  }
}
