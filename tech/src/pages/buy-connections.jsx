


// import { useState, useEffect } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   Zap, Shield, TrendingUp, Users, Clock, CheckCircle, 
//   ArrowRight, ShoppingCart, BadgeCheck, Rocket, Sparkles,
//   ChevronDown, ChevronUp, HelpCircle, Globe, Lock, Target,
// } from 'lucide-react';
// import { formatCurrency, scrollToSection } from '@/lib/utils';
// import { shouldReduceAnimations, getOptimizedAnimationDuration } from '@/lib/mobile-performance';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';
// import Footer from '@/components/Footer';

// import { Menu, X } from "lucide-react"; // icons for menu toggle

// import { useNavigate } from "react-router-dom";

// export default function BuyConnectionsPage() {
//   const [, setLocation] = useLocation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [animationDuration, setAnimationDuration] = useState(200);
//  const [activeFaq, setActiveFaq] = useState(null);
//  const [menuOpen, setMenuOpen] = useState(false);


//   const navLinks = [
//     { name: "How it Works", href: "#how-it-works" },
//     { name: "Pricing", href: "#pricing" },
//     { name: "Features", href: "#features" },
 
//     { name: "FAQ", href: "#faq" },
//   ];

//   useEffect(() => {
//     setAnimationDuration(getOptimizedAnimationDuration(200));
//   }, []);

//   const handleOrderClick = () => {
//     setIsLoading(true);
//     scrollToSection('pricing');
//     setTimeout(() => setLocation('/select-package'), 500);
//   };

// const toggleFaq = (index) => {
//   setActiveFaq(activeFaq === index ? null : index);
// };

//   const coreBenefits = [
//     {
//       icon: <Zap className="w-5 h-5 text-blue-600" />,
//       title: 'Instant Delivery',
//       description: 'Connections delivered within 24-48 hours'
//     },
//     {
//       icon: <Lock className="w-5 h-5 text-blue-600" />,
//       title: 'Secure Service',
//       description: 'Verified profiles with zero risk'
//     },
//     {
//       icon: <Target className="w-5 h-5 text-blue-600" />,
//       title: 'Targeted Growth',
//       description: 'Relevant to your industry'
//     },
//     {
//       icon: <Globe className="w-5 h-5 text-blue-600" />,
//       title: 'Global Network',
//       description: 'Connections worldwide'
//     }
//   ];

//   const features = [
//     {
//       icon: <Zap className="w-6 h-6 text-blue-600" />,
//       title: 'Get LinkedIn Connections Fast',
//       description: 'Real-time LinkedIn connections delivered within 24-48 hours automatically with our fast delivery LinkedIn connections service',
//     },
//     {
//       icon: <Shield className="w-6 h-6 text-blue-600" />,
//       title: 'Safe LinkedIn Connection Service',
//       description: 'How to get auto LinkedIn connections safely - all connections come from real, verified LinkedIn profiles with zero risk',
//     },
//     {
//       icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
//       title: 'Boost LinkedIn Profile Connections',
//       description: 'Increase LinkedIn popularity with connections to expand your professional reach and grow your LinkedIn network',
//     },
//     {
//       icon: <Users className="w-6 h-6 text-blue-600" />,
//       title: 'Real LinkedIn Connections',
//       description: 'Buy targeted LinkedIn connections from verified professionals in your industry for authentic networking',
//     },
//     {
//       icon: <Clock className="w-6 h-6 text-blue-600" />,
//       title: 'Auto LinkedIn Connection',
//       description: 'TechInRent auto LinkedIn connections processed instantly with real-time LinkedIn growth technology',
//     },
//     {
//       icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
//       title: 'TechInRent LinkedIn Boost',
//       description: 'Buy LinkedIn connections via crypto payment with 100% satisfaction guarantee from TechInRent',
//     },
//   ];

//   const faqs = [
//     {
//       question: "How quickly will I receive my LinkedIn connections?",
//       answer: "Connections are typically delivered within 24-48 hours after purchase. Our automated system works around the clock to ensure fast delivery while maintaining the highest quality standards."
//     },
//     {
//       question: "Are these real LinkedIn profiles?",
//       answer: "Yes, all connections come from real, verified LinkedIn profiles. We never use bots or fake accounts, ensuring your network growth is authentic and valuable."
//     },
//     {
//       question: "Is this service safe for my LinkedIn account?",
//       answer: "Absolutely. Our methods comply with LinkedIn's terms of service, and we've helped thousands of professionals grow their networks safely. Your account security is our top priority."
//     },
//     {
//       question: "Can I target specific industries or locations?",
//       answer: "Yes! Our premium plans include advanced targeting options to connect you with professionals in your desired industries, locations, and job functions."
//     },
//     {
//       question: "What payment methods do you accept?",
//       answer: "We accept all major credit cards, PayPal, and cryptocurrency (USDT, BTC, ETH) for your convenience and privacy."
//     }
//   ];

