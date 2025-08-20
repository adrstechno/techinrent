import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Target, ArrowRight } from "lucide-react";
import SEO from "@/components/service/SEO";
import { useLocation } from "wouter";
import Hero from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/HowItWorks";
import Pricing from "@/components/service/Pricing";
import Navbar from "@/components/layout/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/provider/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/layout/Footer";

export default function BuyLinkedInOnRent() {
  const [, setLocation] = useLocation();
  const userType = "taker";

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "LinkedIn Account Rental Service",
    description:
      "Buy LinkedIn accounts on rent for business outreach and lead generation.",
    brand: {
      "@type": "Brand",
      name: "TechInRent",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "50",
      highPrice: "500",
      offerCount: "1000+",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Instant Access",
      description: "Get immediate access to verified LinkedIn accounts.",
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "All accounts are verified and secure.",
    },
    {
      icon: Users,
      title: "Established Networks",
      description: "Accounts with thousands of industry-specific connections.",
    },
    {
      icon: Target,
      title: "Industry-Specific",
      description: "Target the right audience with specialized accounts.",
    },
  ];

  return (
    <div className="min-h-screen ">
      <SEO
        title="Buy LinkedIn on Rent - Verified Accounts for Lead Generation | TechInRent"
        description="Buy LinkedIn accounts on rent from TechInRent."
        keywords="buy linkedin on rent, linkedin accounts for rent"
        structuredData={seoData}
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <Navbar userType={userType} />
      </header>

      <main className="space-y-20 md:space-y-28 pb-20">
        {/* Hero Section */}
        <section className="pt-10 pb-5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
                LinkedIn Account Rental Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Buy LinkedIn on Rent
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Rent verified LinkedIn accounts with established networks and
                credibility for your business needs.
              </p>
            </motion.div>
            <Hero />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-6 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Buy LinkedIn Accounts on Rent?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Skip the years of building credibility and networks
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <div className="h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <benefit.icon className="h-10 w-10 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className=" px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <HowItWorks />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className=" px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Pricing />
          </div>
        </section>

        {/* Features Section */}
        <section className=" px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Features />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className=" px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Testimonials />
          </div>
        </section>

        {/* FAQ Section */}
        <section className=" px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FAQ />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
