import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Api } from "../generated/commission-quote-client";
const api = new Api({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  baseApiParams: {
    headers: {
      "api-key": process.env.REACT_APP_API_KEY,
    },
  },
});

export default function LoanQuoteForm() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTermMonths, setLoanTermMonths] = useState("");
  const [riskBand, setRiskBand] = useState("A");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const { data } = await api.commissionQuote.getCommissionQuote({
        loanAmount: Number(loanAmount),
        loanTermInMonths: Number(loanTermMonths),
        riskBand,
      });

      setStatus(`Quote generated: ${JSON.stringify(data)}`);
    } catch (err) {
      setStatus(`Error: ${err.message || JSON.stringify(err)}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 320, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        id="loan-amount"
        name="loanAmount"
        inputProps={{ "data-testid": "loan-amount-input" }}
        label="Loan Amount"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
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
        onChange={(e) => setLoanTermMonths(e.target.value)}
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

      {status && (
        <Typography id="quote-status" data-testid="quote-status" variant="body2">
          {status}
        </Typography>
      )}
    </Box>
  );
}
