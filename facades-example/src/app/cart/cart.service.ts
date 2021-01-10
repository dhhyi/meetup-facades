import { BehaviorSubject } from "rxjs";

export class CartService {
  private _cart$ = new BehaviorSubject<{ [isbn: string]: number }>({});

  cart$ = this._cart$.asObservable();

  addToCart(isbn: string, quantity: number) {
    const prev = this._cart$.value;
    this._cart$.next({ ...prev, [isbn]: (prev[isbn] || 0) + quantity });
  }
}
