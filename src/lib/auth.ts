import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
 
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		apple: {
			clientId: process.env.APPLE_CLIENT_ID || "",
			clientSecret: process.env.APPLE_CLIENT_SECRET || "",
		},
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID || "",
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
		},
	},
	plugins: [bearer()]
});

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}