import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BookCard } from ".";

afterAll(cleanup);

test("BookCard should render the correct DOM", () => {
  const book = {
    "book_title": "SOME_STRING",
    "book_author": "SOME_STRING",
    "book_publication_year": "SOME_STRING",
    "book_pages": "SOME_STRING"
  }

  const { container } = render(<BookCard book={book} />);
  expect(container).toMatchSnapshot("SearchField");
})