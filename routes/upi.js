import express from "express";
const router = express.Router();

router.post("/parse", (req, res) => {
  const { qrText } = req.body;

  if (!qrText.startsWith("upi://pay")) {
    return res.status(400).json({ error: "Invalid UPI QR" });
  }

  const url = new URL(qrText);

  const data = {
    upiId: url.searchParams.get("pa"),
    name: url.searchParams.get("pn"),
    amount: url.searchParams.get("am"),
    currency: url.searchParams.get("cu")
  };

  res.json({
    success: true,
    data
  });
});

export default router;
