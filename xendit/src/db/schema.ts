import {
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const invoices = mysqlTable("invoices", {
  id: int("id").primaryKey().autoincrement(),
  invoiceId: varchar({ length: 255 }).notNull().unique(),
  externalId: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  merchantName: varchar({ length: 255 }).notNull(),
  merchantProfilePictureUrl: text("merchantProfilePictureUrl").notNull(),
  amount: int("amount").notNull(),
  expiryDate: timestamp("expiryDate").notNull(),
  invoiceUrl: text("invoiceUrl").notNull(),
  created: timestamp("created").notNull().default(new Date()),
  updated: timestamp("updated").notNull().default(new Date()),
  currency: varchar({ length: 255 }).notNull(),
  customer: json("customer").notNull(),
  items: json("items").notNull(),
  fees: json("fees"),
  availableBanks: json("availableBanks"),
  availableRetailOutlets: json("availableRetailOutlets"),
  availableEwallets: json("availableEwallets"),
  availableQrCodes: json("availableQrCodes"),
  availableDirectDebits: json("availableDirectDebits"),
  availablePaylaters: json("availablePaylaters"),
});
