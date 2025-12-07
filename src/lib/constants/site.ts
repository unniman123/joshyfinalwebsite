// Site-wide constants for SEO and sharing metadata.
// Uses an overridable environment variable but falls back to the production hostname.
const DEFAULT_SITE_URL = 'https://keralatoursglobal.com';

const normalizeUrl = (value: string) => value.replace(/\/+$/, '');

export const SITE_URL = normalizeUrl(
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || DEFAULT_SITE_URL
);

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-header.png`;

export function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return normalizeUrl(pathOrUrl);
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

