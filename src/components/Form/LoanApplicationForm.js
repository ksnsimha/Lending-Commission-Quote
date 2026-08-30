import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Alert,
  Typography
} from "@mui/material";
import { Api } from "../../generated/commission-quote-client";
import QuoteResult from "../Result/QuoteResult";


const api = new Api({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  baseApiParams: {
    headers: {
      "api-key": process.env.REACT_APP_API_KEY,
    },
  },
});

const DEFAULT_QUOTE = {
  quoteId: "N/A",
  commissionRate: 0,
  totalCommission: 0,
};

export default function LoanQuoteForm() {
  const [loanAmount, setLoanAmount] = useState("0.0");
  const [loanTermMonths, setLoanTermMonths] = useState("0");
  const [riskBand, setRiskBand] = useState("A");
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loanAmountError, setLoanAmountError] = useState("");
  const [loanTermMonthsError, setLoanTermMonthsError] = useState("");

  const validatePositiveNonZeroNumber = (value) => {
    if (value === "") return "This field is required";
    if (Number.isNaN(Number(value)) || Number(value) <= 0) {
      return "Must be a positive non-zero number";
    }
    return "";
  };

  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    setLoanAmount(value);
    setLoanAmountError(validatePositiveNonZeroNumber(value));
  };

  const handleLoanTermMonthsChange = (e) => {
    const value = e.target.value;
    setLoanTermMonths(value);
    setLoanTermMonthsError(validatePositiveNonZeroNumber(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const amountError = validatePositiveNonZeroNumber(loanAmount);
    const termError = validatePositiveNonZeroNumber(loanTermMonths);
    setLoanAmountError(amountError);
    setLoanTermMonthsError(termError);

    if (amountError || termError) {
      return;
    }

    try {
      const { data } = await api.commissionQuote.getCommissionQuote({
        loanAmount: Number(loanAmount),
        loanTermInMonths: Number(loanTermMonths),
        riskBand,
      });

      setQuote(data);
    } catch (err) {
      setErrorMessage(
        err?.error?.message ||
          err?.message ||
          "Something went wrong while generating the quote."
      );
      setQuote(DEFAULT_QUOTE);
    }
   };

  return (
    <Box sx={{ maxWidth: 320, display: "flex", flexDirection: "column", gap: 2 }}>
      {errorMessage && (
        <Alert severity="error" data-testid="quote-error-alert">
          {errorMessage}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom data-testid="Application-form-header">
          Loan Application Details
        </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          id="loan-amount"
          name="loanAmount"
          inputProps={{ "data-testid": "loan-amount-input" }}
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          error={Boolean(loanAmountError)}
          helperText={loanAmountError}
          required
          fullWidth
        />

        <TextField
          id="loan-term-months"
          name="loanTermMonths"
          inputProps={{ "data-testid": "loan-term-months-input" }}
          label="Loan Term (Months)"
          type="number"
          value={loanTermMonths}
          onChange={handleLoanTermMonthsChange}
          error={Boolean(loanTermMonthsError)}
          helperText={loanTermMonthsError}
          required
          fullWidth
        />

        <TextField
          id="risk-band"
          name="riskBand"
          select
          label="Risk Band"
          value={riskBand}
          onChange={(e) => setRiskBand(e.target.value)}
          fullWidth
          SelectProps={{
            inputProps: { "data-testid": "risk-band-select" },
          }}
        >
          <MenuItem value="A">A - Low Risk</MenuItem>
          <MenuItem value="B">B - Medium Risk</MenuItem>
        </TextField>

        <Button
          id="generate-quote-btn"
          data-testid="generate-quote-button"
          type="submit"
          variant="contained"
        >
          Generate Quote
        </Button>
      </Box>

     <QuoteResult {...quote} />
    </Box>
  );
}
