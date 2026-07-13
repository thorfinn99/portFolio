import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Contact messages
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

  // Admin users table
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    role: v.string(),
    createdAt: v.number(),
  }).index("by_username", ["username"]),

  // Hero table (single record)
  hero: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    badgeText: v.optional(v.string()),
    typingStrings: v.array(v.string()),
    description: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    email: v.optional(v.string()),
  }),

  // About table (single record)
  about: defineTable({
    brandName: v.optional(v.string()), // Added for the navbar
    heading: v.string(),
    bio1: v.optional(v.string()),
    bio2: v.optional(v.string()),
    location: v.optional(v.string()),
    degree: v.optional(v.string()),
    focus: v.optional(v.string()),
    passion: v.optional(v.string()),
    photoUrl: v.optional(v.string()), // Kept for backward compatibility if needed temporarily
    photoStorageId: v.optional(v.id("_storage")),
  }),

  // Skills table
  skills: defineTable({
    name: v.string(),
    category: v.string(),
    level: v.string(),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
  }),

  // Projects table
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    technologies: v.array(v.string()),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  }),

  // Training & Experience table
  training_experience: defineTable({
    title: v.string(),
    organization: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    type: v.string(), // "Training" | "Experience"
    order: v.optional(v.number()),
  }),

  // Certificates table
  certificates: defineTable({
    title: v.string(),
    issuer: v.string(),
    issuedDate: v.optional(v.string()),
    credentialUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
  }),

  // Education table
  education: defineTable({
    degree: v.string(),
    institution: v.string(),
    location: v.optional(v.string()),
    startYear: v.string(),
    endYear: v.string(),
    grade: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  }),

  // Contact info (single record)
  contact: defineTable({
    email: v.string(),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    twitter: v.optional(v.string()),
    website: v.optional(v.string()),
    bio: v.optional(v.string()),
  }),

  // Resume (single record)
  resume: defineTable({
    url: v.string(),
    fileName: v.optional(v.string()),
    updatedAt: v.number(),
  }),

  // Footer (single record)
  footer: defineTable({
    brandName: v.string(),
    subtitle: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    email: v.optional(v.string()),
    location: v.optional(v.string()), // e.g. "India"
  }),
});
