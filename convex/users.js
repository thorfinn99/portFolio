import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get the admin user (we assume the first user created is the admin)
export const getAdmin = query({
  args: {},
  handler: async (ctx) => {
    // Return the first user (there should realistically only be one admin right now)
    const adminUser = await ctx.db.query("users").first();
    return adminUser;
  },
});

// Initialize the default admin user if one doesn't exist
export const initAdmin = mutation({
  args: {
    username: v.string(),
    passwordHash: v.string()
  },
  handler: async (ctx, args) => {
    const existingAdmin = await ctx.db.query("users").first();
    if (existingAdmin) {
      return existingAdmin._id;
    }

    const newAdminId = await ctx.db.insert("users", {
      username: args.username,
      passwordHash: args.passwordHash,
      role: "admin",
      createdAt: Date.now(),
    });
    return newAdminId;
  },
});

// Update the admin user credentials
export const updateAdmin = mutation({
  args: {
    username: v.string(),
    passwordHash: v.string()
  },
  handler: async (ctx, args) => {
    const adminUser = await ctx.db.query("users").first();
    if (!adminUser) {
      throw new Error("Admin user not found to update");
    }

    await ctx.db.patch(adminUser._id, {
      username: args.username,
      passwordHash: args.passwordHash
    });
    
    return true;
  },
});
