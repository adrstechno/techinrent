// import { useState, useEffect } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Shield, Zap, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
// import { formatCurrency, scrollToSection } from '@/lib/utils';
// import { shouldReduceAnimations, getOptimizedAnimationDuration } from '@/lib/mobile-performance';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';

// export default function BuyConnectionsPage() {
//   const [, setLocation] = useLocation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [animationDuration, setAnimationDuration] = useState(200);

//   useEffect(() => {
//     setAnimationDuration(getOptimizedAnimationDuration(200));
//   }, []);

//   const handleOrderClick = () => {
//     setIsLoading(true);
//     scrollToSection('pricing');
//     setTimeout(() => setLocation('/select-package'), 500);
//   };

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: 'Get LinkedIn Connections Fast',
//       description: 'Real-time LinkedIn connections delivered within 24-48 hours automatically with our fast delivery LinkedIn connections service',
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: 'Safe LinkedIn Connection Service',
//       description: 'How to get auto LinkedIn connections safely - all connections come from real, verified LinkedIn profiles with zero risk',
//     },
//     {
//       icon: <TrendingUp className="w-8 h-8" />,
//       title: 'Boost LinkedIn Profile Connections',
//       description: 'Increase LinkedIn popularity with connections to expand your professional reach and grow your LinkedIn network',
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: 'Real LinkedIn Connections',
//       description: 'Buy targeted LinkedIn connections from verified professionals in your industry for authentic networking',
//     },
//     {
//       icon: <Clock className="w-8 h-8" />,
//       title: 'Auto LinkedIn Connection',
//       description: 'TechInRent auto LinkedIn connections processed instantly with real-time LinkedIn growth technology',
//     },
//     {
//       icon: <CheckCircle className="w-8 h-8" />,
//       title: 'TechInRent LinkedIn Boost',
//       description: 'Buy LinkedIn connections via crypto payment with 100% satisfaction guarantee from TechInRent',
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden mobile-scroll-optimize ${
//         shouldReduceAnimations() ? 'reduced-animations' : ''
//       }`}
//     >
//       <SEO
//         title="Buy Real LinkedIn Connections Instantly - Auto LinkedIn Connection Service | TechInRent"
//         description="Buy real LinkedIn connections starting at $2. Get auto LinkedIn connections safely with real-time delivery. TechInRent offers the best site to buy LinkedIn connections cheap with crypto payment options. Fast delivery LinkedIn connections service for instant LinkedIn growth."
//         keywords="buy linkedin connections, auto linkedin connection, real linkedin connections, purchase linkedin connections, linkedin connections for sale, increase linkedin connections, get linkedin connections fast, safe linkedin connection service, real-time linkedin connections, boost linkedin profile connections, buy real linkedin connections instantly, how to get auto linkedin connections safely, where to buy linkedin connections cheap, best site to buy linkedin connections, grow linkedin network with real connections, buy targeted linkedin connections, fast delivery linkedin connections service, increase linkedin popularity with connections, buy bulk linkedin connections online, buy linkedin connections via crypto payment, techinrent linkedin connection service, buy linkedin connections on techinrent, techinrent auto linkedin connections, techinrent real-time linkedin growth, techinrent linkedin boost"
//         structuredData={{
//           '@context': 'https://schema.org',
//           '@type': 'Service',
//           'name': 'LinkedIn Connection Purchase Service',
//           'provider': {
//             '@type': 'Organization',
//             'name': 'TechInRent',
//             'url': 'https://techinrent.com',
//           },
//           'description': 'Professional LinkedIn connection service offering real, verified connections with instant delivery',
//           'offers': {
//             '@type': 'Offer',
//             'price': '2.00',
//             'priceCurrency': 'USD',
//             'priceValidUntil': '2025-12-31',
//             'availability': 'https://schema.org/InStock',
//           },
//           'serviceType': 'Social Media Growth Service',
//           'areaServed': 'Worldwide',
//         }}
//       />

//       {/* Background decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse"
//           style={{ animationDuration: `${2000}ms` }}
//         />
//         <div
//           className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce"
//           style={{ animationDuration: `${2000}ms` }}
//         />
//         <div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin"
//           style={{ animationDuration: `${getOptimizedAnimationDuration(2000)}ms` }}
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 safe-area-inset">
//         {/* Header - Mobile Optimized */}
//         <div className="text-center mb-6 sm:mb-8 md:mb-12">
//           <div className="mb-3 sm:mb-4 md:mb-6">
//             <Logo size="md" animated={!shouldReduceAnimations()} />
//           </div>
//           <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent leading-tight tracking-tight responsive-heading">
//             Buy Real LinkedIn Connections Instantly
//           </h1>
//           <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto font-normal leading-relaxed tracking-normal responsive-subheading px-3 sm:px-4">
//             Get auto LinkedIn connections safely with TechInRent's real-time LinkedIn growth service
//           </p>
//         </div>

//         {/* Hero Section - Mobile Optimized */}
//         <div className="mb-8 sm:mb-12 md:mb-16">
//           <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border border-white/30 sm:border-2 sm:border-white/40 shadow-xl sm:shadow-2xl max-w-6xl mx-auto">
//             <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8">
//               <CardTitle className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight tracking-tight">
//                 🚀 Best Site to Buy LinkedIn Connections Cheap
//               </CardTitle>
//               <CardDescription className="font-body text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal tracking-normal">
//                 Purchase LinkedIn connections for sale with TechInRent's safe LinkedIn connection service. Get targeted LinkedIn connections with real-time delivery. Increase LinkedIn connections instantly to boost LinkedIn profile connections and grow your network with real connections.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="text-center">
//               <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-8">
//                 <div className="font-heading text-6xl font-bold text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text mb-4 tracking-tight">
//                   {formatCurrency(2)}
//                 </div>
//                 <div className="font-body text-xl font-semibold text-gray-700 tracking-normal">
//                   for 25-50 connections
//                 </div>
//               </div>
//               <Button
//                 onClick={handleOrderClick}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
//               >
//                 {isLoading ? 'Loading...' : '🛒 Order Now'}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Features Grid - Mobile Optimized */}
//         <div className="mb-8 sm:mb-12 md:mb-16">
//           <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent px-3 sm:px-4 leading-tight tracking-tight">
//             Why TechInRent is the Best Site to Buy LinkedIn Connections?
//           </h2>
//           <div className="mobile-grid px-3 sm:px-4">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-lg border border-white/30 sm:border-2 sm:border-white/40 shadow-lg sm:shadow-xl mobile-card touch-manipulation"
//               >
//                 <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
//                   <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white">
//                     {feature.icon}
//                   </div>
//                   <CardTitle className="font-heading text-base sm:text-lg md:text-xl font-semibold text-gray-800 leading-tight tracking-normal">
//                     {feature.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
//                   <p className="font-body text-sm sm:text-base text-gray-600 text-center leading-relaxed font-normal tracking-normal">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* SEO Content Section */}
//         <div className="mb-16">
//           <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-5xl mx-auto">
//             <CardHeader>
//               <CardTitle className="font-heading text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center tracking-tight">
//                 Where to Buy LinkedIn Connections Cheap - TechInRent Guide
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="prose prose-lg max-w-none">
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4 tracking-normal">🔥 Buy Bulk LinkedIn Connections Online</h3>
//                   <p className="font-body text-gray-700 mb-4 font-normal tracking-normal">
//                     TechInRent's LinkedIn connection service offers the most efficient way to <strong>purchase LinkedIn connections</strong> and grow your professional network. Our <strong>auto LinkedIn connection</strong> system ensures you get <strong>real LinkedIn connections</strong> from verified profiles.
//                   </p>
//                   <p className="font-body text-gray-700 font-normal tracking-normal">
//                     Whether you need to <strong>increase LinkedIn connections</strong> for business growth or personal branding, TechInRent provides <strong>targeted LinkedIn connections</strong> that match your industry and goals.
//                   </p>
//                 </div>
//                 <div>
//                   <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4 tracking-normal">⚡ Real-Time LinkedIn Growth Service</h3>
//                   <p className="font-body text-gray-700 mb-4 font-normal tracking-normal">
//                     Our <strong>TechInRent auto LinkedIn connections</strong> technology delivers <strong>real-time LinkedIn connections</strong> within 24-48 hours. The <strong>safe LinkedIn connection service</strong> guarantees authentic engagement without any risk to your profile.
//                   </p>
//                   <p className="font-body text-gray-700 font-normal tracking-normal">
//                     <strong>Buy LinkedIn connections via crypto payment</strong> for maximum privacy and security. TechInRent accepts TRC-20 USDT, BEP-20 USDT, and Binance Pay for convenient <strong>LinkedIn connections for sale</strong> transactions.
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-50 rounded-xl p-6">
//                 <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4 text-center tracking-normal">
//                   🌟 Why Choose TechInRent LinkedIn Boost?
//                 </h3>
//                 <div className="grid md:grid-cols-3 gap-6 text-center">
//                   <div>
//                     <h4 className="font-semibold text-blue-700 mb-2">Fast Delivery Service</h4>
//                     <p className="text-sm text-blue-600">
//                       <strong>Get LinkedIn connections fast</strong> with our automated delivery system
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-purple-700 mb-2">Increase Popularity</h4>
//                     <p className="text-sm text-purple-600">
//                       <strong>Increase LinkedIn popularity with connections</strong> and boost your profile visibility
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-indigo-700 mb-2">Network Growth</h4>
//                     <p className="text-sm text-indigo-600">
//                       <strong>Grow LinkedIn network with real connections</strong> from active professionals
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Pricing Preview */}
//         <div className="mb-16" id="pricing">
//           <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-4xl mx-auto">
//             <CardHeader className="text-center">
//               <CardTitle className="text-fluid-3xl heading-display bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                 💰 Affordable Pricing for Every Need
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-3 gap-6 mb-8">
//                 <div className="text-center bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6">
//                   <div className="text-fluid-4xl font-display font-black text-green-600 mb-2" style={{ letterSpacing: '-0.03em' }}>
//                     {formatCurrency(2)}
//                   </div>
//                   <div className="text-fluid-sm heading-secondary font-semibold text-green-700">25-50 Connections</div>
//                 </div>
//                 <div className="text-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-6">
//                   <div className="text-fluid-4xl font-display font-black text-blue-600 mb-2" style={{ letterSpacing: '-0.03em' }}>
//                     {formatCurrency(10)}
//                   </div>
//                   <div className="text-fluid-sm heading-secondary font-semibold text-blue-700">1,000 Connections</div>
//                 </div>
//                 <div className="text-center bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl p-6">
//                   <div className="text-fluid-4xl font-display font-black text-purple-600 mb-2" style={{ letterSpacing: '-0.03em' }}>
//                     {formatCurrency(55)}
//                   </div>
//                   <div className="text-fluid-sm heading-secondary font-semibold text-purple-700">10,000 Connections</div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <Button
//                   onClick={handleOrderClick}
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 text-white px-12 py-6 text-fluid-xl btn-text rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 font-display"
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center gap-2 text-fluid-lg font-semibold">Loading...</span>
//                   ) : (
//                     <span className="flex items-center gap-2 text-fluid-xl font-black" style={{ letterSpacing: '-0.02em' }}>
//                       🛒 View All Pricing & Order
//                     </span>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Additional SEO Content Section */}
//         <div className="mb-16">
//           <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-6xl mx-auto">
//             <CardContent className="p-8">
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 How to Get Auto LinkedIn Connections Safely</h2>
//                   <p className="text-gray-700 mb-4">
//                     TechInRent provides the safest way to <strong>get LinkedIn connections fast</strong> through our advanced <strong>auto LinkedIn connection</strong> technology. Our <strong>real-time LinkedIn connections</strong> service ensures you receive authentic connections from verified profiles.
//                   </p>
//                   <ul className="list-disc list-inside text-gray-600 space-y-2">
//                     <li>100% safe and secure process</li>
//                     <li>No risk to your LinkedIn profile</li>
//                     <li>Real-time delivery within 24-48 hours</li>
//                     <li>Verified professional connections</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4">💳 Buy LinkedIn Connections Via Crypto Payment</h3>
//                   <p className="text-gray-700 mb-4">
//                     <strong>Purchase LinkedIn connections</strong> securely using cryptocurrency for maximum privacy. TechInRent accepts multiple crypto payment methods for your <strong>LinkedIn connections for sale</strong> orders.
//                   </p>
//                   <ul className="list-disc list-inside text-gray-600 space-y-2">
//                     <li><strong>TRC-20 USDT</strong>: Fast Tron network payments</li>
//                     <li><strong>BEP-20 USDT</strong>: Binance Smart Chain support</li>
//                     <li><strong>Binance Pay</strong>: Direct wallet integration</li>
//                     <li>Instant payment verification</li>
//                   </ul>
//                 </div>
//                 <div className="md:col-span-2 lg:col-span-1">
//                   <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 TechInRent LinkedIn Boost Benefits</h3>
//                   <p className="text-gray-700 mb-4">
//                     Experience the power of our <strong>TechInRent LinkedIn boost</strong> service to <strong>increase LinkedIn popularity with connections</strong> and expand your professional network.
//                   </p>
//                   <ul className="list-disc list-inside text-gray-600 space-y-2">
//                     <li><strong>Boost LinkedIn profile connections</strong> instantly</li>
//                     <li><strong>Grow LinkedIn network with real connections</strong></li>
//                     <li><strong>Buy targeted LinkedIn connections</strong> by industry</li>
//                     <li><strong>Fast delivery LinkedIn connections service</strong></li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-50 rounded-xl p-6">
//                 <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
//                   Why TechInRent is the Best Site to Buy LinkedIn Connections?
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="text-lg font-semibold text-blue-700 mb-3">🏆 Industry Leading Service</h4>
//                     <p className="text-gray-700">
//                       As the <strong>best site to buy LinkedIn connections</strong>, TechInRent offers unmatched quality and reliability. Our <strong>TechInRent auto LinkedIn connections</strong> system is trusted by thousands of professionals worldwide.
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-purple-700 mb-3">💰 Affordable Pricing</h4>
//                     <p className="text-gray-700">
//                       <strong>Where to buy LinkedIn connections cheap?</strong> TechInRent offers competitive pricing starting at just $2. <strong>Buy bulk LinkedIn connections online</strong> with significant discounts for larger orders.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Back to Home */}
//         <div className="text-center">
//           <Button
//             onClick={() => window.location.href = '/'}
//             variant="outline"
//             className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 px-8 py-4 text-lg font-semibold rounded-xl"
//           >
//             ← Back to Home
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   Zap, Shield, TrendingUp, Users, Clock, CheckCircle, 
//   ArrowRight, ShoppingCart, BadgeCheck, Rocket, Sparkles
// } from 'lucide-react';
// import { formatCurrency, scrollToSection } from '@/lib/utils';
// import { shouldReduceAnimations, getOptimizedAnimationDuration } from '@/lib/mobile-performance';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';
// import Footer from '@/components/Footer';

