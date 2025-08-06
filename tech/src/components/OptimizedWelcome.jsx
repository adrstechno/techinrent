import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { ServiceStructuredData, FAQStructuredData } from "@/components/ServiceSchema";
import { LogIn } from "lucide-react";

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
          "target": "https://techinrent.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://techinrent.com/#organization"
        },
        "mainEntity": {
          "@type": "Service",
          "@id": "https://techinrent.com/#linkedin-connections-service"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://techinrent.com/#organization",
        "name": "Tech in Rent",
        "url": "https://techinrent.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://techinrent.com/tech-in-rent-logo.png",
          "width": 400,
          "height": 200
        },
        "description": "Premium LinkedIn services platform offering connection purchasing and account rental for enhanced networking and business growth.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "English"
        },
        "areaServed": "Worldwide",
        "serviceType": "LinkedIn Services and Account Rental"
      },
      {
        "@type": "Service",
        "@id": "https://techinrent.com/#linkedin-connections-service",
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

      {/* Login & Register Buttons - Top Right */}
      {/* <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Button
          onClick={() => setLocation("/login")}
          variant="outline"
          className="bg-white/90 hover:bg-white border-white/50 text-slate-800 hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </div> */}
      
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" style={{animationDuration: '20s'}} />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-teal-400 to-emerald-300 opacity-20 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-violet-400 to-purple-300 opacity-30 animate-bounce" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8 md:py-16 text-center flex flex-col items-center justify-center min-h-screen safe-area-inset">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300 relative group motion-reduce-mobile">
          {/* Sophisticated glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-cyan-400/40 via-teal-400/40 to-emerald-400/40 rounded-full blur-2xl animate-pulse md:blur-3xl"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-violet-400/25 via-purple-400/25 via-indigo-400/25 to-blue-400/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-0 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500"></div>
          <div className="relative z-10 drop-shadow-xl md:drop-shadow-2xl">
            <Logo size="lg" animated={true} />
          </div>
          {/* Reduced particles on mobile for performance */}
          <div className="hidden md:block absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="hidden md:block absolute top-10 right-10 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-5 left-5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="mb-12 w-full flex flex-col items-center space-y-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent text-center leading-tight max-w-5xl tracking-tight">
            Buy Real LinkedIn Connections
          </h1>
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-white font-semibold tracking-normal">
              Starting at Just $2 for 25 Connections
            </h2>
            <p className="font-body text-lg sm:text-xl text-white/90 font-normal leading-relaxed tracking-normal">
              No login required • 24-48hr delivery • 100% safe process • Real human connections
            </p>
          </div>
        </div>

        {/* Main Action Button - Focused on Connection Buying */}
        <div className="w-full flex justify-center mb-12 max-w-2xl mx-auto px-4">
          <Button
            onClick={() => setLocation('/buy-connections')}
            className="group w-full h-auto min-h-[100px] bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 active:scale-95 text-white flex flex-col items-center justify-center px-8 py-8 transform hover:scale-105 transition-all duration-200 shadow-2xl border-2 border-white/30 rounded-2xl backdrop-blur-sm touch-manipulation"
          >
            <div className="font-heading text-2xl font-bold mb-3 text-center tracking-tight">🚀 Buy LinkedIn Connections Now</div>
            <div className="font-body text-sm font-normal text-center leading-relaxed opacity-95 tracking-normal">
              25 connections for $2 • Fast delivery • No login needed
            </div>
          </Button>
        </div>

        {/* Secondary Options */}
        <div className="w-full flex flex-col gap-5 sm:flex-row sm:gap-6 justify-center items-center mb-8 max-w-3xl mx-auto px-4">
          <Button
            onClick={() => handleUserTypeSelect('taker')}
            className="group w-full sm:flex-1 h-auto min-h-[80px] bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 active:scale-95 text-white flex flex-col items-center justify-center px-6 py-4 transform hover:scale-105 transition-all duration-200 shadow-xl border border-white/30 rounded-xl backdrop-blur-sm touch-manipulation"
          >
            <div className="font-heading text-lg font-semibold mb-2 text-center tracking-normal">🔗 Rent LinkedIn Accounts</div>
            <div className="font-body text-xs font-normal text-center opacity-95 tracking-normal">Access verified accounts</div>
          </Button>
          <Button
            onClick={() => handleUserTypeSelect('provider')}
            className="group w-full sm:flex-1 h-auto min-h-[80px] bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 hover:from-green-600 hover:via-emerald-600 hover:to-cyan-600 active:scale-95 text-white flex flex-col items-center justify-center px-6 py-4 transform hover:scale-105 transition-all duration-200 shadow-xl border border-white/30 rounded-xl backdrop-blur-sm touch-manipulation"
          >
            <div className="font-heading text-lg font-semibold mb-2 text-center tracking-normal">💰 Earn Money</div>
            <div className="font-body text-xs font-normal text-center opacity-95 tracking-normal">Monetize your LinkedIn</div>
          </Button>
        </div>

        {/* Admin Login Button */}
        <div className="w-full flex justify-center mb-12 max-w-md mx-auto px-4">
          <Button
            onClick={() => setLocation('/login')}
            className="group w-full h-auto min-h-[60px] bg-gradient-to-r from-slate-600 via-gray-600 to-slate-700 hover:from-slate-700 hover:via-gray-700 hover:to-slate-800 active:scale-95 text-white flex items-center justify-center px-6 py-4 transform hover:scale-105 transition-all duration-200 shadow-xl border border-white/30 rounded-xl backdrop-blur-sm touch-manipulation"
          >
            <LogIn className="mr-3 h-5 w-5" />
            <div className="font-heading text-lg font-semibold text-center tracking-normal">🔐 Admin Login</div>
          </Button>
        </div>

        {/* Quick stats - Perfect Fit */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mb-8 sm:mb-10 px-4">
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-2xl p-5 sm:p-6 transform hover:scale-105 transition-all duration-200 border border-white/20 touch-manipulation">
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-2 tracking-tight">1000+</div>
            <div className="font-heading text-white font-semibold text-sm sm:text-base tracking-normal">🔥 Verified Accounts</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-2xl p-5 sm:p-6 transform hover:scale-105 transition-all duration-200 border border-white/20 touch-manipulation">
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-green-300 mb-2 tracking-tight">500+</div>
            <div className="font-heading text-white font-semibold text-sm sm:text-base tracking-normal">⭐ Active Providers</div>
          </div>
          <div className="text-center bg-white/15 backdrop-blur-sm rounded-2xl p-5 sm:p-6 transform hover:scale-105 transition-all duration-200 border border-white/20 touch-manipulation">
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-orange-300 mb-2 tracking-tight">24/7</div>
            <div className="font-heading text-white font-semibold text-sm sm:text-base tracking-normal">🚀 Support Available</div>
          </div>
        </div>

        {/* Professional Content Section */}
        <div className="max-w-7xl mx-auto space-y-12 px-4">
          <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/40">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-8 text-center tracking-tight">🚀 LinkedIn Growth Services by TechInRent</h2>
            <p className="font-body text-gray-700 mb-10 text-lg leading-relaxed text-center max-w-4xl mx-auto tracking-normal">
              At TechInRent, we empower professionals, businesses, and agencies to grow and scale faster on LinkedIn — the world's #1 B2B social network. 
              Whether you're building authority, generating leads, or expanding your digital footprint, our LinkedIn growth services are designed to give you an edge — fast, safe, and hassle-free.
            </p>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-heading text-xl font-bold text-blue-700 mb-6 tracking-tight">🔗 LinkedIn Connection Boost</h3>
                <p className="text-gray-700 mb-6 font-medium leading-relaxed">Buy Real LinkedIn Connections - Increase your visibility and credibility on LinkedIn with targeted, real connections.</p>
                <ul className="text-gray-700 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">✅</span>
                    <span>No login required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">✅</span>
                    <span>Only profile URL is needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">✅</span>
                    <span>100% safe – no risk to your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">✅</span>
                    <span>Tailored to your industry or region</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-heading text-xl font-bold text-green-700 mb-6 tracking-tight">⚡ LinkedIn Auto-Growth</h3>
                <p className="text-gray-700 mb-6 font-medium leading-relaxed">Organic Growth, On Autopilot - Your LinkedIn profile grows consistently with daily connections and strategic visibility.</p>
                <ul className="text-gray-700 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">🔹</span>
                    <span>Connects with decision-makers and professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">🔹</span>
                    <span>Drives inbound interest and profile views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">🔹</span>
                    <span>Enhances profile reputation over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">🔹</span>
                    <span>All managed by our expert growth team</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-heading text-xl font-bold text-purple-700 mb-6 tracking-tight">📈 LinkedIn Followers</h3>
                <p className="text-gray-700 mb-6 font-medium leading-relaxed">Build Instant Authority - Increase your follower count organically, giving your brand the social proof it needs.</p>
                <ul className="text-gray-700 space-y-3 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">🔥</span>
                    <span>Instant trust boost for profile visitors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">🔥</span>
                    <span>Gain credibility in your field</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">🔥</span>
                    <span>Suitable for entrepreneurs and thought leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">🔥</span>
                    <span> Illustrations by Storyset
Discreet and secure – no account access needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/40">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text mb-12 text-center tracking-tight">💡 Why Choose TechInRent?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">🔐</div>
                <h3 className="font-heading text-lg font-bold text-blue-700 mb-4 tracking-tight">No Passwords Needed</h3>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">We never ask for your LinkedIn login. Just share your profile URL — that's it.</p>
              </div>
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">🛡️</div>
                <h3 className="font-heading text-lg font-bold text-green-700 mb-4 tracking-tight">Secure & Compliant</h3>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">We respect privacy and follow best practices with real growth from real people.</p>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">🔧</div>
                <h3 className="font-heading text-lg font-bold text-purple-700 mb-4 tracking-tight">24/7 Support</h3>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">Dedicated team ready to assist you anytime with scalable plans for individuals and teams.</p>
              </div>
              <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">📈</div>
                <h3 className="font-heading text-lg font-bold text-orange-700 mb-4 tracking-tight">Real Growth</h3>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">Connect with genuine, relevant professionals to build authentic authority in your field.</p>
              </div>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text mb-12 text-center tracking-tight">⚡ How LinkedIn Services Work</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="font-heading text-xl font-bold text-cyan-700 mb-4 tracking-tight">🎯 Share Profile URL</h3>
                <p className="text-gray-700 font-medium leading-relaxed">Simply provide your public LinkedIn profile URL - no login credentials or passwords required for any service!</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="font-heading text-xl font-bold text-green-700 mb-4 tracking-tight">🔒 Secure Processing</h3>
                <p className="text-gray-700 font-medium leading-relaxed">Our expert team begins connecting you with real, verified professionals matching your industry and target audience!</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">3</div>
                <h3 className="font-heading text-xl font-bold text-purple-700 mb-4 tracking-tight">🚀 Grow Together</h3>
                <p className="text-gray-700 font-medium leading-relaxed">Watch your LinkedIn presence grow with authentic connections, increased visibility, and enhanced professional credibility!</p>
              </div>
            </div>
          </div>

          {/* SEO Content - Hidden but indexed by search engines */}
          <div className="sr-only">
            <h2>TechInRent - Tech in Rent LinkedIn Account Rental Platform</h2>
            <p>TechInRent.com is the world's #1 LinkedIn account rental service. Tech in Rent provides verified LinkedIn accounts for businesses to scale their outreach. TechInRent connects ambitious companies with LinkedIn powerhouses through our secure marketplace.</p>
            <h3>About TechInRent - Tech in Rent Services</h3>
            <p>TechInRent (Tech in Rent) offers premium LinkedIn services including account rentals, connection building, and lead generation. Our TechInRent platform empowers businesses and LinkedIn account owners to maximize their LinkedIn potential.</p>
            <h3>TechInRent Features - Tech in Rent Benefits</h3>
            <p>TechInRent provides military-grade security for LinkedIn account rentals. Tech in Rent offers verified accounts with massive networks. TechInRent enables explosive LinkedIn outreach campaigns with sky-high engagement rates.</p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/40">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-8 text-center tracking-tight">💬 Let's Grow Together</h2>
            <div className="text-center mb-10">
              <p className="text-lg text-gray-700 font-medium">Ready to grow your LinkedIn presence effortlessly?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">📧</div>
                <h3 className="font-heading text-lg font-bold text-blue-700 mb-3 tracking-tight">Email Support</h3>
                <p className="text-gray-700 text-sm font-medium break-all">vibhanshu@techinrent.com</p>
              </div>
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">📱</div>
                <h3 className="font-heading text-lg font-bold text-green-700 mb-3 tracking-tight">WhatsApp</h3>
                <p className="text-gray-700 text-sm font-medium">+91-7898711748</p>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">📲</div>
                <h3 className="font-heading text-lg font-bold text-purple-700 mb-3 tracking-tight">Telegram</h3>
                <p className="text-gray-700 text-sm font-medium">t.me/Techinrentlinkedin</p>
              </div>
              <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">🐦</div>
                <h3 className="font-heading text-lg font-bold text-orange-700 mb-3 tracking-tight">Twitter/X</h3>
                <p className="text-gray-700 text-sm font-medium">@techinrent</p>
              </div>
              <div className="text-center bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200 hover:scale-105 transition-transform duration-200">
                <a href="https://www.instagram.com/techinrent/" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-xl">📷</div>
                  <h3 className="font-heading text-lg font-bold text-pink-700 mb-3 tracking-tight">Instagram</h3>
                  <p className="text-gray-700 text-sm font-medium">@techinrent</p>
                </a>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="font-body text-xl font-semibold text-purple-700 tracking-normal">
                Your LinkedIn Success Partner - Available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}