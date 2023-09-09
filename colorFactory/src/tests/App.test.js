import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("it renders without crashing", function () {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

test("/colors route", function () {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/colors"]}>
      <App />
    </MemoryRouter>
  );
  expect(getByText("Welcome to the color factory!")).toBeInTheDocument();
  const blueRoute = getByText("BLUE");
  fireEvent.click(blueRoute);
  expect(getByText("Go Back")).toBeInTheDocument();
});

test("/color/:color route", function () {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/colors/blue"]}>
      <App />
    </MemoryRouter>
  );
  expect(getByText("Go Back")).toBeInTheDocument();
});

test("/color/new route", function () {
  const { getByText, getByLabelText, queryByText } = render(
    <MemoryRouter initialEntries={["/colors/new"]}>
      <App />
    </MemoryRouter>
  );
  expect(getByText("Create your own Color!")).toBeInTheDocument();
  const nameInput = getByLabelText("Name");
  const colorInput = getByLabelText("Pick a color");
  const addBtn = queryByText("Add");
  fireEvent.change(nameInput, { target: { value: "yellow" } });
  fireEvent.change(colorInput, { target: { value: "#eff542" } });
  fireEvent.click(addBtn);
  expect(getByText("YELLOW")).toBeInTheDocument();
});
