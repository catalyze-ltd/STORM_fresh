import { relations } from "drizzle-orm";
import * as t from "./schema.ts";

/** Relationships from editSession table */
export const editSessionRelations = relations(t.editSession, ({ many }) => ({
  authors: many(t.authors),
  impactTimelineEdits: many(t.impactTimelineData),
  riskEdits: many(t.riskData),
  scenarioEdits: many(t.scenarioData),
}));

/** Relationships from risk table */
export const riskRelations = relations(t.risk, ({ many }) => ({
  timelines: many(t.impactTimeline),
  history: many(t.riskData),
}));

/** Relationships from riskData table */
export const riskDataRelations = relations(t.riskData, ({ one }) => ({
  risk: one(t.risk, { fields: [t.riskData.riskId], references: [t.risk.id] }),
  prevData: one(t.riskData, {
    fields: [t.riskData.prevDataId],
    references: [t.riskData.id],
  }),
  session: one(t.editSession, {
    fields: [t.riskData.sessionId],
    references: [t.editSession.id],
  }),
  cpg: one(t.cpg, { fields: [t.riskData.cpgId], references: [t.cpg.id] }),
  fcwg: one(t.fcwg, { fields: [t.riskData.fcwgId], references: [t.fcwg.id] }),
  owner: one(t.riskOwner, {
    fields: [t.riskData.ownerId],
    references: [t.riskOwner.id],
  }),
}));

/** Relationships from impactTimeline table */
export const impactTimelineRelations = relations(
  t.impactTimeline,
  ({ one, many }) => ({
    risk: one(t.risk, {
      fields: [t.impactTimeline.riskId],
      references: [t.risk.id],
    }),
    scenario: one(t.scenario, {
      fields: [t.impactTimeline.scenarioId],
      references: [t.scenario.id],
    }),
    history: many(t.impactTimelineData),
  }),
);

/** Relationships from impactTimelineData table */
export const impactTimelineDataRelations = relations(
  t.impactTimelineData,
  ({ one }) => ({
    timeline: one(t.impactTimeline, {
      fields: [t.impactTimelineData.impactTimelineId],
      references: [t.impactTimeline.id],
    }),
    prevData: one(t.impactTimelineData, {
      fields: [t.impactTimelineData.prevDataId],
      references: [t.impactTimelineData.id],
    }),
    session: one(t.editSession, {
      fields: [t.impactTimelineData.sessionId],
      references: [t.editSession.id],
    }),
  }),
);

/** Relationships from scenario table */
export const scenarioRelations = relations(t.scenario, ({ many }) => ({
  history: many(t.scenarioData),
  timelines: many(t.impactTimeline),
  parents: many(t.scenarioHistory, { relationName: "child" }),
  children: many(t.scenarioHistory, { relationName: "parent" }),
}));

/** Relations from scenarioData table */
export const scenarioDataRelations = relations(t.scenarioData, ({ one }) => ({
  scenario: one(t.scenario, {
    fields: [t.scenarioData.scenarioId],
    references: [t.scenario.id],
  }),
  prevData: one(t.scenarioData, {
    fields: [t.scenarioData.prevDataId],
    references: [t.scenarioData.id],
  }),
  session: one(t.editSession, {
    fields: [t.scenarioData.sessionId],
    references: [t.editSession.id],
  }),
}));

/** Relationships for scenarioHistory table */
export const scenarioHistoryRelations = relations(
  t.scenarioHistory,
  ({ one }) => ({
    parent: one(t.scenario, {
      fields: [t.scenarioHistory.parentId],
      references: [t.scenario.id],
    }),
    child: one(t.scenario, {
      fields: [t.scenarioHistory.childId],
      references: [t.scenario.id],
    }),
  }),
);

/** Relationships for fcwg table */
export const fcwgRelations = relations(t.fcwg, ({ many }) => ({
  risks: many(t.risk),
  users: many(t.user),
}));

/** Relationships for cpg table */
export const cpgRelations = relations(t.cpg, ({ many }) => ({
  risks: many(t.risk),
  users: many(t.user),
}));

/** Relationships for riskOwner table */
export const riskOwnerRelations = relations(t.riskOwner, ({ many }) => ({
  risks: many(t.risk),
}));

/** Relationships for user table */
export const userRelations = relations(t.user, ({ many }) => ({
  sessions: many(t.editSession),
}));

/** Relationships for authors table */
export const authorsRelations = relations(t.authors, ({ one }) => ({
  session: one(t.editSession, {
    fields: [t.authors.sessionId],
    references: [t.editSession.id],
  }),
  user: one(t.user, { fields: [t.authors.userId], references: [t.user.id] }),
}));

/** Relationships from branch table */
export const branchRelations = relations(
  t.branch,
  ({ many }) => ({
    risks: many(t.riskTip),
    scenarios: many(t.scenarioTip),
    timelines: many(t.impactTimelineTip),
    comments: many(t.comment),
  }),
);

/** Relationships from riskTip table */
export const riskTipRelations = relations(
  t.riskTip,
  ({ one }) => ({
    branch: one(t.branch, {
      fields: [t.riskTip.branchId],
      references: [t.branch.id],
    }),
    risk: one(t.risk, { fields: [t.riskTip.riskId], references: [t.risk.id] }),
    data: one(t.riskData, {
      fields: [t.riskTip.dataId],
      references: [t.riskData.id],
    }),
  }),
);

/** Relationships from scenarioTip table */
export const scenarioTipRelations = relations(
  t.scenarioTip,
  ({ one }) => ({
    branch: one(t.branch, {
      fields: [t.scenarioTip.branchId],
      references: [t.branch.id],
    }),
    scenario: one(t.scenario, {
      fields: [t.scenarioTip.scenarioId],
      references: [t.scenario.id],
    }),
    data: one(t.scenarioData, {
      fields: [t.scenarioTip.dataId],
      references: [t.scenarioData.id],
    }),
  }),
);

/** Relationships from impactTimelineTip table */
export const impactTimelineTipRelations = relations(
  t.impactTimelineTip,
  ({ one }) => ({
    branch: one(t.branch, {
      fields: [t.impactTimelineTip.branchId],
      references: [t.branch.id],
    }),
    timeline: one(t.impactTimeline, {
      fields: [t.impactTimelineTip.impactTimelineId],
      references: [t.impactTimeline.id],
    }),
    data: one(t.impactTimelineData, {
      fields: [t.impactTimelineTip.dataId],
      references: [t.impactTimelineData.id],
    }),
  }),
);

/** Relationships from commentData table */
export const commmentDataRelations = relations(
  t.commentData,
  ({ one, many }) => ({
    user: one(t.user, {
      fields: [t.commentData.userId],
      references: [t.user.id],
    }),
    topics: many(t.comment),
  }),
);

/** Relationships from comment table */
export const commentRelations = relations(
  t.comment,
  ({ one }) => ({
    branch: one(t.branch, {
      fields: [t.comment.branchId],
      references: [t.branch.id],
    }),
    risk: one(t.risk, {
      fields: [t.comment.riskId],
      references: [t.risk.id],
    }),
    scenario: one(t.scenario, {
      fields: [t.comment.scenarioId],
      references: [t.scenario.id],
    }),
    timeline: one(t.impactTimeline, {
      fields: [t.comment.riskId, t.comment.scenarioId],
      references: [t.impactTimeline.riskId, t.impactTimeline.scenarioId],
    }),
    data: one(t.commentData, {
      fields: [t.comment.dataId],
      references: [t.commentData.id],
    }),
  }),
);