// export default function BuyConnectionsPage() {
//   const [, setLocation] = useLocation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [animationDuration, setAnimationDuration] = useState(200);

//   useEffect(() => {
//     setAnimationDuration(getOptimizedAnimationDuration(200));
//   }, []);

//   const handleOrderClick = () => {
//     setIsLoading(true);
//     scrollToSection('pricing');
//     setTimeout(() => setLocation('/select-package'), 500);
//   };

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
//       <div className="relative container mx-auto px-5 py-12 max-w-7xl">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="mb-8 flex justify-center">
//             <Logo size="lg" />
//           </div>
//           <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
//             <Sparkles className="w-5 h-5 mr-2" />
//             <span className="font-medium">Premium LinkedIn Growth</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//             Grow Your Professional Network with <br className="hidden md:block" />
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Real LinkedIn Connections
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Get authentic, targeted LinkedIn connections delivered fast and safely to boost your professional presence
//           </p>
//         </div>

//         {/* Hero Card */}
//         <div className="mb-20">
//           <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden max-w-4xl mx-auto relative">
//             <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
//             <CardHeader className="text-center pt-12 pb-8 px-8">
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <Rocket className="w-6 h-6 text-blue-600" />
//                 <CardTitle className="text-3xl font-bold text-gray-900">
//                   Premium LinkedIn Connections
//                 </CardTitle>
//               </div>
//               <CardDescription className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 Purchase LinkedIn connections with TechInRent's safe connection service. Get targeted connections with real-time delivery.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="px-8 pb-12">
//               {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border border-blue-100">
//                 <div className="text-5xl font-bold text-blue-600 mb-2">
//                   {formatCurrency(2)}
//                 </div>
//                 <div className="text-lg font-semibold text-gray-700">
//                   for 25-50 premium connections
//                 </div>
//               </div> */}
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border border-blue-100 shadow-sm text-center flex flex-col items-center justify-center">
//   <div className="text-2xl font-semibold text-blue-700 mb-2">
//     Boost Your LinkedIn Outreach
//   </div>
//   <div className="text-md text-gray-600 max-w-md">
//     Get access to premium, verified LinkedIn profiles for maximum visibility and engagement.
//   </div>
// </div>

