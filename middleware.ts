import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export function middleware() {
    // retrieve the current response
    const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}

export default authMiddleware({
  apiRoutes:["/api/:path*","/api/stores"],
  publicRoutes: ["/api/:path*","/api/stores"],
  
  // publicRoutes: "/api/550a06cf-d280-4fdd-a959-bcb66dfe60c8/categories"
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};