// Simple helper to build responsive image srcset entries for a base image path
// Assumes images are available at the same path with suffixes like -480w.webp, -800w.webp
export function buildSrcSet(basePath: string, widths: number[] = [480, 800, 1200], format = 'webp') {
  // basePath is expected to be a string like '/assets/hero.jpg' or imported asset path
  // We'll replace the extension with the generated ones. If basePath contains query params, keep them.
  const url = basePath.split('?')[0];
  const params = basePath.includes('?') ? '?' + basePath.split('?').slice(1).join('?') : '';

  const lastDot = url.lastIndexOf('.');
  if (lastDot === -1) return '';

  const prefix = url.substring(0, lastDot);

  return widths.map((w) => `${prefix}-${w}w.${format}${params} ${w}w`).join(', ');
}


