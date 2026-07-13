import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Contact - single record approach
export const get = query({
  handler: async (ctx) => {
    const records = await ctx.db.query("contact").collect();
    return records[0] || null;
  },
});

export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const upsert = mutation({
  args: {
    email: v.string(),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    twitter: v.optional(v.string()),
    website: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("contact").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("contact", args);
    }
  },
});

// Resume - single record approach
export const getResume = query({
  handler: async (ctx) => {
    const records = await ctx.db.query("resume").collect();
    return records[0] || null;
  },
});

export const upsertResume = mutation({
  args: {
    url: v.string(),
    fileName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("resume").first();
    const data = { ...args, updatedAt: Date.now() };
    if (existing) {
      await ctx.db.patch(existing._id, data);
    } else {
      await ctx.db.insert("resume", data);
    }
  },
});
