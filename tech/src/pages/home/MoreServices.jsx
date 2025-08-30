import React, { useState } from "react";
import Logo from "@/components/service/Logo";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Briefcase,
  Users,
  Rocket,
  UserCheck,
  Globe,
  Megaphone,
} from "lucide-react";
import { useLocation } from "wouter";

const MoreServices = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const services = [
    {
      title: "Rent LinkedIn Accounts",
      icon: Briefcase,
      description:
        "Boost outreach safely with verified LinkedIn accounts — perfect for campaigns, sales, and credibility.",
    },
    {
      title: "Lead Generation",
      icon: Users,
      description:
        "Get targeted B2B leads directly from LinkedIn. We connect you with decision-makers who matter.",
    },
    {
      title: "Auto-Growth Connections",
      icon: Rocket,
      description:
        "Scale your LinkedIn network automatically. Authentic, safe, and optimised for engagement.",
    },
    {
      title: "Hiring Support",
      icon: UserCheck,
      description:
        "Save time with LinkedIn-backed hiring. Find skilled candidates faster and smarter.",
    },
    {
      title: "Website Development",
      icon: Globe,
      description:
        "Modern, responsive, and SEO-friendly websites designed to strengthen your brand identity.",
    },
    {
      title: "Digital Marketing",
      icon: Megaphone,
      description:
        "Increase visibility with tailored digital strategies — SEO, social media, ads, and more.",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" animated={true} className="h-10 w-auto" />
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/moreService"
              className="text-gray-700 hover:text-indigo-600 transition-colors text-lg font-semibold"
            >
              Services
            </a>
            <a
              href="/#benefits"
              className="text-gray-700 hover:text-indigo-600 transition-colors text-lg font-semibold"
            >
              Why Us
            </a>
            <a
              href="/#contact"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Logo size="lg" animated={true} className="mx-auto h-16 w-auto mb-6" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Supercharge Your LinkedIn Presence 🚀
        </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
  From LinkedIn account rentals to digital marketing — we provide everything you
  need to grow smarter and faster online. <br /> 
  Generate qualified leads, expand
  your professional network, and strengthen your brand presence without
  compromising security. <br /> 
  Our services are <span className="font-semibold text-indigo-600">trusted by professionals</span>, 
  <span className="font-semibold text-indigo-600">affordable for startups</span>, and
  <span className="font-semibold text-indigo-600"> scalable for businesses</span> of any size.
</p>

        <a href="#services">
        <Button
      
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
                     hover:from-indigo-700 hover:to-blue-700 
                     rounded-full px-8 py-3 shadow-md hover:shadow-lg 
                     transition-all duration-300 hover:text-lg"
        >
          Explore Services
        </Button>
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className=" py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-14 underline">
            What We Offer
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, icon: Icon, description }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center 
                           hover:shadow-2xl hover:scale-105 transition transform duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full mb-4 shadow-md">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-400 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Elevate Your LinkedIn Game?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Whether you need leads, growth, or a stunning digital presence —
          we’ve got the right service for you.
        </p>
        <Button
          onClick={() => setLocation("/buy-linkedin-on-rent")}
          className="bg-white text-indigo-700 font-semibold rounded-full px-8 py-3 shadow-md hover:bg-blue-200 hover:text-lg transition-all"
        >
          Get Started Today
        </Button>
      </section>
    </>
  );
};

export default MoreServices;
