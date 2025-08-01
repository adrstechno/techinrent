import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Shield,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';

const BuyConnections = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderClick = () => {
    setIsLoading(true);
    setLocation('/select-package');
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Safe & Secure",
      description: "Our connections are from real, verified LinkedIn profiles with zero risk"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Get your connections within 24-48 hours of order confirmation"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Boost Your Profile",
      description: "Increase your LinkedIn credibility and professional network instantly"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real Human Connections",
      description: "All connections are from active LinkedIn users, not bots or fake accounts"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries and concerns"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Money-Back Guarantee",
      description: "100% satisfaction guaranteed or your money back within 30 days"
    }
  ];

  const packages = [
    {
      name: 'Starter',
      connections: '25-50',
      price: '$2',
      features: ['Real connections', 'Safe delivery', '24h support'],
      popular: false
    },
    {
      name: 'Growth',
      connections: '100-200',
      price: '$8',
      features: ['Real connections', 'Safe delivery', '24h support', 'Priority processing'],
      popular: true
    },
    {
      name: 'Pro',
      connections: '500-1000',
      price: '$25',
      features: ['Real connections', 'Safe delivery', '24h support', 'Priority processing', 'Account manager'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden mobile-scroll-optimize">
      <SEO
        title="Buy Real LinkedIn Connections Instantly - Auto LinkedIn Connection Service | TechInRent"
        description="Buy real LinkedIn connections starting at $2. Get auto LinkedIn connections safely with real-time delivery. TechInRent offers the best site to buy LinkedIn connections cheap with crypto payment options. Fast delivery LinkedIn connections service for instant LinkedIn growth."
        keywords="buy linkedin connections, auto linkedin connection, real linkedin connections, purchase linkedin connections, linkedin connections for sale, increase linkedin connections, get linkedin connections fast, safe linkedin connection service, real-time linkedin connections, boost linkedin profile connections, buy real linkedin connections instantly, how to get auto linkedin connections safely, where to buy linkedin connections cheap, best site to buy linkedin connections, grow linkedin network with real connections, buy targeted linkedin connections, fast delivery linkedin connections service, increase linkedin popularity with connections, buy bulk linkedin connections online, buy linkedin connections via crypto payment, techinrent linkedin connection service, buy linkedin connections on techinrent, techinrent auto linkedin connections, techinrent real-time linkedin growth, techinrent linkedin boost"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "LinkedIn Connection Purchase Service",
          "provider": {
            "@type": "Organization",
            "name": "TechInRent",
            "url": "https://techinrent.com"
          },
          "description": "Professional LinkedIn connection service offering real, verified connections with instant delivery",
          "offers": {
            "@type": "Offer",
            "price": "2.00",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "serviceType": "Social Media Growth Service",
          "areaServed": "Worldwide"
        }}
      />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Buy LinkedIn Connections
          </h1>
          <p className="font-body text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Grow your LinkedIn network instantly with real, high-quality connections. 
            Safe, fast, and affordable packages starting at just $2.
          </p>
        </div>

        {/* Pricing highlight */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-8 text-center">
          <div className="font-heading text-6xl font-bold text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text mb-4 tracking-tight">
            Starting at $2
          </div>
          <div className="font-body text-xl font-semibold text-gray-700 tracking-normal">
            for 25-50 connections
          </div>
          <Button
            onClick={handleOrderClick}
            disabled={isLoading}
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg mt-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Loading...' : 'Get Started Now'}
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg border border-white/30 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <CardTitle className="font-heading text-xl font-bold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-gray-600 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg border ${pkg.popular ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-white/30'} hover:shadow-xl transition-all duration-300`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl font-bold text-gray-800">
                  {pkg.name}
                </CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">
                  {pkg.price}
                </div>
                <CardDescription className="font-body text-lg text-gray-600">
                  {pkg.connections} connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleOrderClick}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {isLoading ? 'Loading...' : 'Choose Package'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="font-heading text-3xl font-bold text-white mb-6 text-center">
            Why Choose TechInRent for LinkedIn Connections?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-200">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">Real LinkedIn Connections</h3>
              <p className="font-body leading-relaxed">
                Our service provides genuine LinkedIn connections from real, active users. 
                No bots, no fake accounts - just authentic professional connections that add real value to your network.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">Safe & Secure Process</h3>
              <p className="font-body leading-relaxed">
                We use LinkedIn-compliant methods to ensure your account remains safe. 
                Our gradual delivery process mimics natural networking patterns, protecting your profile from any risks.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="font-body leading-relaxed">
                Get your LinkedIn connections delivered within 24-48 hours of order confirmation. 
                Our automated system ensures quick processing while maintaining quality and safety.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">24/7 Customer Support</h3>
              <p className="font-body leading-relaxed">
                Our dedicated support team is available round the clock to assist you with any questions or concerns. 
                We're committed to providing excellent customer service throughout your experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyConnections;
