import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

test("renders Add Story Button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Story/i);
  expect(linkElement).toBeVisible();
});

test("columns should be visible", () => {
  render(<App />);
  const toDoColumn = screen.getByText(/To do/i);
  expect(toDoColumn).toBeVisible();
  const inProgressColumn = screen.getByText(/In progress/i);
  expect(inProgressColumn).toBeVisible();
  const testingColumn = screen.getByText("Testing");
  expect(testingColumn).toBeVisible();
  const doneColumn = screen.getByText("Done");
  expect(doneColumn).toBeVisible();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
