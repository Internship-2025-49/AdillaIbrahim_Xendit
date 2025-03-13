import { Hono } from "hono";
import * as invoice from "../controller/invoiceController.js";

const app = new Hono();

app.post("/", (c) => invoice.createInvoice(c));
app.get("/", (c) => invoice.getInvoices(c));
app.get("/:id", (c) => invoice.getInvoiceById(c));
app.post("/:id", (c) => invoice.expireInvoice(c));

export default app;
