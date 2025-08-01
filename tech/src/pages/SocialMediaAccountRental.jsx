import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  Users, 
  Shield, 
  TrendingUp, 
  Star,
  Smartphone,
  Globe,
  MessageCircle,
  DollarSign,
  BarChart3,
  Target,
  Zap,
  Award,
  Clock
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";
export default function SocialMediaAccountRental() {
  const [, setLocation] = useLocation();
  const seoData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Social Media Account Rental Service",
    "provider": {
      "@type": "Organization",
      "name": "TechInRent"
    },
    "description": "Professional social media account rental platform specializing in LinkedIn and other professional networking platforms",
    "areaServed": "Worldwide",
    "category": "Social Media Services",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1000"
    }
  };
  const socialMediaBenefits = [
    {
      icon: Users,
      title: "Instant Network Access",
      description: "Access established professional networks with thousands of connections instantly."
    },
    {
      icon: Shield,
      title: "Verified Accounts",
      description: "All accounts are verified and maintained by professional account managers."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Accelerate your business development with premium account features."
    },
    {
      icon: Target,
      title: "Targeted Reach",
      description: "Connect with decision-makers in your specific industry and niche."
    }
  ];

  const platformTypes = [
    {
      platform: "LinkedIn Premium",
      features: ["Premium Features", "InMail Credits", "Advanced Analytics", "Lead Builder"],
      pricing: "$99/month",
      accounts: "500+ Available"
    },
    {
      platform: "LinkedIn Sales Navigator",
      features: ["Sales Tools", "Industry Connections", "Professional Content", "Engagement History"],
      pricing: "$149/month",
      accounts: "200+ Available"
    },
    {
      platform: "LinkedIn Executive",
      features: ["C-Level Access", "Board Connections", "Industry Leadership", "Thought Leadership"],
      pricing: "$299/month",
      accounts: "50+ Available"
    }
  ];

  const useCases = [
    {
      title: "Lead Generation",
      description: "Generate high-quality leads through established professional networks.",
      icon: Target
    },
    {
      title: "Business Development",
      description: "Expand your business reach with premium account features and connections.",
      icon: TrendingUp
    },
    {
      title: "Market Research",
      description: "Access industry insights and competitor analysis through professional networks.",
      icon: BarChart3
    },
    {
      title: "Brand Building",
      description: "Build your brand presence through established professional profiles.",
      icon: Award
    },
    {
      title: "Sales Outreach",
      description: "Reach decision-makers directly with premium messaging capabilities.",
      icon: MessageCircle
    },
    {
      title: "Networking",
      description: "Connect with industry leaders and expand your professional network.",
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <SEO 
        title="Social Media Account Rental - Professional Networking Platform | TechInRent"
        description="Professional social media account rental service. Access verified LinkedIn accounts and other professional networking platforms for business growth and lead generation."
        keywords="social media account rental, professional account rental, social media marketplace, social networking platform, professional networking tools, social media management, social selling platform, social media services, account sharing platform, professional profile rental, social media rental service, networking account access, social media business tools, professional social media, social media growth service, social selling tools, social media automation, professional networking service, social media marketing platform, business networking tools, social media lead generation, professional social networking, social media management tools, social selling solutions, networking platform, professional profile access, social media strategy tools, business social media, social media consulting, professional networking solutions"
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
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Star className="mr-2 h-4 w-4" />
              Professional Social Media Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Social Media Account Rental
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access verified professional social media accounts to accelerate your business growth. From LinkedIn Premium to industry-specific profiles, unlock the power of established networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => setLocation("/home")}
              >
                <Users className="mr-2 h-5 w-5" />
                Browse Accounts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => setLocation("/earn-money-linkedin")}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Earn Money
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Professional Account Rental?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialMediaBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Available Platform Types</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {platformTypes.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{platform.platform}</CardTitle>
                    <div className="text-2xl font-bold text-purple-600">{platform.pricing}</div>
                    <Badge variant="outline">{platform.accounts}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" onClick={() => setLocation("/home")}>
                      Browse {platform.platform}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Business Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <useCase.icon className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Social Media Account Rental Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Browse Accounts",
                description: "Choose from our verified professional social media accounts."
              },
              {
                step: "2",
                title: "Select Package",
                description: "Pick the rental duration and features that suit your needs."
              },
              {
                step: "3",
                title: "Secure Access",
                description: "Get secure access credentials and account management tools."
              },
              {
                step: "4",
                title: "Start Growing",
                description: "Begin leveraging the account's network for your business goals."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses leveraging professional account rental for growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setLocation("/home")}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Start Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => setLocation("/earn-money-linkedin")}
            >
              <Clock className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}