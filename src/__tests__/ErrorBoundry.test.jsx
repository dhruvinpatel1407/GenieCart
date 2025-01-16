import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../setup/Error Boundary";
import { expect, it, vi, describe } from "vitest";

const ProblemChild = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary", () => {
  it("renders children correctly when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Normal Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Child")).toBeInTheDocument();
  });

  it("renders error fallback UI when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary> 
    );

    expect(screen.getByText("Oops! Something Went Wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We could’t process your request at this time. Please refresh the page or try again later. If the issue persists, contact support."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh page/i })
    ).toBeInTheDocument();
  });

  it("should call componentDidCatch and log the error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalledWith(
      "Error caught by ErrorBoundary:",
      expect.any(Error),
      expect.any(Object)
    );

    spy.mockRestore();
  });
});
