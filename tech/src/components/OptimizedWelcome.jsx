import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { ServiceStructuredData, FAQStructuredData } from "@/components/ServiceSchema";

export default function OptimizedWelcome() {
  const [, setLocation] = useLocation();

  const handleUserTypeSelect = (type) => {
    localStorage.setItem('userType', type);
    if (type === 'taker') {
      setLocation("/buy-linkedin-on-rent");
    } else {
      setLocation("/earn-money-linkedin");
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://techinrent.com/#website",
        "name": "TechInRent - Buy Real LinkedIn Connections Starting $2",
        "url": "https://techinrent.com",
        "description": "Buy real LinkedIn connections from $2 at TechInRent. No login required, 24-48hr delivery, 100% safe process. Get verified human connections with crypto payment options.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://techinrent.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://techinrent.com/#organization"
        },
        "mainEntity": {
          "@type": "Service",
          "@id": "https://techinrent.com/#service"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://techinrent.com/#organization",
        "name": "Tech in Rent",
        "url": "https://techinrent.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://techinrent.com/logo.png",
          "width": 400,
          "height": 200
        },
        "description": "Premium LinkedIn services platform offering connection purchasing and account rental for enhanced networking and business growth.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "vibhanshu@techinrent.com",
          "availableLanguage": "English"
        },
        "areaServed": "Worldwide",
        "serviceType": "LinkedIn Services and Account Rental"
      },
      {
        "@type": "Service",
        "@id": "https://techinrent.com/#service",
        "name": "Buy Real LinkedIn Connections",
        "provider": {
          "@type": "Organization",
          "@id": "https://techinrent.com/#organization"
        },
        "description": "Buy real LinkedIn connections starting at $2. No login required, 24-48hr delivery, 100% safe process with verified human connections.",
        "areaServed": "Worldwide",
        "category": "LinkedIn Growth Service",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "LinkedIn Connection Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "25 LinkedIn Connections",
              "price": "2",
              "priceCurrency": "USD",
              "itemOffered": {
                "@type": "Service",
                "name": "LinkedIn Connection Package - 25 Connections"
              },
              "availability": "InStock"
            },
            {
              "@type": "Offer",
              "name": "100 LinkedIn Connections",
              "price": "7",
              "priceCurrency": "USD",
              "itemOffered": {
                "@type": "Service",
                "name": "LinkedIn Connection Package - 100 Connections"
              },
              "availability": "InStock"
            },
            {
              "@type": "Offer",
              "name": "500 LinkedIn Connections",
              "price": "25",
              "priceCurrency": "USD",
              "itemOffered": {
                "@type": "Service",
                "name": "LinkedIn Connection Package - 500 Connections"
              },
              "availability": "InStock"
            }
          ]
        },
        "serviceOutput": "Real human LinkedIn connections",
        "hoursAvailable": "24/7",
        "deliveryTime": "24-48 hours"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-violet-800 to-purple-800 relative overflow-hidden mobile-scroll-optimize">
      <SEO
        title="Buy Real LinkedIn Connections Starting $2 - TechInRent | LinkedIn Growth Service"
        description="Buy real LinkedIn connections from $2. TechInRent offers verified LinkedIn growth services. No login required, 24-48hr delivery, 100% safe process. Get authentic human connections instantly with crypto payment options."
        keywords="buy linkedin connections, real linkedin connections, linkedin connections $2, linkedin growth service, techinrent, tech in rent, linkedin connection service, verified linkedin connections, buy connections linkedin, linkedin marketing service, authentic linkedin connections, linkedin networking service, instant linkedin connections, safe linkedin growth"
        structuredData={websiteStructuredData}
      />
      <ServiceStructuredData />
      <FAQStructuredData />
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" />
      </div>
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8 text-center">
        <Logo size="lg" className="mx-auto mb-6" />
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Grow Your LinkedIn Network with TechInRent
        </h1>
        <h2 className="font-heading text-xl sm:text-2xl text-blue-200 mb-8 leading-relaxed">
          Buy Real Connections from $2 or Monetize Your LinkedIn Profile
        </h2>
        <Button
          onClick={() => setLocation('/buy-connections')}
          className="group w-full sm:w-auto h-auto min-h-[100px] bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg"
        >
          🚀 Buy LinkedIn Connections Now
          <div className="font-body text-sm font-normal text-center leading-relaxed opacity-95 tracking-normal mt-2">
            25 connections for $2 • Fast delivery • No login needed
          </div>
        </Button>
      </header>
      {/* Secondary Options */}
      <section className="container mx-auto px-4 py-12">
        <div className="w-full flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-8">
          <Button
            onClick={() => handleUserTypeSelect('taker')}
            className="group w-full sm:w-80 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg"
          >
            🔗 Rent LinkedIn Accounts
            <div className="font-body text-xs font-normal text-center opacity-95 tracking-normal mt-2">
              Access verified accounts
            </div>
          </Button>
          <Button
            onClick={() => handleUserTypeSelect('provider')}
            className="group w-full sm:w-80 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg"
          >
            💰 Earn Money
            <div className="font-body text-xs font-normal text-center opacity-95 tracking-normal mt-2">
              Monetize your LinkedIn
            </div>
          </Button>
        </div>
      </section>
      {/* Quick Stats - Perfect Fit */}
      <section className="container mx-auto px-4 py-12">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl p-8 text-center">
            🔐
            <h3 className="font-heading text-lg font-bold text-blue-700 mb-4 tracking-tight">
              No Passwords Needed
            </h3>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              We never ask for your LinkedIn login. Just share your profile URL — that's it.
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:border-green-300">
            🛡️
            <h3 className="font-heading text-lg font-bold text-green-700 mb-4 tracking-tight">
              Secure & Compliant
            </h3>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              We respect privacy and follow best practices with real growth from real people.
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 hover:border-purple-300">
            🔧
            <h3 className="font-heading text-lg font-bold text-purple-700 mb-4 tracking-tight">
              24/7 Support
            </h3>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              Dedicated team ready to assist you anytime with scalable plans for individuals and teams.
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200 hover:border-orange-300">
            📈
            <h3 className="font-heading text-lg font-bold text-orange-700 mb-4 tracking-tight">
              Real Growth
            </h3>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              Connect with genuine, relevant professionals to build authentic authority in your field.
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Our LinkedIn Growth Services
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl p-8">
            <h3 className="font-heading text-xl font-bold text-blue-700 mb-4 tracking-tight">
              🔗 LinkedIn Connection Boost
            </h3>
            <p className="text-gray-700 mb-6 font-medium leading-relaxed">
              Buy Real LinkedIn Connections - Increase your visibility and credibility on LinkedIn with targeted, real connections.
            </p>
            <ul className="text-gray-700 space-y-3 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✅</span>
                No login required
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✅</span>
                Only profile URL is needed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✅</span>
                100% safe – no risk to your account
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">✅</span>
                Tailored to your industry or region
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:border-green-300">
            <h3 className="font-heading text-xl font-bold text-green-700 mb-4 tracking-tight">
              ⚡ LinkedIn Auto-Growth
            </h3>
            <p className="text-gray-700 mb-6 font-medium leading-relaxed">
              Organic Growth, On Autopilot - Your LinkedIn profile grows consistently with daily connections and strategic visibility.
            </p>
            <ul className="text-gray-700 space-y-3 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">🔹</span>
                Connects with decision-makers and professionals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">🔹</span>
                Drives inbound interest and profile views
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">🔹</span>
                Enhances profile reputation over time
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">🔹</span>
                All managed by our expert growth team
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 hover:border-purple-300">
            <h3 className="font-heading text-xl font-bold text-purple-700 mb-4 tracking-tight">
              📈 LinkedIn Followers
            </h3>
            <p className="text-gray-700 mb-6 font-medium leading-relaxed">
              Build Instant Authority - Increase your follower count organically, giving your brand the social proof it needs.
            </p>
            <ul className="text-gray-700 space-y-3 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">🔥</span>
                Instant trust boost for profile visitors
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">🔥</span>
                Gain credibility in your field
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">🔥</span>
                Suitable for entrepreneurs and thought leaders
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-1">🔥</span>
                Discreet and secure – no account access needed
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="font-heading text-lg font-bold text-cyan-700 mb-4 tracking-tight">
              Share Profile URL
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed">
              Simply provide your public LinkedIn profile URL - no login credentials or passwords required for any service
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h3 className="font-heading text-lg font-bold text-green-700 mb-4 tracking-tight">
              Secure Processing
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed">
              Our expert team begins connecting you with real, verified professionals matching your industry and target audience
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 className="font-heading text-lg font-bold text-purple-700 mb-4 tracking-tight">
              Grow Together
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed">
              Watch your LinkedIn presence grow with authentic connections, increased visibility, and enhanced professional credibility
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Get in Touch
        </h2>
        <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl p-8 text-center">
          <p className="text-lg text-gray-700 font-medium mb-6">
            Ready to grow your LinkedIn presence effortlessly?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:border-green-300">
              📧
              <h3 className="font-heading text-lg font-bold text-green-700 mb-3 tracking-tight">
                Email Support
              </h3>
              <p className="text-gray-700 text-sm font-medium break-all">
                vibhanshu@techinrent.com
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-300">
              📱
              <h3 className="font-heading text-lg font-bold text-blue-700 mb-3 tracking-tight">
                WhatsApp
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                +91-7898711748
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-300">
              📲
              <h3 className="font-heading text-lg font-bold text-purple-700 mb-3 tracking-tight">
                Telegram
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                t.me/Techinrentlinkedin
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:border-orange-300">
              🐦
              <h3 className="font-heading text-lg font-bold text-orange-700 mb-3 tracking-tight">
                Twitter/X
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                @techinrent
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200 hover:border-pink-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">
                📷
              </div>
              <h3 className="font-heading text-lg font-bold text-pink-700 mb-3 tracking-tight">
                Instagram
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                @techinrent
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="font-body text-xl font-semibold text-purple-700 tracking-normal">
              Your LinkedIn Success Partner - Available 24/7
            </p>
          </div>
        </div>
      </section>
      {/* SEO Content - Hidden but indexed by search engines */}
      <div className="sr-only">
        TechInRent - Tech in Rent LinkedIn Account Rental Platform
        TechInRent.com is the world's #1 LinkedIn account rental service. Tech in Rent provides verified LinkedIn accounts for businesses to scale their outreach. TechInRent connects ambitious companies with LinkedIn powerhouses through our secure marketplace.
        About TechInRent - Tech in Rent Services
        TechInRent (Tech in Rent) offers premium LinkedIn services including account rentals, connection building, and lead generation. Our TechInRent platform empowers businesses and LinkedIn account owners to maximize their LinkedIn potential.
        TechInRent Features - Tech in Rent Benefits
        TechInRent provides military-grade security for LinkedIn account rentals. Tech in Rent offers verified accounts with massive networks. TechInRent enables explosive LinkedIn outreach campaigns with sky-high engagement rates.
      </div>
    </div>
  );
}