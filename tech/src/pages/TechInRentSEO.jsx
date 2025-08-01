import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Users,
  Target,
  TrendingUp,
  Shield,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  BarChart3,
  Globe,
  Award,
  DollarSign,
  Network
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";
export default function TechInRentSEO() {
  const [, setLocation] = useLocation();
  const seoData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TechInRent",
    "alternateName": ["TechInRent.com", "Tech In Rent"],
    "url": "https://techinrent.com",
    "logo": "https://techinrent.com/logo.png",
    "description": "TechInRent.com is the leading LinkedIn renting service platform offering LinkedIn account rental, real connections, and lead generation services worldwide.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Vibhanshu Mishra"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+917898711748",
      "email": "vibhanshu@techinrent.com",
      "contactType": "customer service",
      "availableLanguage": ["English"],
      "serviceArea": "Worldwide"
    },
    "sameAs": [
      "https://linkedin.com/company/techinrent",
      "https://twitter.com/techinrent"
    ],
    "serviceArea": "Worldwide",
    "knowsAbout": [
      "LinkedIn Account Rental",
      "LinkedIn Services",
      "Social Media Marketing",
      "B2B Lead Generation",
      "Professional Networking",
      "LinkedIn Automation",
      "Sales Prospecting"
    ],
    "makesOffer": [
      {
        "@type": "Service",
        "name": "LinkedIn Account Rental Service",
        "description": "Rent verified LinkedIn accounts with established networks for business outreach"
      },
      {
        "@type": "Service", 
        "name": "LinkedIn Connection Building",
        "description": "Buy real LinkedIn connections from targeted professionals"
      },
      {
        "@type": "Service",
        "name": "LinkedIn Lead Generation",
        "description": "Custom lead generation solutions by our in-house team"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };
  const keywordTargets = [
    {
      keyword: "LinkedIn Account Rental",
      description: "Professional LinkedIn account rental services for business growth",
      icon: Linkedin
    },
    {
      keyword: "LinkedIn Connections",
      description: "Buy real LinkedIn connections from verified professionals",
      icon: Users
    },
    {
      keyword: "Lead Generation",
      description: "Professional lead generation through LinkedIn networks",
      icon: Target
    },
    {
      keyword: "Social Media Marketing",
      description: "Comprehensive social media marketing solutions",
      icon: Network
    },
    {
      keyword: "Business Growth",
      description: "Scale your business with professional networking",
      icon: TrendingUp
    }
  ];

  const serviceFeatures = [
    {
      title: "Verified Accounts",
      description: "All LinkedIn accounts are verified and professionally managed",
      icon: Shield
    },
    {
      title: "Real Connections",
      description: "Connect with genuine professionals in your industry",
      icon: Users
    },
    {
      title: "Lead Generation",
      description: "Generate high-quality leads through targeted outreach",
      icon: Target
    },
    {
      title: "Analytics & Insights",
      description: "Track performance with detailed analytics and insights",
      icon: BarChart3
    },
    {
      title: "Global Reach",
      description: "Connect with professionals worldwide",
      icon: Globe
    },
    {
      title: "Premium Support",
      description: "24/7 customer support and account management",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEO
        title="TechInRent.com - #1 LinkedIn Renting Service | LinkedIn Account Rental & LinkedIn Services"
        description="TechInRent.com is the world's leading LinkedIn renting service platform. Rent verified LinkedIn accounts, buy real connections, and get professional LinkedIn services. The trusted choice for LinkedIn account rental and LinkedIn lead generation worldwide."
        keywords="techinrent, techinrent.com, tech in rent, linkedin renting service, linkedin service, linkedin account rental, rent linkedin account, buy linkedin on rent, linkedin services, verified linkedin accounts, linkedin lead generation, linkedin connection building, linkedin marketplace, social media account rental, professional networking services, linkedin business solutions, linkedin sales navigator rental, linkedin premium accounts, b2b lead generation, linkedin outreach services, linkedin marketing services, linkedin automation, sales prospecting tools, linkedin prospecting services, linkedin consultant services, linkedin agency services, linkedin growth service, linkedin optimization, linkedin profile rental, linkedin account provider, linkedin networking platform, business networking solutions, social selling platform, linkedin sales tools, professional account access, linkedin connection marketplace, authentic linkedin connections, targeted linkedin networking, linkedin business growth, linkedin marketing platform, linkedin engagement services, linkedin outreach campaigns, linkedin sales intelligence, linkedin data services, linkedin api access, linkedin integration services, linkedin management services, linkedin strategy consulting, linkedin roi optimization"
        structuredData={seoData}
        canonicalUrl="https://techinrent.com"
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setLocation("/services")}>
              Our Services
            </Button>
            <Button onClick={() => window.history.back()}>
              Return
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="mr-2 h-4 w-4" />
              #1 LinkedIn Renting Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              TechInRent.com
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">
              World's Leading LinkedIn Service Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              TechInRent is the world's leading LinkedIn service provider, offering professional LinkedIn account rental,
              real connection building, and custom lead generation solutions. Join thousands of businesses worldwide who trust
              our LinkedIn renting service for their networking and growth needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setLocation("/services")}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Explore LinkedIn Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setLocation("/home")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact TechInRent
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Keyword Targeting Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Leading LinkedIn Services by TechInRent</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {keywordTargets.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <target.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{target.keyword}</h3>
                <p className="text-gray-600">{target.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* TechInRent Authority Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why TechInRent is the #1 LinkedIn Renting Service</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceFeatures.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <benefit.icon className="h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SEO Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About TechInRent.com</h2>

            <h3 className="text-2xl font-semibold mb-4">About TechInRent.com</h3>
            <p className="text-gray-700 mb-6">
              TechInRent.com has established itself as the world's premier LinkedIn renting service platform. Founded with the vision of
              democratizing access to professional networking opportunities, TechInRent provides comprehensive LinkedIn services including
              account rental, connection building, and lead generation solutions.
            </p>

            <h3 className="text-2xl font-semibold mb-4">LinkedIn Renting Service Excellence</h3>
            <p className="text-gray-700 mb-6">
              Our LinkedIn renting service stands apart in the industry through our commitment to quality, security, and results.
              Every LinkedIn account in our rental portfolio is verified, established, and comes with authentic professional networks.
              This ensures that businesses can immediately leverage the credibility and reach needed for successful outreach campaigns.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Comprehensive LinkedIn Services</h3>
            <p className="text-gray-700 mb-6">
              Beyond LinkedIn account rental, TechInRent offers a full suite of LinkedIn services designed to accelerate business growth.
              Our services include real LinkedIn connection building, where we connect you with authentic professionals in your target
              industries, and custom lead generation solutions developed by our in-house team of LinkedIn experts.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Global Reach, Local Service</h3>
            <p className="text-gray-700 mb-6">
              TechInRent serves businesses worldwide, from startups looking to establish their professional presence to enterprises
              seeking to expand into new markets. Our global reach combined with personalized service ensures that every client
              receives LinkedIn solutions tailored to their specific needs and market requirements.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Contact TechInRent Today</h3>
            <p className="text-gray-700 mb-4">
              Ready to experience the TechInRent difference? Contact our team today to discuss your LinkedIn service needs.
              Whether you're interested in LinkedIn account rental, connection building, or lead generation, TechInRent has
              the expertise and resources to help you achieve your business objectives.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Get Started with TechInRent</h4>
              <p className="text-blue-700">
                LinkedIn Account Rental • Connection Building • Lead Generation • Global Service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join thousands of businesses worldwide who trust TechInRent for their LinkedIn services
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setLocation("/services")}
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Explore Our Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => setLocation("/home")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact TechInRent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}