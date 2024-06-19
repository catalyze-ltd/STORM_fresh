import { sql } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  char,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

/** Enum defining fixed values for OA Confidence */
export const oaConfidenceEnum = pgEnum("oaConfidence", [
  "Weak",
  "Moderate",
  "Strong",
]);
export type OaConfidenceEnum = typeof oaConfidenceEnum.enumValues[number];

/** Table describing editting sessions in the capability audit tool */
export const editSession = pgTable("edit_session", {
  id: serial("id").primaryKey().notNull(),
  timeStamp: timestamp("time_stamp", { withTimezone: true, precision: 0 })
    .notNull().defaultNow(),
  message: text("message"),
});

/** Table uniquely identifying risks */
export const risk = pgTable("risk", {
  id: uuid("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
});

/** Table containing all data (including historical) about risks */
export const riskData = pgTable("risk_data", {
  id: serial("id").primaryKey().notNull(),
  riskId: uuid("risk_id").notNull().references(() => risk.id),
  prevDataId: integer("prev_data_id")
    .references((): AnyPgColumn => riskData.id),
  sessionId: integer("session_id").notNull().references(() => editSession.id),
  title: text("title").notNull(),
  serialNo: integer("serial_no").notNull(),
  description: text("description").notNull(),
  oaEvidenceNotes: text("oa_evidence_notes"),
  mitigation: text("mitigation"),
  wetsi: char("wetsi", { enum: ["W", "E", "T", "S", "I"], length: 1 })
    .notNull(),
  fcwgId: integer("fcwg_id").references(() => fcwg.id),
  cpgId: integer("cpg_id").references(() => cpg.id),
  status: text("status"),
  ownerId: integer("owner_id").references(() => riskOwner.id),
  dependencies: text("dependencies"),
});

/** Table uniquely identifying impact timelines (impact of a risk on a scenario over coming years) */
export const impactTimeline = pgTable("impact_timeline", {
  id: serial("id").primaryKey().notNull(),
  riskId: uuid("risk_id").notNull().references(() => risk.id),
  scenarioId: uuid("scenario_id").notNull().references(() => scenario.id),
}, (table) => ({
  uniqueKey: unique().on(table.riskId, table.scenarioId),
}));

/** Table containing all data (including historical) about impact timelines */
export const impactTimelineData = pgTable("impact_timeline_data", {
  id: serial("id").primaryKey().notNull(),
  impactTimelineId: integer("impact_timeline_id").notNull().references(
    (): AnyPgColumn => impactTimeline.id,
  ),
  prevDataId: integer("prev_data_id").references((): AnyPgColumn =>
    impactTimelineData.id
  ),
  sessionId: integer("session_id").notNull().references(() => editSession.id),
  impacts: smallint("impacts").array().notNull(),
  startYear: smallint("start_year").notNull(),
  oaConfidence: oaConfidenceEnum("oa_confidence"),
});

/** Table uniquely identifying scenarios */
export const scenario = pgTable("scenario", {
  id: uuid("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
});

/** Table containing all data (including historical) about scenarios */
export const scenarioData = pgTable("scenario_data", {
  id: serial("id").primaryKey().notNull(),
  scenarioId: uuid("scenario_id").notNull().references(() => scenario.id),
  prevDataId: integer("prev_data_id").references((): AnyPgColumn =>
    scenarioData.id
  ),
  sessionId: integer("session_id").notNull().references(() => editSession.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

/** Association table to track the history of Scenarios that may split/merge over time */
export const scenarioHistory = pgTable("scenario_history", {
  parentId: uuid("parent_id").notNull().references(() => scenario.id),
  childId: uuid("child_id").notNull().references(() => scenario.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.childId, table.parentId] }),
}));

/** Reference table defining the set of Functional Capability Working Groups */
export const fcwg = pgTable("fcwg", {
  id: serial("id").primaryKey().notNull(),
  value: text("value").notNull().unique(),
  extant: boolean("extant").notNull().default(true),
});

/** Reference table defining the set of Capability Planning Groups */
export const cpg = pgTable("cpg", {
  id: serial("id").primaryKey().notNull(),
  value: text("value").notNull().unique(),
  extant: boolean("extant").notNull().default(true),
});

/** Reference table defining the set of Risk owners */
export const riskOwner = pgTable("risk_owner", {
  id: serial("id").primaryKey().notNull(),
  value: text("value").notNull().unique(),
  extant: boolean("extant").notNull().default(true),
});

/** Table describing users of the capability audit tool */
export const user = pgTable("user_", {
  id: uuid("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  emailAddr: text("email_addr").notNull(),
});

/** Association table to track the set of authors during an edit session of the capability audit tool */
export const authors = pgTable("authors", {
  userId: uuid("user_id").notNull().references(() => user.id),
  sessionId: integer("session_id").notNull().references(() => editSession.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.sessionId] }),
}));

