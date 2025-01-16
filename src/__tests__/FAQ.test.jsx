import { render, screen, fireEvent } from "@testing-library/react";
import FAQAccordion from "../pages/dashboard/components/FAQ";
import { describe, it, expect } from "vitest";

describe("FAQAccordion Component", () => {
  it("should render the FAQ section with a title", () => {
    render(<FAQAccordion />);

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("should render all the FAQ items", () => {
    render(<FAQAccordion />);

    expect(screen.getByText("What is the return policy?")).toBeInTheDocument();
    expect(screen.getByText("How do I track my order?")).toBeInTheDocument();
    expect(
      screen.getByText("What payment methods are accepted?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can I modify my order after placing it?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Do you offer international shipping?")
    ).toBeInTheDocument();
  });

  it("should expand and show content when an item is clicked", () => {
    render(<FAQAccordion />);

    fireEvent.click(screen.getByText("What is the return policy?"));

    expect(
      screen.getByText(
        "We offer a 30-day return policy for all products. Items must be unused and in their original packaging."
      )
    ).toBeInTheDocument();
  });
});
