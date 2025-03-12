import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as invoice from "./controller/invoice.js";
import * as balance from "./controller/balance.js";
import * as transaction from "./controller/transaction.js";
import * as customer from "./controller/customer.js";
import * as PaymentRequest from "./controller/paymentRequest.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/invoice", (c) => invoice.createInvoice(c));

app.get("/invoice", (c) => invoice.getInvoices(c));

app.get("/invoice/:id", (c) => invoice.getInvoiceById(c));

app.post("/invoice/:id", (c) => invoice.expireInvoice(c));

app.get("/balance", (c) => balance.getBalance(c));

app.get("/transaction", (c) => transaction.getAllTransactions(c));

app.get("/transaction/:id", (c) => transaction.getTransactionByID(c));

app.get("/customer/:id", (c) => customer.getCustomer(c));

app.post("/customer/:id", (c) => customer.createCustomer(c));

app.post("/payment_request", (c) => PaymentRequest.createPaymentRequest(c));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
