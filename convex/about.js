import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    const about = await ctx.db.query("about").first();
    if (!about) return null;

    // Convert storage ID to URL if it exists
    let photoUrl = about.photoUrl;
    if (about.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(about.photoStorageId);
    }
    
    return { ...about, photoUrl };
  },
});

export const update = mutation({
  args: {
    brandName: v.optional(v.string()),
    heading: v.string(),
    bio1: v.optional(v.string()),
    bio2: v.optional(v.string()),
    location: v.optional(v.string()),
    degree: v.optional(v.string()),
    focus: v.optional(v.string()),
    passion: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    clearStorageId: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("about").first();
    const updateData = { ...args };
    delete updateData.clearStorageId;
    
    if (args.clearStorageId) {
      updateData.photoStorageId = undefined;
    }

    if (existing) {
      await ctx.db.patch(existing._id, updateData);
      return existing._id;
    } else {
      return await ctx.db.insert("about", updateData);
    }
  },
});

export const updatePhoto = mutation({
  args: {
    photoUrl: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { photoUrl, photoStorageId }) => {
    const existing = await ctx.db.query("about").first();
    const updateData = {};
    
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;
    if (photoStorageId !== undefined) updateData.photoStorageId = photoStorageId;

    if (existing) {
      await ctx.db.patch(existing._id, updateData);
      return existing._id;
    } else {
      return await ctx.db.insert("about", { heading: "About Me", ...updateData });
    }
  },
});
