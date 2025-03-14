import { Hono } from "hono";
import * as PaymentRequest from "../controller/paymentRequestController.js";

const app = new Hono();

app.post("/", (c) => PaymentRequest.createPaymentRequest(c));

app.get("/:id", (c) => PaymentRequest.getPaymentRequestByID(c));

app.get("/:id/captures", (c) => PaymentRequest.getPaymentRequestCaptures(c));

app.get("/", (c) => PaymentRequest.getAllPaymentRequest(c));

app.post("/:id/captures", (c) => PaymentRequest.capturePaymentRequest(c));

app.post("/:id/auth", (c) => PaymentRequest.authorizePaymentRequest(c));

app.post("/:id/auth/resend", (c) => PaymentRequest.resendPaymentRequestAuth(c));

app.post("/:id/payments/simulate", (c) =>
  PaymentRequest.simulatePaymentRequestPayment(c)
);

export default app;
