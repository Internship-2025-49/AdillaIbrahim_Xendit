import { Hono } from "hono";
import * as customer from "../controller/customerController.js";

const app = new Hono();

app.get("/:id", (c) => customer.getCustomer(c));
app.post("/", (c) => customer.createCustomer(c));
// app.get("/reference/:referenceId", (c) =>
//   customer.getCustomerByReferenceID(c)
// );

export default app;
