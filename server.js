import express from "express";
import upiRoutes from "./routes/upi.js";

const app = express();
app.use(express.json());

app.use("/api/upi", upiRoutes);

app.listen(3000, () => {
  console.log("UPI Scanner API running on port 3000");
});
