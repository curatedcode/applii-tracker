import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});

export const userRelations = relations(users, ({ many }) => ({
  applications: many(applications),
}));

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  title: text("title"),
  body: text("body"),
  companyId: integer("company_id"),
  dateCreated: date("date_created").defaultNow(),
  dateModified: date("date_modified").defaultNow(),
  dateApplied: date("date_applied"),
  dateInterviewed: date("date_interviewed"),
  dateClosed: date("date_closed"),
});

export const applicationRelations = relations(
  applications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [applications.userId],
      references: [users.id],
    }),
    notes: many(applicationNotes),
  })
);

export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  name: text("name"),
  body: text("body"),
});

export const companyRelations = relations(company, ({ many }) => ({
  applications: many(applications),
}));

export const applicationNotes = pgTable("application_notes", {
  id: serial("id").primaryKey(),
  title: text("title"),
  body: text("body"),
  applicationId: integer("application_id"),
  userId: integer("user_id"),
  dateCreated: date("date_created").defaultNow(),
  dateModified: date("date_modified"),
});

export const applicationNoteRelations = relations(
  applicationNotes,
  ({ one }) => ({
    applicationId: one(applications, {
      fields: [applicationNotes.applicationId],
      references: [applications.id],
    }),
    userId: one(users, {
      fields: [applicationNotes.userId],
      references: [users.id],
    }),
  })
);
