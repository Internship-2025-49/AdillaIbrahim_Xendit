import { Hono } from "hono";
import * as payout from "../controller/PayoutController.js";

const app = new Hono();

app.post("/:id/cancel", (c) => payout.cancelPayout(c));

app.post("/", (c) => payout.createPayout(c));

app.get("/byid/:id", (c) => payout.getPayoutById(c));

app.get("/payouts_channels", (c) => payout.getPayoutChannels(c));

app.get("/reference/:id", (c) => payout.getPayouts(c));

app.post("/:id/cancel", (c) => payout.cancelPayout(c));

export default app;
