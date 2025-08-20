import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Users,
  Shield,
  TrendingUp,
  Star,
  Search,
  Filter,
  MapPin,
  Clock,
  Award,
  Globe,
  MessageSquare,
  DollarSign,
  BarChart3,
} from "lucide-react";
import SEO from "@/components/service/SEO";
import Logo from "@/components/service/Logo";
import { useLocation } from "wouter";

export default function LinkedInMarketplace() {
  const [, setLocation] = useLocation();

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Marketplace",
    name: "TechInRent LinkedIn Marketplace",
    description:
      "Comprehensive LinkedIn account marketplace for buying and renting verified LinkedIn profiles",
    url: "https://techinrent.com",
    provider: {
      "@type": "Organization",
      name: "TechInRent",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LinkedIn Account Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium LinkedIn Accounts",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sales Navigator Access",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industry-Specific Profiles",
          },
        },
      ],
    },
  };

  const marketplaceFeatures = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Filter accounts by connections, premium status, and more filters",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All accounts are verified for authenticity and security",
    },
    {
      icon: Filter,
      title: "Custom Filters",
      description:
        "Find accounts by connection count, industry, and geographic location",
    },
    {
      icon: Star,
      title: "Premium Accounts",
      description:
        "Access high-value accounts with Sales Navigator and InMail features",
    },
  ];

  const accountCategories = [
    {
      category: "Basic",
      description: "Entry-level LinkedIn accounts for basic networking needs",
      count: "500+ Accounts",
      price: "$50-100/month",
      features: ["1+ Years Account Age", "Industry-Specific", "Basic Features"],
    },
    {
      category: "Professional",
      description: "Premium accounts for advanced networking and outreach",
      count: "300+ Accounts",
      price: "$150-300/month",
      features: ["2+ Years Account Age", "InMail Credits", "Advanced Search"],
    },
    {
      category: "Enterprise",
      description:
        "High-value accounts with Sales Navigator for lead generation",
      count: "100+ Accounts",
      price: "$400-500/month",
      features: ["3+ Years Account Age", "Sales Navigator", "Lead Generation"],
    },
    {
      category: "Specialized",
      description: "Tailored accounts for niche industries and roles",
      count: "200+ Accounts",
      price: "$200-400/month",
      features: [
        "Relevant Experience",
        "Established Credibility",
        "Industry Focus",
      ],
    },
  ];

  const popularIndustries = [
    "Technology & Software",
    "Healthcare & Medical",
    "Finance & Banking",
    "Real Estate",
    "Marketing & Advertising",
    "Consulting",
    "Manufacturing",
    "Education",
    "Legal Services",
    "Construction",
    "Retail & E-commerce",
    "Energy & Utilities",
  ];

  const marketplaceStats = [
    { icon: Users, number: "10,000+", label: "Active Accounts" },
    { icon: Globe, number: "50+", label: "Countries Served" },
    { icon: BarChart3, number: "1M+", label: "Connections Available" },
    { icon: Award, number: "4.9/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEO
        title="LinkedIn Marketplace - Professional Account Rental Platform | TechInRent"
        description="Browse TechInRent's comprehensive LinkedIn marketplace. Find verified LinkedIn accounts for rent across all industries. Premium, Sales Navigator, and industry-specific profiles available."
        keywords="linkedin marketplace, linkedin account marketplace, professional networking marketplace, social media account rental marketplace, linkedin profile marketplace, verified linkedin accounts, linkedin sales navigator marketplace, premium linkedin accounts, business networking platform, social selling marketplace, b2b networking platform, linkedin account catalog, professional profile rental, linkedin service marketplace, social media marketplace, networking account rental, linkedin business marketplace, professional account platform, social media rental platform, linkedin account directory"
        structuredData={seoData}
      />
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setLocation("/")}>
              Home
            </Button>
            <Button onClick={() => window.history.back()}>Return</Button>
          </div>
        </div>
      </header>
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="mr-2 h-4 w-4" />
              #1 LinkedIn Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover the Largest LinkedIn Account Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Browse thousands of verified profiles across all industries, from
              premium accounts to Sales Navigator access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLocation("/home")}
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Marketplace
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setLocation("/provider-signup")}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                List Your Account
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Marketplace Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketplaceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow p-6">
                  <CardContent>
                    <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Account Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {accountCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl mb-2">
                        {category.category}
                      </CardTitle>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {category.price}
                    </div>
                    <ul className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setLocation("/home")}
                    >
                      Browse {category.category}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Industries
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularIndustries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <p className="font-medium text-sm text-center">{industry}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Marketplace Statistics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketplaceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Whether you're looking to rent or provide accounts, TechInRent has
            everything you need
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setLocation("/home")}
            >
              <Search className="mr-2 h-5 w-5" />
              Start Browsing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => setLocation("/provider-signup")}
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Become a Provider
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
