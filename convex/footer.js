import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get footer data
export const get = query({
  handler: async (ctx) => {
    const footer = await ctx.db.query("footer").first();
    return footer;
  },
});

// Update footer data
export const update = mutation({
  args: {
    brandName: v.string(),
    subtitle: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    email: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("footer").first();
    
    if (existing) {
      // Update existing record
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      // Create new record
      const newId = await ctx.db.insert("footer", args);
      return newId;
    }
  },
});