//   return (
//     <div className={`min-h-screen bg-white ${shouldReduceAnimations() ? 'reduced-animations' : ''}`}>
//       <SEO
//         title="Buy Real LinkedIn Connections Instantly - Auto LinkedIn Connection Service | TechInRent"
//         description="Buy real LinkedIn connections starting at $2. Get auto LinkedIn connections safely with real-time delivery."
//         keywords="buy linkedin connections, auto linkedin connection, real linkedin connections"
//       />

//       {/* Decorative elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-50 to-transparent opacity-30" />
//         <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-purple-50 to-transparent opacity-30" />
//       </div>

//       {/* Main Container */}
//       <div className="relative container mx-auto">
//         {/* <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
//                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//                  <Logo size="md" />
//                  <div className="flex items-center gap-4">
//                    <Button variant="outline" onClick={() => setLocation("/")}>
//                      Home
//                    </Button>
//                    <Button onClick={() => window.history.back()}>
//                      Return
//                    </Button>
//                  </div>
//                </div>
//              </header> */}
//             <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <a href="/">
//           <Logo size="md" />
//         </a>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="text-gray-700 hover:text-blue-600 font-medium transition"
//             >
//               {link.name}
//             </a>
//           ))}
//           <a href="/" className="border px-4 py-2 rounded-md hover:bg-gray-100 transition">
//             Home
//           </a>
//           <button
//             onClick={() => window.history.back()}
//             className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             Return
//           </button>
//         </nav>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4 space-y-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className="block text-gray-700 hover:text-blue-600 font-medium transition"
//             >
//               {link.name}
//             </a>
//           ))}
//           <a
//             href="/"
//             onClick={() => setMenuOpen(false)}
//             className="block border px-4 py-2 rounded-md text-center hover:bg-gray-100 transition"
//           >
//             Home
//           </a>
//           <button
//             onClick={() => {
//               window.history.back();
//               setMenuOpen(false);
//             }}
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Return
//           </button>
//         </div>
//       )}
//     </header>
//       {/* Hero Card */}
// <div className="mb-20 mt-4">
//   <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden max-w-6xl mx-auto relative">
    
//     {/* Top Gradient Bar */}
//     <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
    
 
//     <CardHeader className="text-center pt-12 pb-8 px-8">
//       <div className="flex items-center justify-center gap-2 mb-4">
//         <Rocket className="w-6 h-6 text-blue-600" />
//         <CardTitle className="text-3xl font-bold text-gray-900">
//           Premium LinkedIn Connections
//         </CardTitle>
//       </div>
//       <CardDescription className="text-lg text-gray-600 max-w-3xl mx-auto">
//         Purchase LinkedIn connections with <span className="font-medium text-blue-700">TechInRent</span>'s trusted service. Real, targeted, and secure – boost your presence with confidence.
//       </CardDescription>
//     </CardHeader>

//     {/* Benefits */}
//     <CardContent className="px-8 pb-12">

//       <div className="rounded-2xl p-8 mb-10 border border-blue-100 shadow-md">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
//           {coreBenefits.map((benefit, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center gap-4"
//             >
//               <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-2xl">
//                 {benefit.icon}
//               </div>
//               <div className="font-semibold text-gray-800 text-lg">{benefit.title}</div>
//             </div>
//           ))}
//         </div>
//       </div>

    

//       {/* Trust Badges */}
//       <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
//         <div className="flex items-center gap-2 text-green-600 font-medium">
//           ✅ Verified Service
//         </div>
//         <div className="flex items-center gap-2 text-blue-600 font-medium">
//           🔒 100% Secure
//         </div>
//         <div className="flex items-center gap-2 text-purple-600 font-medium">
//           ⚡ Instant Processing
//         </div>
//         <div className="flex items-center gap-2 text-yellow-600 font-medium">
//           💬 Active Support
//         </div>
//       </div>

//       {/* Call to Action */}
//       <Button
//         onClick={handleOrderClick}
//         disabled={isLoading}
//         className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
//       >
//         <ShoppingCart className="w-5 h-5 mr-2" />
//         {isLoading ? 'Processing...' : 'Get Started Now'}
//         <ArrowRight className="w-5 h-5 ml-2" />
//       </Button>

