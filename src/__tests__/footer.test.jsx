import { render, screen, waitFor } from "@testing-library/react";
import Footer from "../components/footer";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom"; 
import { describe, it, expect } from "vitest";

const renderWithSuspenseFallback = (ui) => {
  return render(
    <Suspense fallback={<div>Loading...</div>}>
      <Router>{ui}</Router> 
    </Suspense>
  );
};  

describe("Footer Component", () => {
  it("should render the footer with all sections with logo", async () => {
    renderWithSuspenseFallback(<Footer />);

    await waitFor(() => {
      expect(screen.getByTestId("GenieCart Logo")).toBeInTheDocument();
      expect(screen.getByTestId("GenieCart")).toBeInTheDocument();
      expect(screen.getByTestId("Information")).toBeInTheDocument();
      expect(screen.getByTestId("My Account")).toBeInTheDocument();
      expect(screen.getByTestId("Help")).toBeInTheDocument();
    });
  });

  it("should render the social media icons", async () => {
    renderWithSuspenseFallback(<Footer />);

    await waitFor(() => {
      expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
      expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
      expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
      expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    });
  });

  it("should render payment method icons", async () => {
    renderWithSuspenseFallback(<Footer />);

    await waitFor(() => {
      expect(screen.getByLabelText("Payment Method 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Payment Method 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Payment Method 3")).toBeInTheDocument();
      expect(screen.getByLabelText("Payment Method 4")).toBeInTheDocument();
      expect(screen.getByLabelText("Payment Method 5")).toBeInTheDocument();
    });
  });

  it("should display footer copyright text", () => {
    renderWithSuspenseFallback(<Footer />);

    const copyrightText = screen.getByTestId("GenieCartCopy");
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent(
      "2024 GenieCart. All Rights Reserved."
    );
  });
});
