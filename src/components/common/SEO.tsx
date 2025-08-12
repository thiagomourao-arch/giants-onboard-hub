import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const url = canonical || (typeof window !== "undefined" ? window.location.href : undefined);
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />} 
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
}
