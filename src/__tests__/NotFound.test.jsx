import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../setup/Not Found";
import { describe, it, expect } from "vitest";

describe("NotFoundPage", () => {
  it("should render the 404 page correctly", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();

    expect(
      screen.getByText("Sorry, the page you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it("should have a link to navigate back to home", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    const homeLink = screen.getByText("Go Back Home");
    expect(homeLink).toBeInTheDocument();

    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });
});
