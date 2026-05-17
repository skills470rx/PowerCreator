import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * AI Creator Profile Table
 */
export const creators = mysqlTable("creators", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  avatar: varchar("avatar", { length: 500 }),
  bio: text("bio"),
  skills: text("skills"),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }),
  projectRate: decimal("projectRate", { precision: 10, scale: 2 }),
  isOnline: boolean("isOnline"),
  responseTime: int("responseTime"),
  totalRating: decimal("totalRating", { precision: 3, scale: 2 }),
  totalReviews: int("totalReviews"),
  totalEarnings: decimal("totalEarnings", { precision: 15, scale: 2 }),
  completedOrders: int("completedOrders"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("creators_userId_idx").on(table.userId),
}));

export type Creator = typeof creators.$inferSelect;
export type InsertCreator = typeof creators.$inferInsert;

/**
 * Portfolio Items Table
 */
export const portfolioItems = mysqlTable("portfolioItems", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  projectUrl: varchar("projectUrl", { length: 500 }),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  creatorIdIdx: index("portfolioItems_creatorId_idx").on(table.creatorId),
}));

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;

/**
 * Services Table
 */
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  deliveryTime: int("deliveryTime"),
  scope: text("scope"),
  isActive: boolean("isActive"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  creatorIdIdx: index("services_creatorId_idx").on(table.creatorId),
}));

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

/**
 * Orders Table
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  creatorId: int("creatorId").notNull(),
  serviceId: int("serviceId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "in-progress", "completed", "cancelled"]).default("pending"),
  deliveryDate: timestamp("deliveryDate"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  clientIdIdx: index("orders_clientId_idx").on(table.clientId),
  creatorIdIdx: index("orders_creatorId_idx").on(table.creatorId),
  statusIdx: index("orders_status_idx").on(table.status),
}));

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Messages Table
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId"),
  senderId: int("senderId").notNull(),
  receiverId: int("receiverId").notNull(),
  content: text("content").notNull(),
  isRead: boolean("isRead"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  orderIdIdx: index("messages_orderId_idx").on(table.orderId),
  senderIdIdx: index("messages_senderId_idx").on(table.senderId),
  receiverIdIdx: index("messages_receiverId_idx").on(table.receiverId),
}));

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Payments Table
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending"),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  orderIdIdx: index("payments_orderId_idx").on(table.orderId),
  statusIdx: index("payments_status_idx").on(table.status),
}));

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Ratings & Reviews Table
 */
export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  clientId: int("clientId").notNull(),
  creatorId: int("creatorId").notNull(),
  rating: int("rating").notNull(),
  review: text("review"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  creatorIdIdx: index("ratings_creatorId_idx").on(table.creatorId),
  clientIdIdx: index("ratings_clientId_idx").on(table.clientId),
}));

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;