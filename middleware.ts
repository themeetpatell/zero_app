import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_MARKETING_HOSTS = ["zerohuman.co", "www.zerohuman.co"];
const DEFAULT_DASHBOARD_HOSTS = ["make.zerohuman.co"];

const parseHostnames = (value: string | undefined, fallback: string[]) =>
  (value ? value.split(",") : fallback)
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

const marketingHosts = parseHostnames(
  process.env.MARKETING_HOSTNAMES,
  DEFAULT_MARKETING_HOSTS
);
const dashboardHosts = parseHostnames(
  process.env.DASHBOARD_HOSTNAMES,
  DEFAULT_DASHBOARD_HOSTS
);

const marketingHostSet = new Set(marketingHosts);
const dashboardHostSet = new Set(dashboardHosts);

const primaryMarketingHost = marketingHosts[0];
const primaryDashboardHost = dashboardHosts[0];

const isDashboardRoute = (pathname: string) =>
  pathname.startsWith("/dashboard") || pathname.startsWith("/signin");

const staysOnDashboardDomain = (pathname: string) =>
  isDashboardRoute(pathname) || pathname.startsWith("/api");

const isPublicAsset = (pathname: string) =>
  pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname);

const getHostname = (request: NextRequest) => {
  const host = request.headers.get("host") || "";
  return host.split(":")[0]?.toLowerCase();
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const hostname = getHostname(request);
  const onDashboardDomain = dashboardHostSet.has(hostname);
  const onMarketingDomain = marketingHostSet.has(hostname);

  if (onDashboardDomain) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url, 308);
    }

    if (!staysOnDashboardDomain(pathname) && primaryMarketingHost) {
      const url = request.nextUrl.clone();
      url.hostname = primaryMarketingHost;
      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  if (onMarketingDomain && isDashboardRoute(pathname) && primaryDashboardHost) {
    const url = request.nextUrl.clone();
    url.hostname = primaryDashboardHost;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
};
