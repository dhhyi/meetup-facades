import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CartService {
  private _cart$ = new BehaviorSubject<{ [isbn: string]: number }>({});

  cart$ = this._cart$.asObservable();

  addToCart(isbn: string, quantity: number) {
    const prev = this._cart$.value;
    this._cart$.next({ ...prev, [isbn]: (prev[isbn] || 0) + quantity });
  }
}
