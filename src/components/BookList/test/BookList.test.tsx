import React from "react";

import { cleanup, render } from "@testing-library/react";

import BookList from "..";

afterAll(cleanup);

test("BookList displays the correct title", () => {
  const { container } = render(<BookList />);
  expect(container).toBeInTheDocument();

});