//     </CardContent>
//   </Card>
// </div>


//         {/* Features Section */}
//         <div className="mb-20" id = "features"  >
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Professionals Choose TechInRent
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Our premium service delivers real results for your LinkedIn growth
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <Card 
//                 key={index} 
//                 className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all h-full group"
//               >
//                 <CardContent className="p-8">
//                   <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Pricing Section */}
//         <div className="mb-20" id="pricing">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Transparent Pricing Plans
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Choose the perfect plan for your professional growth needs
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {[
//               { 
//                 price: 2, 
//                 connections: '25-50', 
//                 popular: false,
//                 features: ['Basic network expansion', '24-48 hour delivery', 'Verified profiles']
//               },
//               { 
//                 price: 10, 
//                 connections: '1,000', 
//                 popular: true,
//                 features: ['Significant growth', 'Priority delivery', 'Industry targeting', 'Verified profiles']
//               },
//               { 
//                 price: 55, 
//                 connections: '10,000', 
//                 popular: false,
//                 features: ['Massive network boost', 'VIP support', 'Advanced targeting', 'Premium profiles']
//               }
//             ].map((plan, index) => (
//               <div key={index} className="relative">
//                 {plan.popular && (
//                   <div className="absolute -top-4 left-0 right-0 mx-auto bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full w-max shadow-md">
//                     MOST POPULAR
//                   </div>
//                 )}
//                 <Card className={`h-full ${plan.popular ? 'border-2 border-blue-300 shadow-xl' : 'border border-gray-200'}`}>
//                   <CardHeader className="pt-12 pb-6 px-8">
//                     <CardTitle className="text-2xl font-bold text-gray-900 text-center">
//                       {plan.connections} Connections
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="px-8 pb-8">
//                     <div className="text-4xl font-bold text-blue-600 mb-6 text-center">
//                       {formatCurrency(plan.price)}
//                     </div>
//                     <ul className="space-y-3 mb-8">
//                       {plan.features.map((feature, i) => (
//                         <li key={i} className="flex items-start gap-3">
//                           <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     <Button
//                       onClick={handleOrderClick}
//                       className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
//                     >
//                       {plan.popular ? (
//                         <>
//                           <ShoppingCart className="w-5 h-5 mr-2" />
//                           Get Premium
//                         </>
//                       ) : 'Get Started'}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>

//           {/* How It Works Section */}
//       <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-inner mb-20 "id="how-it-works">
//         <h4 className="text-3xl font-semibold text-center mb-10 text-gray-800">
//           How It Works
//         </h4>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//           <div className="flex flex-col items-center gap-2">
//             <div className="bg-blue-100 p-5 rounded-full text-blue-600 font-bold text-2xl">1</div>
//             <p className="font-medium text-gray-700">Select your package</p>
//             <p className="text-lg text-gray-500">Choose a plan that fits your growth goals.</p>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <div className="bg-purple-100 p-5 rounded-full text-purple-600 font-bold text-2xl">2</div>
//             <p className="font-medium text-gray-700">Submit details</p>
//             <p className="text-lg text-gray-500">Fill in your LinkedIn profile info securely.</p>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <div className="bg-green-100 p-5 rounded-full text-green-600 font-bold text-2xl">3</div>
//             <p className="font-medium text-gray-700">Start connecting</p>
//             <p className="text-lg text-gray-500">Watch your network grow within hours.</p>
//           </div>
//         </div>
//       </div>

//         {/* FAQ Section */}
//         <div className="mb-20 mt-10">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Everything you need to know about our LinkedIn connection service
//             </p>
//           </div>
          
//           <div className="max-w-4xl mx-auto space-y-4">
//             {faqs.map((faq, index) => (
//               <Card key={index} className=" border-gray-200  transition-colors">
//                 <button 
//                   onClick={() => toggleFaq(index)}
//                   className="w-full flex items-center justify-between p-6 text-left rounded-sm outline-none focus:outline-none focus:ring-0 focus:border-none"
//                 >
//                   <div className="flex items-center gap-4">
//                     <HelpCircle className="w-5 h-5 text-blue-500" />
//                     <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
//                   </div>
//                   {activeFaq === index ? (
//                     <ChevronUp className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-500" />
//                   )}
//                 </button>
//                 {activeFaq === index && (
//                   <div className="px-6 mt-5 pb-6 text-gray-600">
//                     {faq.answer}
//                   </div>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Final CTA */}
//         <div className="mb-20">
//           <Card className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
//             <CardContent className="p-12 text-center text-blue-700">
//               <BadgeCheck className="w-12 h-12 mx-auto mb-6" />
//               <h2 className="text-3xl font-bold mb-4">
//                 Ready to Transform Your LinkedIn Presence?
//               </h2>
//               <p className="text-xl text-blue-600 max-w-2xl mx-auto mb-8">
//                 Join thousands of professionals who accelerated their career growth with TechInRent
//               </p>
//               <Button
//                 onClick={handleOrderClick}
//                 className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
//               >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Get Started Today
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <div>
//       <Footer />
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, Shield, TrendingUp, Users, Clock, CheckCircle, 
  ArrowRight, ShoppingCart, BadgeCheck, Rocket, Sparkles,
  ChevronDown, ChevronUp, HelpCircle, Globe, Lock, Target,
  Menu, X
} from 'lucide-react';
import { formatCurrency, scrollToSection } from '@/lib/utils';
import { shouldReduceAnimations, getOptimizedAnimationDuration } from '@/lib/mobile-performance';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

export default function BuyConnectionsPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(200);
  const [activeFaq, setActiveFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    setAnimationDuration(getOptimizedAnimationDuration(200));
  }, []);

  const handleOrderClick = () => {
    setIsLoading(true);
    scrollToSection('pricing');
    setTimeout(() => setLocation('/select-package'), 500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const coreBenefits = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: 'Instant Delivery',
      description: 'Connections delivered within 24-48 hours'
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      title: 'Secure Service',
      description: 'Verified profiles with zero risk'
    },
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: 'Targeted Growth',
      description: 'Relevant to your industry'
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      title: 'Global Network',
      description: 'Connections worldwide'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Get LinkedIn Connections Fast',
      description: 'Real-time LinkedIn connections delivered within 24-48 hours automatically with our fast delivery LinkedIn connections service',
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Safe LinkedIn Connection Service',
      description: 'How to get auto LinkedIn connections safely - all connections come from real, verified LinkedIn profiles with zero risk',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: 'Boost LinkedIn Profile Connections',
      description: 'Increase LinkedIn popularity with connections to expand your professional reach and grow your LinkedIn network',
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Real LinkedIn Connections',
      description: 'Buy targeted LinkedIn connections from verified professionals in your industry for authentic networking',
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Auto LinkedIn Connection',
      description: 'TechInRent auto LinkedIn connections processed instantly with real-time LinkedIn growth technology',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: 'TechInRent LinkedIn Boost',
      description: 'Buy LinkedIn connections via crypto payment with 100% satisfaction guarantee from TechInRent',
    },
  ];

  const faqs = [
    {
      question: "How quickly will I receive my LinkedIn connections?",
      answer: "Connections are typically delivered within 24-48 hours after purchase. Our automated system works around the clock to ensure fast delivery while maintaining the highest quality standards."
    },
    {
      question: "Are these real LinkedIn profiles?",
      answer: "Yes, all connections come from real, verified LinkedIn profiles. We never use bots or fake accounts, ensuring your network growth is authentic and valuable."
    },
    {
      question: "Is this service safe for my LinkedIn account?",
      answer: "Absolutely. Our methods comply with LinkedIn's terms of service, and we've helped thousands of professionals grow their networks safely. Your account security is our top priority."
    },
    {
      question: "Can I target specific industries or locations?",
      answer: "Yes! Our premium plans include advanced targeting options to connect you with professionals in your desired industries, locations, and job functions."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and cryptocurrency (USDT, BTC, ETH) for your convenience and privacy."
    }
  ];

  return (
    <div className={`min-h-screen bg-white ${shouldReduceAnimations() ? 'reduced-animations' : ''}`}>
      <SEO
        title="Buy Real LinkedIn Connections Instantly - Auto LinkedIn Connection Service | TechInRent"
        description="Buy real LinkedIn connections starting at $2. Get auto LinkedIn connections safely with real-time delivery."
        keywords="buy linkedin connections, auto linkedin connection, real linkedin connections"
      />

      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-50 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-purple-50 to-transparent opacity-30" />
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/">
            <Logo size="md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center text-lg font-semibold gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a href="/" className="border px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
              Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Return
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block border px-4 py-2 rounded-md text-center hover:bg-gray-100 transition-colors duration-200"
            >
              Home
            </a>
            <button
              onClick={() => {
                window.history.back();
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Return
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16 md:mb-20 mt-4">
          <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden max-w-6xl mx-auto relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <CardHeader className="text-center pt-12 pb-8 px-6 sm:px-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Premium LinkedIn Connections
                </CardTitle>
              </div>
              <CardDescription className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Purchase LinkedIn connections with <span className="font-medium text-blue-700">TechInRent</span>'s trusted service. Real, targeted, and secure – boost your presence with confidence.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 pb-12">
              <div className="rounded-2xl p-6 sm:p-8 mb-8 md:mb-10 border border-blue-100 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center">
                  {coreBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
                    >
                      <div className="bg-blue-100 p-3 sm:p-4 rounded-full text-blue-600 text-xl sm:text-2xl">
                        {benefit.icon}
                      </div>
                      <div className="font-semibold text-gray-800 text-base sm:text-lg">{benefit.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 md:mb-10">
                <div className="flex items-center gap-2 text-green-600 font-medium text-sm sm:text-base">
                  ✅ Verified Service
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm sm:text-base">
                  🔒 100% Secure
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-medium text-sm sm:text-base">
                  ⚡ Instant Processing
                </div>
                <div className="flex items-center gap-2 text-yellow-600 font-medium text-sm sm:text-base">
                  💬 Active Support
                </div>
              </div>

              <Button
                onClick={handleOrderClick}
                disabled={isLoading}
                className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isLoading ? 'Processing...' : 'Get Started Now'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Features Section */}
        <section className="mb-16 md:mb-20" id="features">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Professionals Choose TechInRent
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our premium service delivers real results for your LinkedIn growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all h-full group"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16 md:mb-20" id="pricing">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Transparent Pricing Plans
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your professional growth needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { 
                price: 2, 
                connections: '25-50', 
                popular: false,
                features: ['Basic network expansion', '24-48 hour delivery', 'Verified profiles']
              },
              { 
                price: 10, 
                connections: '1,000', 
                popular: true,
                features: ['Significant growth', 'Priority delivery', 'Industry targeting', 'Verified profiles']
              },
              { 
                price: 55, 
                connections: '10,000', 
                popular: false,
                features: ['Massive network boost', 'VIP support', 'Advanced targeting', 'Premium profiles']
              }
            ].map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-0 right-0 mx-auto bg-blue-600 text-white text-xs sm:text-sm font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-full w-max shadow-md">
                    MOST POPULAR
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-2 border-blue-300 shadow-xl' : 'border border-gray-200'}`}>
                  <CardHeader className="pt-10 sm:pt-12 pb-4 sm:pb-6 px-6 sm:px-8">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                      {plan.connections} Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 text-center">
                      {formatCurrency(plan.price)}
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={handleOrderClick}
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      {plan.popular ? (
                        <>
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Get Premium
                        </>
                      ) : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-inner mb-16 md:mb-20" id="how-it-works">
          <h4 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 text-gray-800">
            How It Works
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-100 p-4 sm:p-5 rounded-full text-blue-600 font-bold text-xl sm:text-2xl">1</div>
              <p className="font-medium text-gray-700 text-sm sm:text-base">Select your package</p>
              <p className="text-sm sm:text-base text-gray-500">Choose a plan that fits your growth goals.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-purple-100 p-4 sm:p-5 rounded-full text-purple-600 font-bold text-xl sm:text-2xl">2</div>
              <p className="font-medium text-gray-700 text-sm sm:text-base">Submit details</p>
              <p className="text-sm sm:text-base text-gray-500">Fill in your LinkedIn profile info securely.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-green-100 p-4 sm:p-5 rounded-full text-green-600 font-bold text-xl sm:text-2xl">3</div>
              <p className="font-medium text-gray-700 text-sm sm:text-base">Start connecting</p>
              <p className="text-sm sm:text-base text-gray-500">Watch your network grow within hours.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 md:mb-20" id="faq">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our LinkedIn connection service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-gray-200 transition-colors">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left rounded-sm outline-none focus:outline-none focus:ring-0 focus:border-none"
                  aria-expanded={activeFaq === index}
                  aria-controls={`faq-${index}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {activeFaq === index && (
                  <div id={`faq-${index}`} className="px-6 sm:px-8 mt-2 pb-6 text-sm sm:text-base text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-16 md:mb-20">
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center text-blue-700">
              <BadgeCheck className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Ready to Transform Your LinkedIn Presence?
              </h2>
              <p className="text-base sm:text-xl text-blue-600 max-w-2xl mx-auto mb-6 sm:mb-8">
                Join thousands of professionals who accelerated their career growth with TechInRent
              </p>
              <Button
                onClick={handleOrderClick}
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Started Today
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}