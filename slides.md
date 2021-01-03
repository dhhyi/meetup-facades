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

- Angular Services (`@Injectable`)

- Global (`providedIn: 'root'`)

- Singletons

- provide API for View Layer

  - access data synchronously / asynchronously

  - trigger actions

---

class: large

# What are Facades? (figuratively)

- Walls

---

class: large

# What are Facades? (exemplary)

```typescript
import { Injectable } from '@angular/core';
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
import { Component, OnInit } from '@angular/core';
import { Observable } from '@angular/core';
import { Book } from 'models';

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

# Using Facades - Component

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from '@angular/core';
import { Book } from 'models';

import { BooksFacade } from 'facades';

@Component(...)
export class BookDetailComponent implements OnInit {
  @Input() isbn: string;

  book$: Observable<Book>;

  constructor(private facade: BooksFacade) {}

  ngOnInit() {
    this.book$ = this.facade.book$(this.isbn)
  }

  addToCart(quantity: number) {
    this.facade.addToCart(this.isbn, quantity);
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

  book$(isbn: string) {
    this.store.dispatch(loadBook(isbn));
    return this.store.pipe(select(getBook, { isbn }));
  }

  addToCart(isbn: string, quantity: number) {
    this.store.dispatch(addToCart(isbn, quantity));
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

    :+1: Tackle Knowledge Gaps

    :+1: Move intermediate logic from Components into Facades

---

class: large

# Advantages using Facades

- Agnostic

  - Development can be split into Component + State Management

  - Refactorings don't impact Components

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
