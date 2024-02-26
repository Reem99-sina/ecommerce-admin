import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  
  publicRoutes: (req) => req.url.includes("/api")||req.url.includes("/webhook"),
  
  // publicRoutes: "/api/550a06cf-d280-4fdd-a959-bcb66dfe60c8/categories"
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};