import { varchar, serial, text, pgTable, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const event = pgTable("event", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  date: varchar("date", { length: 255 }).notNull(),
  description: varchar("description", { length: 1048 }).notNull(),
});

export const attendee = pgTable("attendee", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  event_id: serial("event_id")
    .references(() => event.id)
    .notNull(),
  contact_info: varchar("contact_info", { length: 25 }).notNull(),
});
export const insertEventScheme = createInsertSchema(event);
export const insertAttendeeSchema = createInsertSchema(attendee);
