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

// Chance (0 to 1) that a request randomly fails with 503, to simulate an unstable upstream
const FAILURE_RATE = process.env.MOCK_FAILURE_RATE
  ? Number(process.env.MOCK_FAILURE_RATE)
  : 0.8;
app.get("/getCommissionQuote", (req, res) => {
  if (Math.random() < FAILURE_RATE) {
    return res.status(503).json({ message: "Service temporarily unavailable" });
  }

  const { loanAmount, loanTermInMonths, riskBand } = req.query;

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

  res.json({
    quoteId: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
    commissionRate: 2.5,
    totalCommission: 250,
  });
});

app.listen(PORT, () => {
  console.log(`Mock Commission Quote API running at http://localhost:${PORT}`);
});