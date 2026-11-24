"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const SITE_ORIGIN = "https://crkveni-kalendar.net";

const STATIC_ROUTES = {
  "/slave/": "/app/slave/",
  "/molitvenik/": "/app/molitve/",
  "/hriscanski-post/": "/app/postovi/",
  "/zadusnice/": "/app/zadusnice/",
  "/imenoslov/": "/app/imenoslov/",
  "/meseceve-mene/": "/app/mesec/",
  "/praznici/": "/app/praznici/",
};

const PATTERN_ROUTES = [
  [/^\/molitvenik\/([^/]+)\/$/, (m) => `/app/molitve/${m[1]}/`],
  [/^\/praznici\/([^/]+)\/$/, (m) => `/app/praznici/${m[1]}/`],
  [/^\/info\/([^/]+)\/$/, (m) => `/app/info/${m[1]}/`],
  [/^\/(\d{4})\/([a-z]+)\/$/, (m) => `/app/kalendar/?g=${m[1]}&m=${m[2]}`],
  [/^\/(\d{4})\/$/, (m) => `/app/kalendar/?g=${m[1]}`],
];

// Vraca app putanju za link ka sajtu, ili null ako link nema app verziju.
export function toAppHref(href) {
  if (!href) return null;
  let url;
  try {
    url = new URL(href, SITE_ORIGIN);
  } catch {
    return null;
  }
  if (url.origin !== SITE_ORIGIN) return null;

  const path = url.pathname;
  if (path.startsWith("/app/")) return path + url.search;
  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path];
  for (const [regex, build] of PATTERN_ROUTES) {
    const match = path.match(regex);
    if (match) return build(match);
  }
  return null;
}

// onClick za kontejner sa HTML-om iz podataka: linkove ka sajtu vodi na app ekrane.
export function useInternalLinks() {
  const router = useRouter();
  return useCallback(
    (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;
      const target = toAppHref(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      router.push(target);
    },
    [router],
  );
}
