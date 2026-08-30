import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import LoanQuoteForm from "./LoanApplicationForm";

const mockGetCommissionQuote = jest.fn();

jest.mock("../../generated/commission-quote-client", () => ({
  Api: jest.fn().mockImplementation(() => ({
    commissionQuote: {
      getCommissionQuote: (...args) => mockGetCommissionQuote(...args),
    },
  })),
}));

afterEach(cleanup);

beforeEach(() => {
  mockGetCommissionQuote.mockReset();
});

function fillForm() {
  fireEvent.change(screen.getByTestId("loan-amount-input"), {
    target: { value: "10000" },
  });
  fireEvent.change(screen.getByTestId("loan-term-months-input"), {
    target: { value: "24" },
  });
}

test("renders all form fields and the submit button", () => {
  render(<LoanQuoteForm />);
  expect(screen.getByTestId("loan-amount-input")).not.toBeNull();
  expect(screen.getByTestId("loan-term-months-input")).not.toBeNull();
  expect(screen.getByTestId("risk-band-select")).not.toBeNull();
  expect(screen.getByTestId("generate-quote-button")).not.toBeNull();
});

test("renders the quote result on successful submit", async () => {
  mockGetCommissionQuote.mockResolvedValue({
    data: { quoteId: "QT-1", commissionRate: 2, totalCommission: 200 },
  });

  render(<LoanQuoteForm />);
  fillForm();
  fireEvent.click(screen.getByTestId("generate-quote-button"));

  await waitFor(() => {
    const value = screen.getByTestId("quote-id-value");
    expect(value.textContent).toBe("QT-1");
  });

  expect(screen.getByTestId("commission-rate-value").textContent).toBe("2%");
  expect(screen.getByTestId("total-commission-value").textContent).toBe("$200");
});

test("renders an error message and default values on failed submit", async () => {
  mockGetCommissionQuote.mockRejectedValue(new Error("Request failed"));

  render(<LoanQuoteForm />);
  fillForm();
  fireEvent.click(screen.getByTestId("generate-quote-button"));

  await waitFor(() => {
    const alert = screen.getByTestId("quote-error-alert");
    expect(alert.textContent).toBe("Request failed");
  });

  expect(screen.getByTestId("quote-id-value").textContent).toBe("N/A");
  expect(screen.getByTestId("commission-rate-value").textContent).toBe("0%");
  expect(screen.getByTestId("total-commission-value").textContent).toBe("$0");
});
