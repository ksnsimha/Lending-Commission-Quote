import { Card, CardContent, Typography, Stack } from "@mui/material";

export default function QuoteResult({ quoteId, commissionRate, totalCommission }) {
  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom data-testid="quote-details-header">
          Commission Quote Details
        </Typography>

        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Quote ID
          </Typography>
          <Typography variant="body1" data-testid="quote-id-value">
            {quoteId}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Commission Rate
          </Typography>
          <Typography variant="body1" data-testid="commission-rate-value">
            {commissionRate}%
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Total Commission
          </Typography>
          <Typography variant="body1" data-testid="total-commission-value">
            ${totalCommission}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
