import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/constants/site";

type TwitterCardType = "summary_large_image" | "summary";

interface SeoMetaProps {
  title: string;
  description: string;
  image?: string | null;
  url?: string;
  canonical?: string;
  type?: "website" | "article";
  twitterCard?: TwitterCardType;
  noIndex?: boolean;
}

const SeoMeta = ({
  title,
  description,
  image,
  url,
  canonical,
  type = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
}: SeoMetaProps) => {
  const resolvedImage = toAbsoluteUrl(image) || DEFAULT_OG_IMAGE;
  const resolvedUrl = toAbsoluteUrl(url || canonical);
  const canonicalHref = toAbsoluteUrl(canonical || url);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={resolvedImage} />
      {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};

export default SeoMeta;

