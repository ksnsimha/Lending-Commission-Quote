import { render, screen } from "@testing-library/react";
import QuoteResult from "./QuoteResult";

test("renders the heading", () => {
  render(<QuoteResult quoteId="QT-1" commissionRate={2.5} totalCommission={100} />);
  const heading = screen.getByTestId("quote-details-header");
  expect(heading.textContent).toBe("Commission Quote Details");
});

test("renders the quote id", () => {
  render(<QuoteResult quoteId="QT-1234" commissionRate={2.5} totalCommission={100} />);
  const value = screen.getByTestId("quote-id-value");
  expect(value.textContent).toBe("QT-1234");
});

test("renders the commission rate with percent sign", () => {
  render(<QuoteResult quoteId="QT-1" commissionRate={4.5} totalCommission={100} />);
  const value = screen.getByTestId("commission-rate-value");
  expect(value.textContent).toBe("4.5%");
});

test("renders the total commission with dollar sign", () => {
  render(<QuoteResult quoteId="QT-1" commissionRate={2.5} totalCommission={350} />);
  const value = screen.getByTestId("total-commission-value");
  expect(value.textContent).toBe("$350");
});
