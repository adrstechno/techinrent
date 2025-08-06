import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Users, 
  CheckCircle,
  ArrowRight,
  Clock,
  Smartphone,
  Globe,
  Award
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";
import ProviderFormPopup from "@/components/ProviderFormPopup";

export default function EarnMoneyLinkedIn() {
  const [, setLocation] = useLocation();
  const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);
  
  const seoData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Earn Money by Renting LinkedIn Accounts",
    "description": "Turn your LinkedIn account into passive income by renting your LinkedIn profile through TechInRent's secure platform.",
    "about": {
      "@type": "Service",
      "name": "LinkedIn Account Rental Income",
      "provider": {
        "@type": "Organization",
        "name": "TechInRent"
      }
    }
  };

  const earningFeatures = [
    {
      icon: DollarSign,
      title: "Earn Extra Income",
      description: "Turn your LinkedIn account into a source of passive income with no upfront costs."
    },
    {
      icon: TrendingUp,
      title: "Increase Social Capital",
      description: "Enhance your professional status by being part of an innovative sharing economy."
    },
    {
      icon: Shield,
      title: "Secure and Confidential",
      description: "Your profile's security and privacy is our top priority with cutting-edge protection."
    }
  ];

  const stepsToEarn = [
    {
      step: 1,
      title: "Sign Up",
      description: "Register with our platform and complete your profile information."
    },
    {
      step: 2,
      title: "Get Verified",
      description: "We verify your LinkedIn credentials to start the process."
    },
    {
      step: 3,
      title: "Start Earning",
      description: "Begin earning monthly revenue by renting your account to trusted professionals."
    }
  ];

  const faqItems = [
    {
      question: "How is my account protected?",
      answer: "Our platform uses advanced security measures to protect your account data and privacy."
    },
    {
      question: "How do I receive payments?",
      answer: "Payments are distributed monthly via bank transfer, PayPal, or other preferred methods."
    },
    {
      question: "Can I stop the rental service?",
      answer: "Yes, you have full control and can stop the rental service at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SEO 
        title="Earn Money by Renting LinkedIn Accounts | TechInRent"
        description="Turn your LinkedIn account into passive income with TechInRent. Earn money every month by renting your LinkedIn profile safely and securely. Join thousands earning extra income."
        keywords="earn money by renting linkedin accounts, linkedin passive income, monthly linkedin income, rent linkedin account for money, techinrent income, linkedin monetization, passive income linkedin, make money linkedin, linkedin side hustle, linkedin income stream, linkedin account provider, linkedin rental income, social media monetization, online passive income, digital income streams, social media side hustle, linkedin earnings, monthly recurring income, linkedin account sharing, rent your linkedin, linkedin profile monetization, social selling income, professional networking income, linkedin business income, social media rental, account sharing platform, linkedin gig economy, freelance linkedin services, linkedin service provider, social media entrepreneur, digital marketing income, online business opportunity, linkedin marketplace earnings, social networking monetization, linkedin affiliate income, social media passive income, linkedin revenue sharing, professional profile rental, linkedin account leasing, social platform monetization"
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
            <Button onClick={() => window.history.back()}>
              Return
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <Badge className="inline-block text-xl bg-green-100 text-green-800 hover:bg-green-200">
              💰 Start Earning Today
            </Badge>
            <div className="space-y-6">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Earn Money by Renting Your LinkedIn Account
              </h1>
              <p className="font-heading text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Transform your LinkedIn profile into passive income
              </p>
              <p className="font-body text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                Safe, secure, and completely passive - earn monthly income with zero effort.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
              <div className="text-center space-y-4">
                <div className="font-heading text-4xl md:text-5xl font-bold text-green-600">
                  upto $20
                </div>
                <div className="space-y-2">
                  <div className="font-body text-lg md:text-xl font-semibold text-gray-800">
                    Monthly Passive Income
                  </div>
                  <div className="font-body text-sm md:text-base text-gray-600">
                    Average earnings per LinkedIn account
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition hover:scale-105"
                onClick={() => setLocation("/home")}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Start Earning Money
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose TechInRent?
            </h2>
            <p className="font-body text-lg text-gray-600 tracking-normal max-w-2xl mx-auto">
              Discover the benefits of partnering with the most trusted LinkedIn account rental platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {earningFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center h-full hover:transform hover:scale-105 transition-all duration-300"
              >
                <Card className="p-6 md:p-8 h-full shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="space-y-4">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start Earning */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              How to Start Earning
            </h2>
            <p className="font-body text-lg text-gray-600 tracking-normal max-w-2xl mx-auto">
              Get started with our straightforward process and begin earning passive income today
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsToEarn.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.7 }}
                className="text-center space-y-6"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
                  {step.step}
                </div>
                <div className="space-y-4">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* 
      Income Benefits
      <section className="py-16 px-4 bg-white/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Income Plans
            </h2>
            <p className="font-body text-lg text-gray-600 tracking-normal max-w-2xl mx-auto">
              Choose the earning plan that fits your goals and maximize your passive income potential
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                  Basic Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-8">
                <div className="font-heading text-4xl md:text-5xl font-bold text-green-600">
                  $150
                </div>
                <div className="space-y-2">
                  <div className="font-body text-lg font-semibold text-gray-700 tracking-normal">
                    Monthly Income
                  </div>
                  <div className="font-body text-sm text-gray-500 tracking-normal">
                    Start earning today
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center border-green-500 border-2 hover:shadow-xl transition-shadow duration-300 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1">
                Most Popular
              </Badge>
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                  Premium Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-8">
                <div className="font-heading text-4xl md:text-5xl font-bold text-green-600">
                  $300
                </div>
                <div className="space-y-2">
                  <div className="font-body text-lg font-semibold text-gray-700 tracking-normal">
                    Higher Income
                  </div>
                  <div className="font-body text-sm text-gray-500 tracking-normal">
                    Scale your earnings
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl md:text-2xl font-bold text-gray-900">
                  Enterprise Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-8">
                <div className="font-heading text-4xl md:text-5xl font-bold text-green-600">
                  $500+
                </div>
                <div className="space-y-2">
                  <div className="font-body text-lg font-semibold text-gray-700 tracking-normal">
                    Premium Rates
                  </div>
                  <div className="font-body text-sm text-gray-500 tracking-normal">
                    Higher value accounts
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="font-heading text-lg tracking-normal">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-gray-600 tracking-normal">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Start Earning?
          </h2>
          <p className="font-body text-xl mb-8 opacity-90 tracking-normal">
            Join thousands who are already earning passive income with their LinkedIn accounts
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setIsProviderFormOpen(true)}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Start Earning Now
          </Button>
        </div>
      </section>

      {/* Provider Form Popup */}
      <ProviderFormPopup 
        isOpen={isProviderFormOpen}
        onClose={() => setIsProviderFormOpen(false)}
      />
    </div>
  );
}