//               <Button
//                 onClick={handleOrderClick}
//                 disabled={isLoading}
//                 className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 text-center flex flex-col items-center justify-center"
//               >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 {isLoading ? 'Processing...' : 'Get Started Now'}
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Features Section */}
//         <div className="mb-20">
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


//       </div>
//     <Footer/>
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
      title: '100% Safe',
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-50 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-purple-50 to-transparent opacity-30" />
      </div>

      {/* Main Container */}
      <div className="relative container mx-auto px-5 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-medium">Premium LinkedIn Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Grow Your Professional Network with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real LinkedIn Connections
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get authentic, targeted LinkedIn connections delivered fast and safely to boost your professional presence
          </p>
        </div>

        {/* Hero Card */}
        <div className="mb-20">
          <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden max-w-4xl mx-auto relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
            <CardHeader className="text-center pt-12 pb-8 px-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Premium LinkedIn Connections
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-gray-600 max-w-3xl mx-auto">
                Purchase LinkedIn connections with TechInRent's safe connection service. Get targeted connections with real-time delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-12">
            <div className=" rounded-2xl p-8 mb-10 border border-blue-100 shadow-md">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
    {coreBenefits.map((benefit, index) => (
      <div
        key={index}
        className=" bg-gradient-to-r from-blue-50 to-purple-50 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center gap-4"
      >
        <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-2xl">
          {benefit.icon}
        </div>
        <div className="font-semibold text-gray-800 text-lg">{benefit.title}</div>
       
      </div>
    ))}
  </div>
</div>

              <Button
                onClick={handleOrderClick}
                disabled={isLoading}
                className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 items-center justify-center flex flex-col text-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isLoading ? 'Processing...' : 'Get Started Now'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Professionals Choose TechInRent
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our premium service delivers real results for your LinkedIn growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all h-full group"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20" id="pricing">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparent Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your professional growth needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  <div className="absolute -top-4 left-0 right-0 mx-auto bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full w-max shadow-md">
                    MOST POPULAR
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-2 border-blue-300 shadow-xl' : 'border border-gray-200'}`}>
                  <CardHeader className="pt-12 pb-6 px-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                      {plan.connections} Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="text-4xl font-bold text-blue-600 mb-6 text-center">
                      {formatCurrency(plan.price)}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={handleOrderClick}
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      {plan.popular ? (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Get Premium
                        </>
                      ) : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our LinkedIn connection service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200  transition-colors">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
            <CardContent className="p-12 text-center text-blue-700">
              <BadgeCheck className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your LinkedIn Presence?
              </h2>
              <p className="text-xl text-blue-600 max-w-2xl mx-auto mb-8">
                Join thousands of professionals who accelerated their career growth with TechInRent
              </p>
              <Button
                onClick={handleOrderClick}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}