# Title

## Winner!
- Facades - The best Layer of your Angular Application

## Other Ideas

- Lean Component Composition with Facades
- Using Facades for Component Composition in Angular Applications

# Abstract

Facades are services in Angular Applications decoupling view layers from application logic.
Especially in large enterprise applications facades can be used to easily divide between logic and view related development tasks.

In this talk we critically examine possibilities and disadvantages of introducing yet another layer into our Angular applications.

# Prerequisites

- Angular

# Level:

[ ] Beginner
[x] Intermediate
[ ] Advanced

# About the Author
- Foto

Danilo works as a Software Developer for the e-commerce company Intershop in Thuringia, located in the green heart of Germany. Just as he started working there, the decision was made to launch the development for a new storefront based on Angular. Even though he never worked with Angular before (his background is mainly Java and some C++), it turned into one of the best love stories of the current decade. Nowadays, whenever he is not working on the project, he likes spending time improving his cooking skills or ~~chilling at local pubs while~~ reading about psychology.

# Notes

## Introduction

## What are Facades?

- Wall
  - providing switches, displays, taps
    - switches -> trigger interactions
    - displays -> receive data (synchronously)
    - taps -> receive data as stream (asynchronously)
- Bank Teller vs. ATM -> same interface
  - provide credentials to bank account
  - put in money
  - extract money
  - get feedback about balance

## Why use Facades?

- decoupling logic from view -> parallel tasks
  - implement view (styling, layout) with mocked data
  - implement logic with temporarily unstyled view + console.log
  - meld both tracks together
- consistent interface for UI development
- agnostic to state management
  - state management can be introduced progressively if needed -> [Link to Talk](https://www.youtube.com/watch?v=F-1V43rNm2E)
- logic can be composed into libraries

## Why not use Facades?

- introduces another layer

## My Company specifics? (if I may talk about that)

- Demo Application as "template"
- Customers mainly customize view layer (sometimes heavily)
- Logic layer mostly untouched
- Most bugs reside in logic -> Fix can be provided by us and easily consumed by customers
  
- We tried using Smart/Dumb Components, but:
  - Layouting was still not easy to customize
  - Application logic was "bleeding" into components
- with Facades:
  - more logic moving from components into facades
  - Components are pure Angular & RxJS
- -> [Link to Blog](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

- When to load data?
  - previously: load Actions in Components / Effects based on routing
  - now: on subscription in facade.
  - -> [Link to Blog](https://dev.to/jonrimmer/where-to-initiate-data-load-in-ngrx-358l#)

## Demo with simple Application

## Introducing Context Facades (maybe just scrape topic)

- Some components exist in specific context only
  - "Add To Cart" button relates to a simple product

- Context Facade saves data specific to the context (mostly just id of object) and delegates to global facade
- Context Facades must be provided locally
  - Component Injectors (via @Component)
  - Element Injectors (via Directives)

- Data specific to the context vanishes from templates.

## Demo with modified Application
