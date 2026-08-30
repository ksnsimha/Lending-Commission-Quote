const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Any non-empty value is accepted by default for local mocking.
// Set MOCK_API_KEY to require an exact match instead.
const REQUIRED_API_KEY = process.env.MOCK_API_KEY || null;

app.use(cors());
app.use(express.json());

// Enforce the api-key header on every request, per the OpenAPI spec's securityScheme
app.use((req, res, next) => {
  const apiKey = req.header("api-key");

  if (!apiKey) {
    return res.status(403).json({ message: "Missing required api-key header" });
  }

  if (REQUIRED_API_KEY && apiKey !== REQUIRED_API_KEY) {
    return res.status(403).json({ message: "Invalid api-key" });
  }

  next();
});

// Simple in-memory mock logic based on riskBand
const RATE_BY_RISK_BAND = {
  A: 0.02,
  B: 0.045,
};

app.get("/getCommissionQuote", (req, res) => {
  const { loanAmount, loanTermInMonths, riskBand } = req.query;

  // Basic validation, mirroring the OpenAPI spec's required params
  if (!loanAmount || !loanTermInMonths || !riskBand) {
    return res.status(400).json({
      message: "loanAmount, loanTermInMonths, and riskBand are all required",
    });
  }

  if (!["A", "B"].includes(riskBand)) {
    return res.status(400).json({
      message: "riskBand must be one of: A, B",
    });
  }

  const amount = Number(loanAmount);
  const commissionRate = RATE_BY_RISK_BAND[riskBand];
  const totalCommission = Number((amount * commissionRate).toFixed(2));

  res.json({
    quoteId: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
    commissionRate: commissionRate * 100, // as a percentage
    totalCommission,
  });
});

app.listen(PORT, () => {
  console.log(`Mock Commission Quote API running at http://localhost:${PORT}`);
});