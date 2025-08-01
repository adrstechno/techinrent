import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";

export default function LinkedInRentingService() {
  const [, setLocation] = useLocation();

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "LinkedIn Renting Service",
    "provider": {
      "@type": "Organization",
      "name": "TechInRent",
      "url": "https://techinrent.com"
    },
    "description": "Professional LinkedIn account renting service. Rent LinkedIn profiles for business networking and lead generation or earn money by providing your account.",
    "areaServed": "Worldwide",
    "category": "Professional Services",
    "offers": [
      {
        "@type": "Offer",
        "name": "LinkedIn Account Rental for Providers",
        "description": "Earn money by renting your LinkedIn account"
      },
      {
        "@type": "Offer",
        "name": "LinkedIn Profile Access",
        "description": "Access verified LinkedIn accounts for business outreach and lead generation"
      }
    ]
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Verified LinkedIn Accounts",
      description: "Access to premium, verified LinkedIn accounts with established networks and credibility."
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "All accounts are thoroughly vetted and secure. Complete privacy protection guaranteed."
    },
    {
      icon: Users,
      title: "Instant Network Access",
      description: "Get immediate access to thousands of industry connections and decision-makers."
    },
    {
      icon: CheckCircle,
      title: "Industry-Specific Targeting",
      description: "Choose accounts tailored to your specific industry and target market for maximum impact."
    }
  ];

  const howItWorks = [
    {
      number: "01",
      title: "Choose Your Account",
      description: "Select from our curated collection of verified LinkedIn accounts based on your industry and requirements."
    },
    {
      number: "02",
      title: "Secure Rental Process",
      description: "Complete our secure rental process with flexible terms and transparent pricing."
    },
    {
      number: "03",
      title: "Start Growing Your Network",
      description: "Begin leveraging your rented LinkedIn account to expand your professional network and generate leads."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      comment: "TechInRent's LinkedIn rental service transformed our lead generation. We saw a 300% increase in qualified leads within the first month.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Sales Manager",
      comment: "The quality of LinkedIn accounts is exceptional. Professional, established profiles that immediately boosted our credibility.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Business Development",
      comment: "Outstanding service and support. The rental process was seamless and the results exceeded our expectations.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEO 
        title="LinkedIn Renting Service - TechInRent | Buy LinkedIn on Rent | Professional Access"
        description="Professional LinkedIn renting service by TechInRent. Access verified LinkedIn accounts to increase leads and expand your business outreach. Trusted LinkedIn rental marketplace for clients."
        keywords="linkedin renting service, buy linkedin on rent, earn money by renting linkedin accounts, increase leads by renting linkedin, techinrent, linkedin rent, linkedin account rental, verified linkedin accounts, linkedin account marketplace, rent verified linkedin, linkedin lead generation, linkedin business accounts, linkedin premium accounts, social media account rental, professional account rental, linkedin networking service, linkedin sales navigator rental, linkedin premium rental, linkedin account provider, linkedin taker, linkedin provider, social selling accounts, b2b lead generation, sales prospecting tools, linkedin connection building, professional profile access, linkedin outreach tools, social media marketing, digital marketing tools, online networking platform, business development tools, sales enablement platform, linkedin sales tools, social selling platform, network expansion service, linkedin growth service, linkedin marketing platform, linkedin automation tools, sales funnel optimization, lead nurturing platform, crm integration linkedin, linkedin api access, linkedin data scraping, professional networking tools, business networking platform, social media management, content marketing tools, influencer marketing platform, brand awareness tools, customer acquisition platform, sales acceleration tools"
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
              #1 LinkedIn Rental Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Rent LinkedIn Accounts for Business Growth
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              TechInRent is the leading LinkedIn rental marketplace. Access verified LinkedIn accounts to dramatically increase your leads, expand your professional network, and accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setLocation("/home")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Browse LinkedIn Accounts
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setLocation("/buy-linkedin-on-rent")}
              >
                <Users className="mr-2 h-5 w-5" />
                View Account Types
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechInRent LinkedIn Renting Service?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center h-full"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
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
          <h2 className="text-3xl font-bold text-center mb-12">How Our LinkedIn Rental Service Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say About TechInRent</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <CardContent>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses who trust TechInRent for professional LinkedIn account access
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setLocation("/home")}
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Browse Accounts
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => setLocation("/buy-linkedin-on-rent")}
            >
              <Users className="mr-2 h-5 w-5" />
              View Pricing
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              +917898711748
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <a href="https://wa.me/917898711748" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Logo size="sm" />
              <p className="mt-4 text-gray-400">
                The most trusted LinkedIn renting service platform worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn Account Rental</li>
                <li>Premium Account Access</li>
                <li>Lead Generation Solutions</li>
                <li>Business Outreach Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +917898711748</li>
                <li>
                  <a href="https://wa.me/917898711748" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
                <li>Email: support@techinrent.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            &copy; 2024 TechInRent. All rights reserved. Leading LinkedIn renting service platform.
          </div>
        </div>
      </footer>
    </div>
  );
}