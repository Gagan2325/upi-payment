import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const payments = {}; // in-memory store (use DB in prod)

/**
 * INIT PAYMENT
 */
app.post("/api/payment/init", (req, res) => {
  const { amount } = req.body;
  const txnId = uuid();

  const cashback =
    amount >= 500 ? 25 :
    amount >= 200 ? 10 : 5;

  payments[txnId] = {
    status: "PENDING",
    amount,
    cashback
  };

  res.json({ txnId, cashback });
});

/**
 * UPDATE STATUS (simulate callback)
 */
app.post("/api/payment/update", (req, res) => {
  const { txnId, status } = req.body;
  if (payments[txnId]) {
    payments[txnId].status = status;
  }
  res.json({ success: true });
});

/**
 * GET STATUS
 */
app.get("/api/payment/:txnId", (req, res) => {
  res.json(payments[req.params.txnId] || {});
});

app.listen(3000, () =>
  console.log("Backend running http://localhost:3000")
);
