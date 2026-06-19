import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware` convention to `proxy`.
// next-intl's middleware runs fine on the Node.js proxy runtime.
export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next internals, and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
