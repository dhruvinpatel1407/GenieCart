import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryMenu from "../components/header/component/CategoryMenu";
import { describe, it, expect, afterEach } from "vitest";

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe("CategoryMenu Navigation", () => {
  it("should navigate to the Men category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Men"));

    expect(container.innerHTML).toMatch("/product/men-section");
  });

  it("should navigate to the Women category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Women"));

    expect(container.innerHTML).toMatch("/product/women-section");
  });

  it("should navigate to the Sports category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Sports"));

    expect(container.innerHTML).toMatch("/product/sport-section");
  });

  it("should navigate to the Electronics category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Electronics"));

    expect(container.innerHTML).toMatch("/product/electronics");
  });

  it("should navigate to the Groceries category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Groceries"));

    expect(container.innerHTML).toMatch("/product/groceries");
  });

  it("should navigate to the Decoration category page", () => {
    const { container, getByText } = renderWithRouter(<CategoryMenu />);

    fireEvent.click(getByText("Decoration"));

    expect(container.innerHTML).toMatch("/product/decoration");
  });
});
