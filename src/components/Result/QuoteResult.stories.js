import QuoteResult from "./QuoteResult";

export default {
  title: "Components/QuoteResult",
  component: QuoteResult,
};

export const Default = {
  args: {
    quoteId: "QT-10234",
    commissionRate: 2.5,
    totalCommission: 350,
  },
};

export const HighCommission = {
  args: {
    quoteId: "QT-99871",
    commissionRate: 5.75,
    totalCommission: 1200,
  },
};

export const ZeroCommission = {
  args: {
    quoteId: "QT-00001",
    commissionRate: 0,
    totalCommission: 0,
  },
};
