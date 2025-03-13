import { serve } from "@hono/node-server";
import { Hono } from "hono";
import invoice from "./routes/invoice.js";
import balance from "./routes/balance.js";
import transaction from "./routes/transaction.js";
import customer from "./routes/customer.js";
import paymentRequest from "./routes/paymentRequest.js";
import payout from "./routes/payout.js";
import paymentMethod from "./routes/paymentMethod.js";
import refund from "./routes/refund.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/invoices", invoice);
app.route("/balance", balance);
app.route("/transactions", transaction);
app.route("/customers", customer);
app.route("/paymentmethods", paymentMethod);
app.route("/paymentrequests", paymentRequest);
app.route("/refunds", refund);
app.route("/payouts", payout);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
