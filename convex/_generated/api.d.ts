/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as customQueries from "../customQueries.js";
import type * as documents_helpers from "../documents/helpers.js";
import type * as documents_mutations from "../documents/mutations.js";
import type * as documents_queries from "../documents/queries.js";
import type * as organizationInvites_mutations from "../organizationInvites/mutations.js";
import type * as organizationInvites_queries from "../organizationInvites/queries.js";
import type * as organizations_helpers from "../organizations/helpers.js";
import type * as organizations_mutations from "../organizations/mutations.js";
import type * as organizations_queries from "../organizations/queries.js";
import type * as permissions_mutations from "../permissions/mutations.js";
import type * as permissions_queries from "../permissions/queries.js";
import type * as types from "../types.js";
import type * as users_queries from "../users/queries.js";
import type * as webhook_mutations from "../webhook/mutations.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  customQueries: typeof customQueries;
  "documents/helpers": typeof documents_helpers;
  "documents/mutations": typeof documents_mutations;
  "documents/queries": typeof documents_queries;
  "organizationInvites/mutations": typeof organizationInvites_mutations;
  "organizationInvites/queries": typeof organizationInvites_queries;
  "organizations/helpers": typeof organizations_helpers;
  "organizations/mutations": typeof organizations_mutations;
  "organizations/queries": typeof organizations_queries;
  "permissions/mutations": typeof permissions_mutations;
  "permissions/queries": typeof permissions_queries;
  types: typeof types;
  "users/queries": typeof users_queries;
  "webhook/mutations": typeof webhook_mutations;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
