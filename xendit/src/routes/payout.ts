import { Hono } from "hono";
import * as payout from "../controller/PayoutController.js";

const app = new Hono();

app.post("/", (c) => payout.createPayout(c));
app.get("/:id", (c) => payout.getPayoutByID(c));

// Route untuk mendapatkan semua payout berdasarkan reference ID
// app.get("/", (c) => payout.getPayouts(c));

// Route untuk membatalkan payout
// app.post("/:id/cancel", (c) => payout.cancelPayout(c));

// Route untuk mendapatkan daftar channel payout yang tersedia
app.get("/channels", (c) => payout.getPayoutChannels(c));

export default app;
