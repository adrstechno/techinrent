import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = "Tech in Rent - Premium LinkedIn Account Rental | Earn $500+ Monthly",
  description = "Join 1000+ verified LinkedIn account providers on Tech in Rent. Rent premium LinkedIn profiles for business growth or earn $500+ monthly income. Secure, trusted, 24/7 support.",
  keywords = "tech in rent, linkedin account rental, linkedin outreach, b2b prospecting, earn money linkedin, linkedin profile rental, verified linkedin accounts, passive income, professional networking, linkedin automation, social media rental, monthly income linkedin",
  image = "/tech-in-rent-logo.png",
  url,
  type = "website",
  publishedAt,
  updatedAt,
  author = "Tech in Rent",
  section,
  locale = "en_US",
  siteName = "Tech in Rent",
  twitterHandle = "@techinrent",
  canonicalUrl,
  structuredData,
  noIndex = false
}) {
  // Get current URL if not provided
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const baseUrl = 'https://techinrent.com';
  const cleanCanonicalUrl = canonicalUrl || currentUrl;
  const finalCanonicalUrl = cleanCanonicalUrl.endsWith('/') && cleanCanonicalUrl !== baseUrl + '/'
    ? cleanCanonicalUrl.slice(0, -1)
    : cleanCanonicalUrl;

  // Format the image URL to be absolute
  const absoluteImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Viewport and mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-title" content="Tech in Rent" />

      {/* Performance and loading optimization */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Robots and indexing */}
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
      <meta name="bingbot" content={noIndex ? "noindex,nofollow" : "index,follow"} />

      {/* Enhanced SEO tags */}
      <meta name="application-name" content="Tech in Rent" />
      <meta name="msapplication-tooltip" content="Tech in Rent - Premium LinkedIn Account Rental" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />

      {/* Language and locale */}
      <meta property="og:locale" content={locale} />
      <meta httpEquiv="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href={currentUrl} />

      {/* Geo targeting */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.position" content="37.7749;-122.4194" />
      <meta name="ICBM" content="37.7749, -122.4194" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Article specific tags */}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' && publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {type === 'article' && updatedAt && <meta property="article:modified_time" content={updatedAt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="TechInRent" />

      {/* Additional performance and SEO hints */}
      <link rel="preconnect" href="https://api.techinrent.com" />
      <link rel="preconnect" href="https://cdn.techinrent.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://analytics.google.com" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