/** Table describing branches and snapshots of the versioned database contents */
export const branch = pgTable("branch", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  description: text("description"),
  isSnapshot: boolean("is_snapshot").notNull(),
  category: text("category"),
}, (table) => ({
  idx: index("branch_name_idx").on(table.name),
}));

/** Table identifying the current risk data for a given branch/snapshot */
export const riskTip = pgTable("risk_tip", {
  branchId: integer("branch_id").notNull().references(() => branch.id),
  riskId: uuid("risk_id").notNull().references(() => risk.id),
  dataId: integer("data_id").notNull().references(() => riskData.id),
  extant: boolean("extant").notNull().default(true),
}, (table) => ({
  pk: primaryKey({ columns: [table.branchId, table.riskId] }),
}));

/** Table identifying the current scenario data for a given branch/snapshot */
export const scenarioTip = pgTable("scenario_tip", {
  branchId: integer("branch_id").notNull().references(() => branch.id),
  scenarioId: uuid("scenario_id").notNull().references(() => scenario.id),
  dataId: integer("data_id").notNull().references(() => scenarioData.id),
  extant: boolean("extant").notNull().default(true),
}, (table) => ({
  pk: primaryKey({ columns: [table.branchId, table.scenarioId] }),
}));

/** Table identifying the current impact timeline data for a given branch/snapshot */
export const impactTimelineTip = pgTable("impact_timeline_tip", {
  branchId: integer("branch_id").notNull().references(() => branch.id),
  impactTimelineId: integer("impact_timeline_id").notNull().references(() =>
    impactTimeline.id
  ),
  dataId: integer("data_id").notNull().references(() => impactTimelineData.id),
  extant: boolean("extant").notNull().default(true),
}, (table) => ({
  pk: primaryKey({ columns: [table.branchId, table.impactTimelineId] }),
}));

/** Table containing user comments */
export const commentData = pgTable("comment_data", {
  id: serial("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => user.id),
  timeStamp: timestamp("time_stamp", { withTimezone: true, precision: 0 })
    .notNull().defaultNow(),
  content: text("content").notNull(),
});

/** Table listing comments that exist for risks / scenarios / timelines in each branch / snapshot */
export const comment = pgTable("comment", {
  branchId: integer("branch_id").notNull().references(() => branch.id),
  riskId: uuid("risk_id").references(() => risk.id),
  scenarioId: uuid("scenario_id").references(() => scenario.id),
  dataId: integer("data_id").notNull().references(() => commentData.id),
}, (table) => ({
  risk_idx: index("risk_comments_idx").on(table.branchId, table.riskId),
  scenario_idx: index("scenario_comments_idx").on(
    table.branchId,
    table.scenarioId,
  ),
  timeline_idx: index("timeline_comments_idx").on(
    table.branchId,
    table.riskId,
    table.scenarioId,
  ),
}));

/** Table for keeping track of OAuth/OIDC user sessions */
export const userSession = pgTable("user_session", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull().references(() => user.id),
  refreshToken: text("refresh_token").notNull(),
  idToken: text("id_token"),
  expiresAt: timestamp("expires_at", { withTimezone: true, precision: 0 }),
});
