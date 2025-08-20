import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Users, Zap, ArrowRight } from "lucide-react";
import SEO from "@/components/service/SEO";
import Logo from "@/components/service/Logo";
export default function SelectPackagePage() {
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState("");
  const packages = [
    {
      value: "25-50 Connections",
      label: "25-50 Connections",
      price: "2",
      popular: false,
      description: "Perfect for getting started with LinkedIn networking",
    },
    {
      value: "100 Connections",
      label: "100 Connections",
      price: "5",
      popular: false,
      description: "Great for building your professional network",
    },
    {
      value: "200 Connections",
      label: "200 Connections",
      price: "8",
      popular: true,
      description: "Most popular choice for serious networking",
    },
    {
      value: "500 Connections",
      label: "500 Connections",
      price: "15",
      popular: false,
      description: "Ideal for expanding your reach significantly",
    },
    {
      value: "1000 Connections",
      label: "1000 Connections",
      price: "25",
      popular: false,
      description: "Perfect for building a large professional network",
    },
    {
      value: "2000 Connections",
      label: "2000 Connections",
      price: "45",
      popular: false,
      description: "Maximum impact for serious professionals",
    },
    {
      value: "5000 Connections",
      label: "5000 Connections",
      price: "99",
      popular: false,
      description: "Enterprise level networking solution",
    },
    {
      value: "10000 Connections",
      label: "10000 Connections",
      price: "180",
      popular: false,
      description: "Ultimate networking package for industry leaders",
    },
  ];
  const handleContinue = () => {
    if (!selectedPackage) {
      return;
    }
    // Store selected package in localStorage to pass to order summary
    const selectedPkg = packages.find((pkg) => pkg.value === selectedPackage);
    localStorage.setItem("selectedPackage", JSON.stringify(selectedPkg));
    // Navigate to order summary page
    setLocation("/order-summary");
  };
  const features = [
    "🔗 Real connections from verified LinkedIn profiles",
    "⚡ Delivered within 24-48 hours",
    "🛡️ 100% safe and secure process - No login required",
    "💰 Money-back guarantee",
    "🎯 Industry-targeted connections available",
    "📧 24/7 customer support via multiple channels",
    "🔐 Only your public profile URL needed",
    "✅ No risk to your LinkedIn account",
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-violet-800 to-purple-800 relative overflow-hidden mobile-scroll-optimize">
      <SEO
        title="Select LinkedIn Connections Package - Choose Your Plan | TechInRent"
        description="Choose the perfect LinkedIn connections package for your needs. Starting at $2 for 25-50 connections. Real-time delivery with verified profiles from TechInRent."
        keywords="select linkedin package, choose linkedin connections, linkedin connection packages, buy linkedin connections, linkedin connection plans, techinrent packages"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Select LinkedIn Connections Package - TechInRent",
          description:
            "Choose from various LinkedIn connection packages starting at $2",
          provider: {
            "@type": "Organization",
            name: "TechInRent",
          },
        }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Logo size="md" animated={true} />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your LinkedIn Package
          </h1>
          <p className="font-body text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get real, targeted connections from verified profiles. No login
            required - just your profile URL.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Package Selection */}
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="font-heading text-2xl font-bold text-purple-600 flex items-center gap-3 tracking-tight">
                  <Users className="w-7 h-7" />
                  Choose Your Package
                </CardTitle>
                <CardDescription className="font-body text-gray-600 text-lg leading-relaxed font-normal tracking-normal">
                  Select the number of connections you want to add to your
                  LinkedIn profile
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-8 ">
                <RadioGroup
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                  className="space-y-5 rounded-sm outline-none focus:outline-none focus:ring-0 focus:border-none"
                >
                  {packages.map((pkg) => (
                    <div key={pkg.value} className="relative ">
                      <div
                        className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg  ${
                          selectedPackage === pkg.value
                            ? "border-purple-500 bg-purple-50 shadow-md"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <RadioGroupItem
                          value={pkg.value}
                          id={pkg.value}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={pkg.value}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="font-heading font-semibold text-lg text-gray-800 mb-1 tracking-normal">
                                  {pkg.label}
                                </div>
                                <div className="font-body text-sm text-gray-600 leading-relaxed font-normal tracking-normal">
                                  {pkg.description}
                                </div>
                                {pkg.popular && (
                                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white mt-2">
                                    Most Popular
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-green-600">
                                ${pkg.price}
                              </div>
                              <div className="text-sm text-gray-500 font-medium">
                                USD
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Features & Continue */}
            <div className="space-y-8">
              <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-black text-green-600 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    Service Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <h4 className="font-black text-blue-700 mb-3">
                      🚀 Why TechInRent?
                    </h4>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      We connect you with genuine, relevant professionals to
                      build authentic authority. No passwords needed - secure &
                      compliant with 24/7 support.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <Zap className="w-10 h-10 mx-auto mb-3" />
                    <div className="font-bold text-xl mb-2">Fast Delivery</div>
                    <div className="text-purple-100 leading-relaxed">
                      Connections delivered within 24-48 hours
                    </div>
                  </div>
                  <Button
                    onClick={handleContinue}
                    disabled={!selectedPackage}
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Continue to Order Summary
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
