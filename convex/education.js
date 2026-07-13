import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("education").collect();
  },
});

export const add = mutation({
  args: {
    degree: v.string(),
    institution: v.string(),
    location: v.optional(v.string()),
    startYear: v.string(),
    endYear: v.string(),
    grade: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("education", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("education"),
    degree: v.optional(v.string()),
    institution: v.optional(v.string()),
    location: v.optional(v.string()),
    startYear: v.optional(v.string()),
    endYear: v.optional(v.string()),
    grade: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("education") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
