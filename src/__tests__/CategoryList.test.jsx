import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CategoryGrid from "../pages/dashboard/components/CategoryList";

describe("CategoryGrid Component", () => {
  it("should render the component without crashing", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );

    expect(screen.getByText("Product Categories")).toBeInTheDocument();
  });

  it("should display all categories", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );

    expect(screen.getByText("Clothes")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Furniture")).toBeInTheDocument();
    expect(screen.getByText("Women-Shoes")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
  });

  it("should have links to the correct category paths", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );

    expect(screen.getByText("Clothes").closest("a")).toHaveAttribute(
      "href",
      "/product/men-section"
    );
    expect(screen.getByText("Electronics").closest("a")).toHaveAttribute(
      "href",
      "/product/electronics"
    );
    expect(screen.getByText("Furniture").closest("a")).toHaveAttribute(
      "href",
      "/product/decoration"
    );
    expect(screen.getByText("Women-Shoes").closest("a")).toHaveAttribute(
      "href",
      "/product/women-section"
    );
    expect(screen.getByText("Sports").closest("a")).toHaveAttribute(
      "href",
      "/product/sport-section"
    );
  });

  it("should render the images correctly for each category", () => {
    render(
      <MemoryRouter>
        <CategoryGrid />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Clothes")).toHaveAttribute(
      "src",
      "https://i.imgur.com/QkIa5tT.jpeg"
    );
    expect(screen.getByAltText("Electronics")).toHaveAttribute(
      "src",
      "https://i.imgur.com/ZANVnHE.jpeg"
    );
    expect(screen.getByAltText("Furniture")).toHaveAttribute(
      "src",
      "https://i.imgur.com/Qphac99.jpeg"
    );
    expect(screen.getByAltText("Women-Shoes")).toHaveAttribute(
      "src",
      "https://i.imgur.com/qNOjJje.jpeg"
    );
    expect(screen.getByAltText("Sports")).toHaveAttribute(
      "src",
      "https://i.imgur.com/BG8J0Fj.jpg"
    );
  });
});
