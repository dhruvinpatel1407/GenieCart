import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SaleCountdown from "../pages/dashboard/components/Banner/SaleEndTimer";

describe("SaleCountdown Component", () => {
  it("should render the SaleCountdown component correctly", () => {
    const saleEndTime = new Date(Date.now() + 10000);
    render(<SaleCountdown saleEndTime={saleEndTime} />);

    expect(screen.getByText("Flash Sale Ending Soon!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Unbeatable deals on your favorite items. Shop now before the clock runs out!"
      )
    ).toBeInTheDocument();
  });

  it('should display "Sale has ended!" when the sale has finished', async () => {
    const saleEndTime = new Date(Date.now() - 10000);
    render(<SaleCountdown saleEndTime={saleEndTime} />);

    expect(screen.getByText("Sale has ended!")).toBeInTheDocument();
  });

  // it('should show the countdown timer', async () => {
  //   const saleEndTime = new Date(Date.now() + 3000);

  //   vi.useFakeTimers();

  //   render(<SaleCountdown saleEndTime={saleEndTime} />);

  //   expect(screen.getByText('Flash Sale Ending Soon!')).toBeInTheDocument();
  //   expect(screen.getAllByText('0')[0]).toBeInTheDocument();
  //   expect(screen.getAllByText('0')[1]).toBeInTheDocument();
  //   expect(screen.getAllByText('0')[2]).toBeInTheDocument();
  //   expect(screen.getByText('3')).toBeInTheDocument();

  //   await act(async () => {
  //     vi.advanceTimersByTime(1000);
  //   });

  //   expect(screen.getByText('2')).toBeInTheDocument();

  //   await act(async () => {
  //     vi.advanceTimersByTime(1000);
  //   });

  //   expect(screen.getByText('1')).toBeInTheDocument();

  //   await act(async () => {
  //     vi.advanceTimersByTime(1000);
  //   });

  //   expect(screen.getByText('Sale has ended!')).toBeInTheDocument();

  //   vi.useRealTimers();
  // });
});
