class: center, middle, clean
count: false

# Facades

## The best Layer of your Angular Application

---

class: big

# Agenda

1. What are Facades?

2. What can Facades do for you?

3. When to use Facades?

4. When **not** to use Facades?

5. Lessons Learned from a Project

6. Introducing Context-Facades

---

class: large

# Introduction

<br/>

.avartar[![dhhyi](http://www.gravatar.com/avatar/391e7c4577e5644c8f82fb36ec7a5f03?size=200&rating=pg&d=mm)]

## Danilo Hoffmann

.icon[![Twitter](https://upload.wikimedia.org/wikipedia/de/9/9f/Twitter_bird_logo_2012.svg)
[@dhhyi](https://twitter.com/dhhyi)]

.icon[![GitHub](https://avatars3.githubusercontent.com/in/15368?s=256&v=2)
[dhhyi](https://github.com/dhhyi)]

<br/>

- Java/C++ Background ~8y

- Angular since 3y @ .icon[![Intershop](https://upload.wikimedia.org/wikipedia/commons/9/9c/Intershop-Communications-AG.svg)]

---

class: middle, center

# What are Facades?

---

class: large

# What are Facades? (technically)

- Singletons

  - Angular Services (`@Injectable`)

  - Globally available (`providedIn: 'root'`)

--

- provide API for View Layer

  - access data synchronously / asynchronously

  - trigger actions

---

class: large

# What are Facades? (figuratively)

- Walls providing switches, displays, taps

  - switches → trigger interactions

  - displays → receive data (synchronously)

  - taps → receive data as stream (asynchronously)

--

- Examples:
  - Light switch
  - Tap for water
  - Clock
  - Alarm

---

class: large

# What are Facades? (exemplary)

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'models';

@Injectable({ providedIn: 'root' })
export class BookFacade {

  /** stream for all books */
  books$: Observable<Book[]> = ...

  /** stream for a single book */
  book$(isbn: string): Observable<Book> {
    ...
  }

  /** add to cart interaction */
  addToCart(isbn: string, quantity: number): void {
    ...
  }
}
```

---

class: center, left-heading

# What are Facades? (visually)

.img-overlay-wrap[
<img src="https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png"/>
]

---

class: center, left-heading

# What are Facades? (visually)

.img-overlay-wrap[
<img src="https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png"/>
<svg viewBox="0 0 500 300">
<line x1="20" y1="150" x2="180" y2="280" stroke="black" stroke-width="20"></line>
</svg>
]

---

class: center, left-heading

# What are Facades? (visually)

.img-overlay-wrap[
<img src="https://gblobscdn.gitbook.com/assets%2F-L9CoGJCq3UCfKJ7RCUg%2F-Lqo8CEiTGbFfHN-MPem%2F-Lqo8EeI9WI8AjKSCgMo%2Fdiagram.png?alt=media">
]

---

class: center, left-heading

# What are Facades? (visually)

.img-overlay-wrap[
<img src="https://gblobscdn.gitbook.com/assets%2F-L9CoGJCq3UCfKJ7RCUg%2F-Lqo8CEiTGbFfHN-MPem%2F-Lqo8EeI9WI8AjKSCgMo%2Fdiagram.png?alt=media">
<svg viewBox="0 0 500 300">
<line x1="60" y1="220" x2="200" y2="40" stroke="black" stroke-width="20"></line>
</svg>
]

---

class: middle, center

# What can Facades do for you?

--
<br/>

## Facades provide an

## **agnostic** and **cleanly decoupled**

## Interface to the Application Logic

---

# Using NgRx directly

```typescript
import { Store, select } from '@ngrx/store';
import { getBook } from 'store/books/selectors';
import { loadBook, addToCart } from 'store/books/actions';

@Component(...)
export class BookDetailComponent implements OnInit {
  @Input() isbn: string;

  book$: Observable<Book>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadBook(this.isbn));
    this.book$ = this.store.pipe(select(getBook, { isbn: this.isbn }))
  }

  addToCart(quantity: number) {
    this.store.dispatch(addToCart(this.isbn, quantity));
  }
}
```

---

# Using NgRx directly

```typescript
*import { Store, select } from '@ngrx/store';
*import { getBook } from 'store/books/selectors';
*import { loadBook, addToCart } from 'store/books/actions';

@Component(...)
export class BookDetailComponent implements OnChanges {
  @Input() isbn: string;

  book$: Observable<Book>;

* constructor(private store: Store) {}

  ngOnChanges() {
*   this.store.dispatch(loadBook(this.isbn));
*   this.book$ = this.store.pipe(select(getBook, { isbn: this.isbn }))
  }

  addToCart(quantity: number) {
*   this.store.dispatch(addToCart(this.isbn, quantity));
  }
}
```

---

# Using Facades - Facade

```typescript
import { Store, select } from "@ngrx/store";
import { getBook } from "store/books/selectors";
import { loadBook, addToCart } from "store/books/actions";

@Injectable({ providedIn: "root" })
export class BooksFacade {
  constructor(private store: Store) {}

  /** stream for book with isbn */
  book$(isbn: string) {
    this.store.dispatch(loadBook(isbn));
    return this.store.pipe(select(getBook, { isbn }));
  }

  /** trigger action addToCart */
  addToCart(isbn: string, quantity: number) {
    this.store.dispatch(addToCart(isbn, quantity));
  }
}
```

---

# Using Facades - Component

```typescript
import { BooksFacade } from 'facades';

@Component(...)
export class BookDetailComponent implements OnChanges {
  @Input() isbn: string;

  book$: Observable<Book>;

  constructor(private facade: BooksFacade) {}

  ngOnChanges() {
    this.book$ = this.facade.book$(this.isbn);
  }

  addToCart(quantity: number) {
    this.facade.addToCart(this.isbn, quantity);
  }
}
```

---

class: large

# Advantages using Facades

- Cleanly Decoupled

  - Components use Angular, RxJS and Facades

  - State management behind Facades

--

    👍 Tackle knowledge gaps

    👍 Move intermediate logic from Components into Facades

    👍 Simple testing

---

class: large

# Advantages using Facades

- Agnostic

  - Development can be split into Component + State Management

--

    👍 Parallelize development tasks

    👍 Introduce State Management progressively

    -> talk from Aliaksei Kuncevič "Progressive State Management with NGXS" @[ngLeipzig #34](https://www.meetup.com/Angular-Meetup-Leipzig/events/274182285/)

---

class: large

# Advantages using Facades

- Agnostic

  - Refactoring doesn't impact Components

--

    👍 Restructure store as part of agile development w/o impacting Components

    💥 Remember [ngrx action creators refactoring](https://medium.com/angular-in-depth/ngrx-action-creators-redesigned-d396960e46da)?

---

class: big, center, middle

# Live Demo

[https://stackblitz.com/github/dhhyi/ngrx-data-views/tree/memoized-data-views](https://stackblitz.com/github/dhhyi/ngrx-data-views/tree/memoized-data-views?file=src%2Fapp%2Fstore%2Fbook-view%2Findex.ts)

---

class: large

# Agnostic Interface

.w50[![schalter](https://www.capital.de/wp-content/uploads/2014/03/bankschalter_dpa-620x349.png)]
.w50[![atm](https://avant-garde.com.cy/sites/default/files/styles/media_image/public/2020-08/atm-2.jpg?h=c46fd5b3&itok=36Oh0HWq)]

- provide credentials to bank account

- extract money

- get feedback about balance

---

class: middle, center

<iframe width="700" height="500" src="https://www.youtube.com/embed/Hyvn9R4wcLc?controls=1&amp;start=0&amp;mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

class: middle, center

# Thank You!

## ❤️ 💬 ✉️
