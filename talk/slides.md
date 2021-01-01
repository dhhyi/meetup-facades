class: center, middle, clean
count: false

# Facades

## The best Layer of your Angular Application

---

class: big

# Agenda

1. What are Facades?

2. When to use Facades?

3. When **not** to use Facades?

4. Lessons Learned from a Project

5. Introducing Context-Facades

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