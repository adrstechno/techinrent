// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { TrendingUp, Shield, Users, CheckCircle, ArrowRight, Target, MessageCircle, Linkedin } from "lucide-react";
// import SEO from "@/components/SEO";
// import Logo from "@/components/Logo";
// import { useLocation } from "wouter";
// import Hero from "@/components/Hero";
// import HowItWorks from "@/components/HowItWorks";
// import Pricing from "@/components/Pricing";
// import Navbar from "@/components/Navbar";
// import Testimonials from "@/components/Testimonials";
// import Features from "@/components/Features";
// import FAQ from "@/components/FAQ";
// export default function BuyLinkedInOnRent() {
//   const [, setLocation] = useLocation();
//   const userType = 'taker'; // Assuming this is set based on user selection

//   const seoData = {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     "name": "LinkedIn Account Rental Service",
//     "description": "Buy LinkedIn accounts on rent for business outreach and lead generation. Access verified LinkedIn profiles to increase your sales and networking reach.",
//     "brand": {
//       "@type": "Brand",
//       "name": "TechInRent"
//     },
//     "offers": {
//       "@type": "AggregateOffer",
//       "priceCurrency": "USD",
//       "lowPrice": "50",
//       "highPrice": "500",
//       "offerCount": "1000+"
//     },
//     "aggregateRating": {
//       "@type": "AggregateRating",
//       "ratingValue": "4.9",
//       "reviewCount": "500"
//     }
//   };

//   const benefits = [
//     {
//       icon: TrendingUp,
//       title: "Instant Access",
//       description: "Get immediate access to verified LinkedIn accounts with established networks and credibility."
//     },
//     {
//       icon: Shield,
//       title: "100% Safe & Secure",
//       description: "All accounts are verified and secure. We ensure complete privacy and safety for your business."
//     },
//     {
//       icon: Users,
//       title: "Established Networks",
//       description: "Gain instant access to high-impact accounts with thousands of industry-specific connections for your reach and influence "
//     },
//     {
//       icon: Target,
//       title: "Industry-Specific",
//       description: "Target the right audience with accounts designed for professionals across specialized markets and sectors."
//     }
//   ];

//   const pricingPlans = [
//     {
//       type: "Basic",
//       price: "$50-100/month",
//       features: [
//         "1+ years account age",
//         "Industry-specific profiles",
//         "Basic LinkedIn features",
//         "500+ connections",
//         "Email support"
//       ],
//       popular: false
//     },
//     {
//       type: "Professional",
//       price: "$150-300/month",
//       features: [
//         "2+ years account age",
//         "Premium LinkedIn features",
//         "InMail capabilities",
//         "Advanced search filters",
//         "1000+ connections"
//       ],
//       popular: true
//     },
//     {
//       type: "Enterprise",
//       price: "$400-500/month",
//       features: [
//         "3+ years account age",
//         "Sales Navigator access",
//         "Advanced lead generation",
//         "CRM integrations",
//         "2000+ connections"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//       <SEO
//         title="Buy LinkedIn on Rent - Verified Accounts for Lead Generation | TechInRent"
//         description="Buy LinkedIn accounts on rent from TechInRent. Access verified LinkedIn profiles with established networks to increase leads and boost your business outreach campaigns."
//         keywords="buy linkedin on rent, linkedin accounts for rent, verified linkedin profiles, increase leads by renting linkedin, linkedin lead generation, rent linkedin account, techinrent"
//         structuredData={seoData}
//       />
//       <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">

//         <Navbar userType={userType} />

//       </header>
//       <section className="py-10 px-4">
//         <div className="container mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
//               LinkedIn Account Rental Service
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Buy LinkedIn on Rent</h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Rent verified LinkedIn accounts with established networks and credibility. Perfect for businesses looking to increase leads, expand their reach, and connect with decision-makers in their industry.
//             </p>
//             <Hero />
//             <HowItWorks />
//             <Pricing />
//             <Features />
//           </motion.div>
//         </div>
//       </section>
//       <section className="py-16 px-4">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Buy LinkedIn Accounts on Rent?</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center h-full"
//               >
//                 <Card className="hover:shadow-lg transition-shadow p-6">
//                   <CardContent>
//                     <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
//                     <p className="text-gray-600">{benefit.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//             ))}
//           </div>
//         </div>
//       </section>
//       <Testimonials />
//       <FAQ />


//     </div>
//   );
// }


import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Target, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function BuyLinkedInOnRent() {
  const [, setLocation] = useLocation();
  const userType = 'taker';

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LinkedIn Account Rental Service",
    "description": "Buy LinkedIn accounts on rent for business outreach and lead generation.",
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
      description: "Get immediate access to verified LinkedIn accounts."
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "All accounts are verified and secure."
    },
    {
      icon: Users,
      title: "Established Networks",
      description: "Accounts with thousands of industry-specific connections."
    },
    {
      icon: Target,
      title: "Industry-Specific",
      description: "Target the right audience with specialized accounts."
    }
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
                Rent verified LinkedIn accounts with established networks and credibility for your business needs.
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
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
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