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
  Calculator,
  Send,
} from "lucide-react";
import SEO from "@/components/service/SEO";
import Logo from "@/components/service/Logo";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Services = () => {
  const [, setLocation] = useLocation();
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [connectionCount, setConnectionCount] = useState(50);
  const [userEmail, setUserEmail] = useState("");
  const [userWhatsapp, setUserWhatsapp] = useState("");

  // Pricing calculation function
  const calculatePrice = (connections) => {
    if (connections <= 50) return 1;
    if (connections <= 100) return 2;
    if (connections <= 200) return 4;
    if (connections <= 300) return 5;
    if (connections <= 500) return 7;
    return 10; // 1000+ connections
  };

  const pricingTiers = [
    {
      connections: 50,
      price: 1,
      label: "Starter",
    },
    {
      connections: 100,
      price: 2,
      label: "Basic",
    },
    {
      connections: 200,
      price: 4,
      label: "Growth",
    },
    {
      connections: 300,
      price: 5,
      label: "Professional",
    },
    {
      connections: 500,
      price: 7,
      label: "Business",
    },
    {
      connections: 1000,
      price: 10,
      label: "Enterprise",
    },
  ];

  const handleWhatsAppOrder = () => {
    const price = calculatePrice(connectionCount);
    const message = `LinkedIn Connection Order Request:
    
LinkedIn Profile: ${linkedinUrl}
Connections Needed: ${connectionCount}
Total Price: $${price}
Email: ${userEmail}
WhatsApp: ${userWhatsapp}

Please send payment details.`;

    const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TechInRent",
    url: "https://techinrent.com",
    logo: "https://techinrent.com/logo.png",
    description:
      "Professional LinkedIn services provider offering account rental, real connections, and lead generation solutions worldwide.",
    sameAs: [
      "https://linkedin.com/company/techinrent",
      "https://twitter.com/techinrent",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917898711748",
      contactType: "customer service",
      availableLanguage: "English",
    },
    areaServed: "Worldwide",
    makesOffer: [
      {
        "@type": "Offer",
        name: "LinkedIn Account Rental",
        description:
          "Rent verified LinkedIn accounts with established networks and premium features",
        category: "Professional Services",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          description:
            "Pricing based on demand - Contact vibhanshu@techinrent.com for custom quote",
        },
      },
      {
        "@type": "Offer",
        name: "Real LinkedIn Connections",
        description:
          "Buy authentic LinkedIn connections from targeted professionals in your industry",
        category: "Professional Services",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "2.00",
          unitText: "per connection",
        },
      },
      {
        "@type": "Offer",
        name: "LinkedIn Lead Generation",
        description:
          "Custom lead generation solutions from our in-house team based on your requirements",
        category: "Professional Services",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          description: "Custom pricing based on requirements",
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LinkedIn Professional Services",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "LinkedIn Account Rental",
            description:
              "Access to verified LinkedIn accounts with established networks",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            name: "Real LinkedIn Connections",
            description: "Authentic connections from targeted professionals",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            name: "LinkedIn Lead Generation",
            description: "Custom lead generation solutions by in-house team",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
    },
  };

  const services = [
    {
      icon: Linkedin,
      title: "LinkedIn Account Rental",
      description:
        "Access verified LinkedIn accounts with established networks and premium features for your business outreach campaigns.",
      features: [
        "Established connection networks",
        "Industry-specific profiles",
        "Premium account access",
        "Sales Navigator included",
        "24/7 account support",
      ],
      pricing: "Custom pricing based on demand",
      popular: false,
      ctaText: "Get Quote",
      ctaLink: "/rent-linkedin-account",
    },
    {
      icon: Users,
      title: "Buy Real Connections",
      description:
        "Grow your LinkedIn network with authentic, targeted connections from professionals in your industry.",
      features: [
        "100% real, active LinkedIn users",
        "Industry-targeted connections",
        "Geographic targeting available",
        "Quality guarantee",
        "Gradual delivery for safety",
        "Connection acceptance tracking",
      ],
      pricing: "Starting at $1 for 50 connections",
      popular: true,
      ctaText: "Order Now",
      ctaLink: "#connection-pricing",
    },
    {
      icon: Target,
      title: "LinkedIn Lead Generation",
      description:
        "Custom lead generation solutions from our in-house team based on your specific business requirements.",
      features: [
        "Custom lead generation strategy",
        "Industry-specific targeting",
        "Qualified prospect research",
        "Personalized outreach campaigns",
        "Detailed reporting & analytics",
      ],
      pricing: "Contact for custom quote",
      popular: false,
      ctaText: "Get Started",
      ctaLink: "/lead-generation",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description:
        "All our services comply with LinkedIn guidelines and use safe, proven methods.",
    },
    {
      icon: Globe,
      title: "Worldwide Service",
      description:
        "We serve clients globally with 24/7 support and multilingual assistance.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Over 150+ satisfied clients with measurable business growth and ROI.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      comment:
        "TechInRent's LinkedIn services helped us generate 300% more qualified leads. Their approach is professional, targeted, and results-driven.",
      rating: 5,
      service: "Lead Generation",
    },
    {
      name: "Michael Chen",
      role: "Sales Manager",
      company: "Global Solutions",
      comment:
        "The LinkedIn account rental service gave us immediate access to a premium network. Highly recommend for B2B outreach campaigns.",
      rating: 5,
      service: "Account Rental",
    },
    {
      name: "Emily Rodriguez",
      role: "Business Development",
      company: "StartupXYZ",
      comment:
        "Buying real LinkedIn connections through TechInRent was the best investment for our networking strategy. Quality connections that actually engage.",
      rating: 5,
      service: "Real Connections",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEO
        title="LinkedIn Services - Rent Accounts, Buy Real Connections, Lead Generation | TechInRent"
        description="Professional LinkedIn services by TechInRent: rent LinkedIn accounts, buy real connections for your profile, and get custom lead generation solutions from our in-house team. Boost your LinkedIn presence worldwide."
        keywords="linkedin services, rent linkedin account, buy real linkedin connections, linkedin lead generation, linkedin account rental, professional networking services, linkedin outreach, b2b lead generation, linkedin marketing services, linkedin profile growth, authentic linkedin connections, verified linkedin accounts, linkedin business solutions, social media marketing, professional networking, linkedin automation, sales prospecting, linkedin sales navigator, business development, lead nurturing, linkedin connection building, social selling, linkedin premium services, linkedin profile optimization, linkedin engagement services, linkedin network expansion, targeted linkedin connections, linkedin prospecting services, linkedin marketing agency, linkedin consultant services"
        structuredData={seoData}
      />

      {/* Header */}
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Professional LinkedIn Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grow Your LinkedIn Presence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive LinkedIn solutions to accelerate your business
              growth. From verified account access to custom lead generation, we
              provide everything you need to succeed on LinkedIn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our LinkedIn Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full relative ${
                    service.popular ? "border-blue-500 border-2" : ""
                  }`}
                >
                  {service.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="text-2xl font-bold text-blue-600 mt-4">
                      {service.pricing}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (service.title === "Buy Real Connections") {
                          document
                            .getElementById("connection-pricing")
                            ?.scrollIntoView({ behavior: "smooth" });
                        } else if (
                          service.title === "LinkedIn Lead Generation"
                        ) {
                          const message = `LinkedIn Lead Generation Inquiry:

I'm interested in your custom lead generation services. Please contact me with more details.

Email: ${userEmail || "Please provide email"}
WhatsApp: ${userWhatsapp || "Please provide WhatsApp"}`;
                          const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(whatsappUrl, "_blank");
                        } else {
                          setLocation(service.ctaLink);
                        }
                      }}
                    >
                      {service.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Connection Pricing Section */}
      <section
        id="connection-pricing"
        className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              LinkedIn Connection Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect package for your networking needs
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`text-center hover:shadow-lg transition-all cursor-pointer ${
                    connectionCount === tier.connections
                      ? "border-blue-500 border-2 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setConnectionCount(tier.connections)}
                >
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {tier.label || tier.connections}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {tier.connections} connections
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      ${tier.price}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Connection Order Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Order LinkedIn Connections
                </CardTitle>
                <CardDescription>
                  Enter your details below and we'll send payment information
                  via WhatsApp or email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="linkedin-url">LinkedIn Profile URL *</Label>
                  <Input
                    id="linkedin-url"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="connection-count">
                    Number of Connections *
                  </Label>
                  <Input
                    id="connection-count"
                    type="number"
                    min="1"
                    max="1000"
                    value={connectionCount}
                    onChange={(e) =>
                      setConnectionCount(parseInt(e.target.value) || 50)
                    }
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Current price:{" "}
                    <span className="font-bold text-green-600">
                      ${calculatePrice(connectionCount)}
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+1234567890"
                    value={userWhatsapp}
                    onChange={(e) => setUserWhatsapp(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-blue-700">
                    <p>LinkedIn Profile: {linkedinUrl || "Not provided"}</p>
                    <p>Connections: {connectionCount}</p>
                    <p>Total Price: ${calculatePrice(connectionCount)}</p>
                    <p className="text-sm">
                      Payment details will be sent to your WhatsApp and email
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleWhatsAppOrder}
                  disabled={!linkedinUrl || !userEmail || !userWhatsapp}
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Order via WhatsApp
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Questions? Contact us at{" "}
                  <a
                    href="mailto:vibhanshu@techinrent.com"
                    className="text-blue-600 hover:underline"
                  >
                    vibhanshu@techinrent.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our LinkedIn Services?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      "{testimonial.comment}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.company}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {testimonial.service}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your LinkedIn Network?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose from our comprehensive LinkedIn services and start seeing
            results today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setLocation("/home")}
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => setLocation("/contact")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
