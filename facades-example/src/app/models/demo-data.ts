import { Book } from "./book.model";
import { loremIpsum } from "lorem-ipsum";

export const BOOKS: { [isbn: string]: Book } = {
  "0001": {
    isbn: "0001",
    title: "BOOK #1",
    author: "Author1",
    description: loremIpsum({ count: 1 }),
    price: 1,
  },
  "0002": {
    isbn: "0002",
    title: "BOOK #2",
    author: "Author2",
    description: loremIpsum({ count: 2 }),
    price: 2,
  },
  "0003": {
    isbn: "0003",
    title: "BOOK #3",
    author: "Author3",
    description: loremIpsum({ count: 3 }),
    price: 3,
  },
  "0004": {
    isbn: "0004",
    title: "BOOK #4",
    author: "Author4",
    description: loremIpsum({ count: 4 }),
    price: 4,
  },
};
