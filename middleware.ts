import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

// Below routes are made protected with the help of the createRouteMatcher
// all the routes pass in array are now protected

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recording',
  '/personal-room',
  '/meeting(.*)'
])

export default clerkMiddleware((auth,req)=>{
  //if user wants to access the protected route then first they have to authenticate them self
  
  if(protectedRoute(req))auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};