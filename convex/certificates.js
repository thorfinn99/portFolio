import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("certificates").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    issuer: v.string(),
    issuedDate: v.optional(v.string()),
    credentialUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("certificates", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("certificates"),
    title: v.optional(v.string()),
    issuer: v.optional(v.string()),
    issuedDate: v.optional(v.string()),
    credentialUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("certificates") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
