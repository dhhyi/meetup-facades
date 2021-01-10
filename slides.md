class: center, middle, clean
count: false

.meetup-logo[
![ngLeipzig](https://live.ngleipzig.de/assets/angular-leipzig-logo.png)

  <h2>ngLeipzig #36</h2>
]
<br/>

# Facades

## The best Layer of your Angular Application

<br/>

### Danilo Hoffmann

---

class: big

# Agenda

1. What are Facades?

2. What can Facades do for you?

3. Advantages using Facades

4. Disadvantages using Facades

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

class: big

# What are Facades? (technically)

- Angular Services (`@Injectable`)

- globally available (`providedIn: 'root'`)

- provide API for View Layer

  - access data synchronously / asynchronously

  - trigger actions

- delegates to State Management

---

class: big

# What are Facades? (figuratively)

- Walls providing switches, displays, taps

  - switches → trigger interactions

  - displays → query data (synchronously)

  - taps → receive data / notifications as stream (asynchronously)

--

- Examples:
  - Light switch
  - Tap for water
  - Clock
  - Alarm Clock

<!-- ---

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
 -->

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
<line x1="50" y1="150" x2="170" y2="270" stroke="black" stroke-width="20"></line>
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
<line x1="60" y1="250" x2="200" y2="100" stroke="black" stroke-width="20"></line>
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

class: middle, center

# 👍 Advantages using Facades

---

class: big

# Advantages using Facades

- Components use Angular, RxJS and Facades

- State management behind Facades

--

    👍 Tackle knowledge gaps

    👍 Simple testing

---

class: big

# Advantages using Facades

- Development can be split into Component + State Management

--

    👍 Parallelize development tasks

    👍 Introduce State Management progressively

    → 📺 [Progressive State Management with NGXS @ngLeipzig #34](https://www.meetup.com/Angular-Meetup-Leipzig/events/274182285/) by Aliaksei Kuncevič

---

class: big

# Advantages using Facades

- Refactoring doesn't impact Components

--

    👍 Restructure store as part of agile development w/o impacting Components

    💥 Remember ngrx action creators refactoring?

    📜 [NgRx: Action Creators redesigned](https://medium.com/angular-in-depth/ngrx-action-creators-redesigned-d396960e46da) by Alex Okrushko

    `new AddToCart(...)` → `addToCart(...)`

---

class: big

# Advantages using Facades

- Facades answer some architectural questions

--

    👍 Move intermediate logic from Components into Facades

    👍 Solves the data loading dilemma

    → 📜 [Where to initiate data load in NgRx](https://dev.to/jonrimmer/where-to-initiate-data-load-in-ngrx-358l#) by Jon Rimmer

    Application init / Routing / Component init / User action

---

class: middle, center

# 👎 Disadvantages using Facades

---

class: big

# Disadvantages using Facades

- Facades don't support strict action hygiene

  - Introduce individual actions for every source

  → 📺 [Good Action Hygiene with NgRx](https://www.youtube.com/watch?v=JmnsEvoy-gY) by Mike Ryan

---

class: big

# Disadvantages using Facades

- Introduces _another_ layer into our application

--

> We can solve any problem by introducing an extra level of indirection.

→ [Fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)

---

class: middle, center

# Lessons Learned from a Project

---

class: big

## .icon[![Intershop](https://upload.wikimedia.org/wikipedia/commons/9/9c/Intershop-Communications-AG.svg)]

- provide e-commerce solutions for running web shops

  - customizable server implementation with REST API

  - blue-print store for customization: [Intershop PWA](https://github.com/intershop/intershop-pwa)

--

- Customers / Partners

  - B2C shops

  - B2B shops

---

class: big

## .icon[![Intershop](https://upload.wikimedia.org/wikipedia/commons/9/9c/Intershop-Communications-AG.svg) ![PWA](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Progressive_Web_Apps_Logo.svg/2880px-Progressive_Web_Apps_Logo.svg.png)]

- General requirements

  - Performance (Bundle Size, SEO)

  - opt-in Features (Quoting, Wishlists, Approval, ...)

  - Multiple Channels (Country, Language)

---

class: big

## .icon[![Intershop](https://upload.wikimedia.org/wikipedia/commons/9/9c/Intershop-Communications-AG.svg) ![PWA](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Progressive_Web_Apps_Logo.svg/2880px-Progressive_Web_Apps_Logo.svg.png)]

- Customization requirements

  - UX/UI (sometimes just styling, sometimes heavy customization)

  - Shop logic mostly reused

  - merge new features / bugfixes from upstream

--

→ Facades to the rescue!

---

class: big, center, middle

# Live Demo

[facades-example @ .icon[![StackBlitz](https://developer.stackblitz.com/img/logo.svg)]](https://stackblitz.com/github/dhhyi/meetup-facades/tree/facades-example?file=src%2Fapp%2Ffacades%2Fbooks.facade.ts)

---

class: big, center, middle

# Live Demo

[context-facades-example @ .icon[![StackBlitz](https://developer.stackblitz.com/img/logo.svg)]](https://stackblitz.com/github/dhhyi/meetup-facades/tree/context-facades-example?file=src%2Fapp%2Ffacades%2Fbook-context.facade.ts)

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

## ⭐ ❤️ 💬 ✉️

### slides and examples available at

## https://github.com/dhhyi/meetup-facades
