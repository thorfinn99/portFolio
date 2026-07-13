import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Training & Experience
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("training_experience").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    organization: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    type: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("training_experience", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("training_experience"),
    title: v.optional(v.string()),
    organization: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    type: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("training_experience") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
