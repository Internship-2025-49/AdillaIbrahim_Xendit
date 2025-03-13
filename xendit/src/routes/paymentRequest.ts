import { Hono } from "hono";
import * as PaymentRequest from "../controller/paymentRequestController.js";

const app = new Hono();

app.post("/", (c) => PaymentRequest.createPaymentRequest(c));

export default app;
