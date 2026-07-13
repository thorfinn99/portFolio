import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    const resume = await ctx.db.query("resume").first();
    return resume;
  },
});

export const update = mutation({
  args: {
    url: v.string(),
    fileName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("resume").first();
    const payload = {
      ...args,
      updatedAt: Date.now(),
    };
    if (existing) {
      await ctx.db.patch(existing._id, payload);
      return existing._id;
    } else {
      return await ctx.db.insert("resume", payload);
    }
  },
});
