import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, CheckCircle, ArrowRight, Target, MessageCircle, Linkedin } from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";

export default function BuyLinkedInOnRent() {
  const [, setLocation] = useLocation();

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LinkedIn Account Rental Service",
    "description": "Buy LinkedIn accounts on rent for business outreach and lead generation. Access verified LinkedIn profiles to increase your sales and networking reach.",
    "brand": {
      "@type": "Brand",
      "name": "TechInRent"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "50",
      "highPrice": "500",
      "offerCount": "1000+"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Instant Access",
      description: "Get immediate access to verified LinkedIn accounts with established networks and credibility."
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "All accounts are verified and secure. We ensure complete privacy and safety for your business."
    },
    {
      icon: Users,
      title: "Established Networks",
      description: "Access accounts with thousands of connections in your target industry and market."
    },
    {
      icon: Target,
      title: "Industry-Specific",
      description: "Choose from accounts tailored to specific industries and professional niches."
    }
  ];

  const pricingPlans = [
    {
      type: "Basic",
      price: "$50-100/month",
      features: [
        "1+ years account age",
        "Industry-specific profiles",
        "Basic LinkedIn features",
        "500+ connections",
        "Email support"
      ],
      popular: false
    },
    {
      type: "Professional",
      price: "$150-300/month",
      features: [
        "2+ years account age",
        "Premium LinkedIn features",
        "InMail capabilities",
        "Advanced search filters",
        "1000+ connections"
      ],
      popular: true
    },
    {
      type: "Enterprise",
      price: "$400-500/month",
      features: [
        "3+ years account age",
        "Sales Navigator access",
        "Advanced lead generation",
        "CRM integrations",
        "2000+ connections"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <SEO
        title="Buy LinkedIn on Rent - Verified Accounts for Lead Generation | TechInRent"
        description="Buy LinkedIn accounts on rent from TechInRent. Access verified LinkedIn profiles with established networks to increase leads and boost your business outreach campaigns."
        keywords="buy linkedin on rent, linkedin accounts for rent, verified linkedin profiles, increase leads by renting linkedin, linkedin lead generation, rent linkedin account, techinrent"
        structuredData={seoData}
      />
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setLocation("/")}>
              Home
            </Button>
            <Button onClick={() => window.history.back()}>
              Return
            </Button>
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
              LinkedIn Account Rental Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Buy LinkedIn on Rent</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rent verified LinkedIn accounts with established networks and credibility. Perfect for businesses looking to increase leads, expand their reach, and connect with decision-makers in their industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setLocation("/home")}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setLocation("/home")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy LinkedIn Accounts on Rent?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center h-full"
              >
                <Card className="hover:shadow-lg transition-shadow p-6">
                  <CardContent>
                    <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">LinkedIn Account Types Available</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((account, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${account.popular ? 'border-blue-500 border-2 relative' : ''}`}>
                  {account.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{account.type}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-blue-600">
                      {account.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {account.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setLocation("/home")}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start renting verified LinkedIn accounts today and see immediate results
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setLocation("/home")}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Browse Available Accounts
          </Button>
        </div>
      </section>
    </div>
  );
}