/**
 * An array of routes accessable to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification"
]

/**
 * An array of routes that require authentication.
 * These routes are protected and can only be accessed by authenticated users.
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for authentication-related API calls.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";