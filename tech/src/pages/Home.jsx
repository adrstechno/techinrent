import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import ProviderFormPopup from "@/components/ProviderFormPopup";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const Home = () => {
  const [userType, setUserType] = useState(null);
  const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user type is stored in localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      // If no user type is found, redirect to welcome page
      setLocation('/');
    }
  }, [setLocation]);

  // If no user type yet, show loading or return to welcome page
  if (!userType) {
    return (
      <div className="flex items-center justify-center h-screen bg-skyblue">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-4 tracking-normal">
            Loading...
          </h2>
          <p className="font-body font-normal tracking-normal">
            Please select your user type on the welcome page.
          </p>
        </div>
      </div>
    );
  }

  const handleOpenProviderForm = () => {
    setIsProviderFormOpen(true);
  };

  const handleCloseProviderForm = () => {
    setIsProviderFormOpen(false);
  };

  // Define SEO content based on user type
  const seoTitle = userType === 'taker' 
    ? "Rent LinkedIn Accounts - TechInRent LinkedIn Account Rental Service" 
    : "Earn Money - Provide Your LinkedIn Account on TechInRent";

  const seoDescription = userType === 'taker'
    ? "Rent verified LinkedIn accounts for your business outreach and marketing campaigns. Scale your LinkedIn prospecting with TechInRent's secure account rental service."
    : "Earn money by providing your LinkedIn account on TechInRent. Secure, trusted process with guaranteed monthly payments and zero technical involvement.";

  const seoKeywords = userType === 'taker'
    ? "linkedin accounts, linkedin rental, b2b prospecting, linkedin outreach, rent linkedin profile, business networking accounts"
    : "earn money linkedin, monthly income linkedin, passive income linkedin, provide linkedin account, linkedin account monetization";

  // Structured data based on user type
  const structuredData = userType === 'taker' 
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "LinkedIn Account Rental Service",
        "description": "Rent verified LinkedIn accounts for your business outreach and marketing campaigns.",
        "provider": {
          "@type": "Organization",
          "name": "TechInRent",
          "url": "https://techinrent.com"
        },
        "serviceType": "LinkedIn Account Rental",
        "areaServed": "Worldwide",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "price": "Variable",
          "priceCurrency": "USD"
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "LinkedIn Account Provider Program",
        "description": "Earn money by providing your LinkedIn account through our secure platform.",
        "provider": {
          "@type": "Organization",
          "name": "TechInRent",
          "url": "https://techinrent.com"
        },
        "serviceType": "LinkedIn Account Monetization",
        "areaServed": "Worldwide",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={structuredData}
      />
      <Navbar userType={userType} />
      <main className="flex-grow">
        {userType === 'taker' ? (
          <>
            {/* LinkedIn Taker content */}
            <Hero />
            <HowItWorks />
            <Pricing />
            <Features />
            <Testimonials />
            <FAQ />
            <Contact />
          </>
        ) : (
          <>
            {/* LinkedIn Provider content */}
            <Hero />
            {/* Added spacing between sections */}
            <div className="py-12"></div>
            <Features />
            <FAQ />
            {/* Single Provider Form Button */}
            <div className="py-8 text-center">
              <Button
                onClick={handleOpenProviderForm}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Become a Provider
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
      {/* Provider Form Popup */}
      <ProviderFormPopup
        isOpen={isProviderFormOpen} 
        onClose={handleCloseProviderForm} 
      />
    </div>
  );
};

export default Home;
