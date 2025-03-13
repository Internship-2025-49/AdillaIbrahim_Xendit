import { PaymentMethod as PaymentMethodClient } from "xendit-node";
import dotenv from "dotenv";
import type { Context } from "hono";

dotenv.config();

const API_KEY = process.env.XENDIT_API_KEY || "";

const xenditPaymentMethodClient = new PaymentMethodClient({
  secretKey: API_KEY,
});

export async function createPaymentMethod(c: Context) {
  try {
    const paymentMethodData = await c.req.json(); // Ambil data dari request body

    const paymentMethod = await xenditPaymentMethodClient.createPaymentMethod({
      data: {
        type: paymentMethodData.type, // "EWALLET", "BANK_TRANSFER", "CARD"
        customerId: paymentMethodData.customerId, // FIXED: customerId bukan customer_id
        reusability: paymentMethodData.reusability || "MULTIPLE_USE", // Default multiple use
        metadata: paymentMethodData.metadata || {}, // Metadata opsional

        // Jika metode pembayaran adalah E-Wallet
        ...(paymentMethodData.type === "EWALLET" && {
          ewallet: {
            channelCode: paymentMethodData.channelCode,
            channelProperties: paymentMethodData.channelProperties,
          },
        }),

        // Jika metode pembayaran adalah Bank Transfer (VA)
        ...(paymentMethodData.type === "BANK_TRANSFER" && {
          channelCode: paymentMethodData.channelCode, // Gunakan langsung channelCode tanpa `bankTransfer`
          channelProperties: paymentMethodData.channelProperties,
        }),

        // Jika metode pembayaran adalah Kartu Kredit/Debit
        ...(paymentMethodData.type === "CARD" && {
          card: {
            currency: paymentMethodData.currency || "IDR",
            channelProperties: paymentMethodData.channelProperties,
          },
        }),
      },
    });

    return c.json(paymentMethod, 201);
  } catch (error: any) {
    console.error("Error creating payment method:", error);
    return c.json(
      {
        error: "Failed to create payment method",
        details: error.message,
      },
      400
    );
  }
}

export async function getPaymentMethodByID(c: Context) {
  try {
    const id = c.req.param("id");
    const paymentMethod = await xenditPaymentMethodClient.getPaymentMethodByID({
      paymentMethodId: id,
    });
    return c.json(paymentMethod, 200);
  } catch (error) {
    console.error("Error getting payment method by id:", error);
  }
}

export async function getPaymentsByPaymentMethodId(c: Context) {
  try {
    const id = c.req.param("id");
    const payments =
      await xenditPaymentMethodClient.getPaymentsByPaymentMethodId({
        paymentMethodId: id,
      });
    return c.json(payments, 200);
  } catch (error) {
    console.error("Error getting payments by payment method id:", error);
  }
}

export async function patchPaymentMethod(c: Context) {
  try {
    const id = c.req.param("id");
    const paymentMethodData = await c.req.json();
    const paymentMethod = await xenditPaymentMethodClient.patchPaymentMethod({
      paymentMethodId: id,
      data: paymentMethodData,
    });
    return c.json(paymentMethod, 200);
  } catch (error) {
    console.error("Error patching payment method:", error);
  }
}

export async function getAllPaymentMethods(c: Context) {
  try {
    const paymentMethods =
      await xenditPaymentMethodClient.getAllPaymentMethods();
    return c.json(paymentMethods, 200);
  } catch (error) {
    console.error("Error getting all payment methods:", error);
  }
}

export async function expirePaymentMethod(c: Context) {
  try {
    const id = c.req.param("id");
    const paymentMethod = await xenditPaymentMethodClient.expirePaymentMethod({
      paymentMethodId: id,
    });
    return c.json(paymentMethod, 200);
  } catch (error) {
    console.error("Error expiring payment method:", error);
  }
}
