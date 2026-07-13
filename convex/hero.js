import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    const hero = await ctx.db.query("hero").first();
    return hero;
  },
});

export const update = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    badgeText: v.optional(v.string()),
    typingStrings: v.array(v.string()),
    description: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("hero").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("hero", args);
    }
  },
});
