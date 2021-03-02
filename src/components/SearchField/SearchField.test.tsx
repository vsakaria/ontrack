import React from "react";
import { cleanup, render } from "@testing-library/react";
import { SearchField } from ".";

afterAll(cleanup);

test("SearchField should render the correct DOM", () => {
  const { container } = render(<SearchField handleSubmit={jest.fn()} />);
  expect(container).toMatchSnapshot("SearchField");
});
