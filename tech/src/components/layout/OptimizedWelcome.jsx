import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/components/service/Logo";
import SEO from "@/components/service/SEO";
import { Briefcase, Target,  Megaphone, UserSearch, Building, Zap, Wallet } from "lucide-react"
import {
  ServiceStructuredData,
  FAQStructuredData,
} from "@/components/service/ServiceSchema";
import {
  Rocket,
  DollarSign,
  Shield,
  HelpCircle,
  Users,
  UserPlus,
  BarChart2,
  TrendingUp,
  BadgeCheck,
  Mail,
  Phone,
  MessageSquare,
  Instagram,
  Twitter,
  Send,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function OptimizedWelcome() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserTypeSelect = (type) => {
    localStorage.setItem("userType", type);
    if (type === "taker") {
      setLocation("/buy-linkedin-on-rent");
    } else {
      setLocation("/earn-money-linkedin");
    }
  };

  const websiteStructuredData = {
    // Same structured data
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <SEO
        title=" Buy Real LinkedIn Connections Starting $2 - TechInRent | LinkedIn Growth Service"
        description="Rent real LinkedIn connections from $2. TechInRent offers verified LinkedIn growth services. No login required, 24-48hr delivery, 100% safe process."
        keywords="Rent linkedin connections, real linkedin connections, linkedin connections $2, linkedin growth service, techinrent"
        structuredData={websiteStructuredData}
      />
      <ServiceStructuredData />
      <FAQStructuredData />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex items-center justify-between">
          <Logo size="md" animated={true} className="h-10 w-auto" />
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/moreService"
              className="text-gray-700 hover:text-indigo-600 transition-colors text-lg font-semibold"
            >
              Services
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-indigo-600 transition-colors text-lg font-semibold"
            >
              Why Us
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition-colors text-lg font-semibold"
            >
              Contact
            </a>
            <Button
              onClick={() => setLocation("/buy-linkedin-on-rent")}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
                         hover:from-indigo-700 hover:to-blue-700 
                         rounded-full px-6 py-2 shadow-md hover:shadow-lg 
                         transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white 
                      transform transition-transform duration-300 
                      ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="px-6 py-8 flex flex-col space-y-6 text-center">
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Services
            </a>
            <a
              href="#benefits"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Why Us
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Contact
            </a>
            <Button
              onClick={() => {
                setLocation("/buy-connections");
                setIsMenuOpen(false);
              }}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
                         hover:from-indigo-700 hover:to-blue-700 
                         rounded-full px-6 py-3 shadow-md hover:shadow-lg 
                         transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8 md:py-2 text-center">
        <Logo size="lg" animated={true} className="mx-auto h-16 w-auto mb-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Grow Your LinkedIn Presence
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Real connections starting at $2. No login required, 24-48hr delivery,
          100% secure process.
        </p>
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl  
                p-6 sm:p-8 md:p-10  
                shadow-xl max-w-3xl w-full mx-auto 
                space-y-8 md:space-y-10 
                border border-indigo-200 hover:border-purple-300 
                transition-all duration-300 
                flex flex-col items-center text-center">

  {/* CTA Button */}
  <Button
    onClick={() => handleUserTypeSelect("taker")}
    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
               hover:from-indigo-700 hover:to-purple-700 
               text-lg sm:text-xl md:text-2xl 
               px-6 sm:px-8 md:px-12 
               py-5 sm:py-7 md:py-10 
               rounded-2xl md:rounded-3xl 
               shadow-xl hover:shadow-purple-500/50 
               transform hover:scale-105 md:hover:scale-110 
               transition-all duration-300 tracking-wide md:tracking-wider 
               font-bold md:font-extrabold 
               flex items-center justify-center gap-4 sm:gap-5 md:gap-6 w-full sm:w-auto"
  >
    <Rocket
      className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 text-white 
                 drop-shadow-[0_0_15px_rgba(168,85,247,0.9)] 
                 animate-bounce"
    />
    Rent LinkedIn Account
  </Button>

  {/* Feature List */}
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 
                 text-gray-700 text-sm sm:text-base md:text-lg font-medium w-full">
    <li className="flex items-center gap-2 sm:gap-3">
      <Building className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      <span>Basically for <span className="font-semibold text-cyan-600">Company</span></span>
    </li>
    <li className="flex items-center gap-2 sm:gap-3">
      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      <span>Grow your <span className="font-semibold text-indigo-600">Business Network</span></span>
    </li>
    <li className="flex items-center gap-2 sm:gap-3">
      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      <span>Boost <span className="font-semibold text-purple-600">Lead Generation</span></span>
    </li>
    <li className="flex items-center gap-2 sm:gap-3">
      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
      <span>Expand <span className="font-semibold text-green-600">Client Outreach</span></span>
    </li>
    <li className="flex items-center gap-2 sm:gap-3">
      <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
      <span>Effective <span className="font-semibold text-pink-600">Marketing</span></span>
    </li>
    <li className="flex items-center gap-2 sm:gap-3">
      <UserSearch className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      <span>Smart <span className="font-semibold text-blue-600">Recruitment</span></span>
    </li>
  </ul>
</div>

      </section>

      {/* Secondary CTAs */}
      
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
      
      {/* Left: Get LinkedIn Connections */}
      <div className="flex flex-col items-center text-center space-y-6 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-200 hover:border-indigo-300">
        <Button
          onClick={() => setLocation("/buy-connections")}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                     hover:from-blue-600 hover:to-indigo-600 
                     flex items-center justify-center gap-3 py-8 rounded-xl 
                     shadow-md hover:shadow-lg transform hover:scale-105 
                     transition-all duration-300 text-xl md:text-2xl font-bold"
        >
          <UserPlus className="w-6 h-6" />
          Get LinkedIn Connections Now
        </Button>
        <ul className="space-y-3 text-gray-700 text-base md:text-lg font-medium">
          <li className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Expand your <span className="font-semibold text-blue-600">Professional Network</span></span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>Get <span className="font-semibold text-indigo-600">Instant Visibility</span></span>
          </li>
        </ul>
      </div>

      {/* Right: Earn Money */}
      <div className="flex flex-col items-center text-center space-y-6 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-200 hover:border-emerald-300">
        <Button
          onClick={() => handleUserTypeSelect("provider")}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                     hover:from-green-600 hover:to-emerald-600 
                     flex items-center justify-center gap-3 py-8 rounded-xl 
                     shadow-md hover:shadow-lg transform hover:scale-105 
                     transition-all duration-300 text-xl md:text-2xl font-bold"
        >
          <DollarSign className="w-6 h-6" />
          Earn Money as a LinkedIn Provider
        </Button>
        <ul className="space-y-3 text-gray-700 text-base md:text-lg font-medium">
          <li className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Enjoy <span className="font-semibold text-green-600">Passive Income</span></span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <span>Monetise your <span className="font-semibold text-emerald-600">LinkedIn Account</span></span>
          </li>
        </ul>
      </div>
    </section>
      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            value: "1000+",
            label: "Verified Accounts",
            icon: BadgeCheck,
            color: "text-indigo-600",
          },
          {
            value: "500+",
            label: "Active Providers",
            icon: Users,
            color: "text-green-600",
          },
          {
            value: "24/7",
            label: "Support Available",
            icon: HelpCircle,
            color: "text-orange-600",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl 
                       transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`text-4xl font-bold ${item.color} mb-2`}>
              {item.value}
            </div>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <item.icon className="w-5 h-5" /> {item.label}
            </p>
          </div>
        ))}
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <Rocket className="w-8 h-8 text-indigo-600" /> LinkedIn Growth
          Services
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
          Empower your professional growth with our tailored LinkedIn services.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Connection Boost",
              icon: <UserPlus className="w-8 h-8 text-blue-600 mb-4" />,
              desc: "Increase visibility with real, targeted connections.",
              points: [
                "No login required",
                "100% safe process",
                "Industry-targeted connections",
              ],
            },
            {
              title: "Auto-Growth",
              icon: <TrendingUp className="w-8 h-8 text-green-600 mb-4" />,
              desc: "Organic growth with daily connections.",
              points: [
                "Connect with decision-makers",
                "Managed by experts",
                "Enhanced profile reputation",
              ],
            },
            {
              title: "Followers",
              icon: <BarChart2 className="w-8 h-8 text-purple-600 mb-4" />,
              desc: "Build authority with organic followers.",
              points: [
                "Instant trust boost",
                "Secure and discreet",
                "Ideal for thought leaders",
              ],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 shadow-md hover:shadow-xl 
                         transform hover:-translate-y-1 transition-all duration-300"
            >
              {card.icon}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                {card.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-indigo-600" /> Why Choose TechInRent?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "No Passwords",
              desc: "Just share your profile URL.",
              icon: <Lock className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
            },
            {
              title: "Secure & Compliant",
              desc: "Real growth, privacy-first.",
              icon: <Shield className="w-8 h-8 text-green-600 mx-auto mb-4" />,
            },
            {
              title: "24/7 Support",
              desc: "Always here to help.",
              icon: (
                <HelpCircle className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              ),
            },
            {
              title: "Real Growth",
              desc: "Authentic professional connections.",
              icon: (
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              ),
            },
          ].map((card, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl 
                         transform hover:-translate-y-1 transition-all duration-300"
            >
              {card.icon}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <MessageSquare className="w-8 h-8 text-indigo-600" /> Contact Us
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10">
          Ready to grow your LinkedIn presence? Reach out today!
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Email",
              value: "vibhanshu@techinrent.com",
              href: "mailto:vibhanshu@techinrent.com",
              icon: <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
            },
            {
              title: "WhatsApp",
              value: "+91-7898711748",
              href: "https://wa.me/917898711748",
              icon: <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />,
            },
            {
              title: "Telegram",
              value: "t.me/techinrentadmin",
              href: "https://t.me/techinrentadmin",
              icon: <Send className="w-8 h-8 text-purple-600 mx-auto mb-4" />,
            },
            {
              title: "Twitter/X",
              value: "@techinrent",
              href: "https://x.com/techinrent",
              icon: (
                <Twitter className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              ),
            },
            {
              title: "Instagram",
              value: "@techinrent",
              href: "https://instagram.com/techinrent",
              icon: (
                <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-4" />
              ),
            },
          ].map((card, i) => (
            <a
              key={i}
              href={card.href}
              className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {card.icon}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 TechInRent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
