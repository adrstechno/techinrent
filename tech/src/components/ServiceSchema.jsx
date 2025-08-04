export const ServiceStructuredData = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Real LinkedIn Connections",
    "description": "Buy real LinkedIn connections starting at $2. No login required, 24-48hr delivery, 100% safe process with verified human connections.",
    "brand": {
      "@type": "Brand",
      "name": "TechInRent"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "2",
      "highPrice": "55",
      "offerCount": "8",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "TechInRent",
        "url": "https://techinrent.com"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127"
    },
    "category": "LinkedIn Growth Service",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "B2B Professionals"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
};

export const FAQStructuredData = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much do LinkedIn connections cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LinkedIn connections start at just $2 for 25 connections. We offer packages from 25 connections ($2) to 10,000 connections ($55) with bulk discounts available."
        }
      },
      {
        "@type": "Question",
        "name": "Is buying LinkedIn connections safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our service is 100% safe. We never ask for your login credentials - only your public LinkedIn profile URL. All connections are from real, verified human accounts."
        }
      },
      {
        "@type": "Question",
        "name": "How fast will I receive my LinkedIn connections?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LinkedIn connections are delivered within 24-48 hours of order completion. We process orders manually to ensure safety and quality."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept cryptocurrency payments including TRC-20 USDT, BEP-20 USDT, and Binance Pay for secure and fast transactions."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};