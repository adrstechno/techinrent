/**
 * SchemaOrg component for adding structured data to pages
 * This improves SEO by providing search engines with detailed information about the content
 */
export default function SchemaOrg({ type, data }) {
  let schemaData = {};

  if (type === 'WebSite') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TechInRent - LinkedIn Account Rental Platform",
      "url": "https://techinrent.com",
      "description": "Rent verified LinkedIn accounts for business outreach or earn money providing your account.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://techinrent.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === 'Organization') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TechInRent",
      "url": "https://techinrent.com",
      "description": "Professional LinkedIn account rental service connecting verified account providers with business clients.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+917898711748",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://linkedin.com/company/techinrent",
        "https://twitter.com/techinrent"
      ]
    };
  } else if (type === 'Product' && data) {
    const account = data;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${account.type} LinkedIn Account - ${account.industry}`,
      "description": `${account.type} LinkedIn account with ${account.connections} connections, ${account.accountAge} years old, and SSI score of ${account.ssiScore}.`,
      "image": account.imageUrl || "",
      "brand": {
        "@type": "Brand",
        "name": "TechInRent"
      },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": account.dailyPrice,
        "highPrice": account.monthlyPrice,
        "priceCurrency": "USD",
        "offerCount": 3,
        "offers": [
          {
            "@type": "Offer",
            "name": "Daily",
            "price": account.dailyPrice,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Weekly",
            "price": account.weeklyPrice,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Monthly",
            "price": account.monthlyPrice,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": account.reviewScore,
        "reviewCount": account.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  } else if (type === 'Service') {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "LinkedIn Account Rental Service",
      "serviceType": "Account Rental",
      "provider": {
        "@type": "Organization",
        "name": "TechInRent",
        "url": "https://techinrent.com"
      },
      "description": "Professional LinkedIn account rental service with verified profiles for business outreach and networking.",
      "areaServed": {
        "@type": "Country",
        "name": "Global"
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}