/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as about from "../about.js";
import type * as certificates from "../certificates.js";
import type * as contact from "../contact.js";
import type * as education from "../education.js";
import type * as files from "../files.js";
import type * as footer from "../footer.js";
import type * as hero from "../hero.js";
import type * as projects from "../projects.js";
import type * as resume from "../resume.js";
import type * as skills from "../skills.js";
import type * as training from "../training.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  about: typeof about;
  certificates: typeof certificates;
  contact: typeof contact;
  education: typeof education;
  files: typeof files;
  footer: typeof footer;
  hero: typeof hero;
  projects: typeof projects;
  resume: typeof resume;
  skills: typeof skills;
  training: typeof training;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
