import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Linkedin,
  Users,
  Database,
  MessageCircle,
  TrendingUp,
  Shield,
  Globe,
  Award
} from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Welcome = () => {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open dialog after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserTypeSelect = (type) => {
    // Save user type in localStorage
    localStorage.setItem('userType', type);
    setIsOpen(false);
    // Navigate to the main application
    setLocation("/home");
  };

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureItems = [
    { icon: <Shield className="h-6 w-6 text-primary" />, text: "Secure & Trusted" },
    { icon: <Award className="h-6 w-6 text-primary" />, text: "Premium Accounts" },
    { icon: <Globe className="h-6 w-6 text-primary" />, text: "Global Network" },
    { icon: <TrendingUp className="h-6 w-6 text-primary" />, text: "Proven Results" },
    { icon: <MessageCircle className="h-6 w-6 text-primary" />, text: "24/7 Support" }
  ];

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TechInRent - LinkedIn Account Rental Platform",
    "url": "https://techinrent.com",
    "description": "Rent verified LinkedIn accounts for your business outreach. Providers can earn money for each account.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://techinrent.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-skyblue">
      <SEO
        title="TechInRent - LinkedIn Rent | Buy LinkedIn on Rent | Earn Money"
        description="TechInRent - Leading LinkedIn renting service. Buy LinkedIn accounts on rent for lead generation or earn money by renting your LinkedIn account. Increase leads with verified profiles from our trusted marketplace."
        keywords="techinrent, linkedin rent, linkedin renting service, buy linkedin, earn money by renting linkedin accounts, buy linkedin on rent, increase leads by renting linkedin, linkedin account rental, linkedin marketplace, rent linkedin profile, verified linkedin accounts, linkedin account marketplace, rent verified linkedin, linkedin lead generation, linkedin business accounts, linkedin premium accounts, social media account rental, professional account rental, linkedin networking service, linkedin sales navigator rental, linkedin premium rental, linkedin account provider, linkedin taker, linkedin provider, social selling accounts, b2b lead generation, sales prospecting tools, linkedin connection building, professional profile access, linkedin outreach tools, social media marketing, digital marketing tools, online networking platform, business development tools, sales enablement platform, linkedin sales tools, social selling platform, network expansion service, linkedin growth service, linkedin marketing platform"
        structuredData={websiteStructuredData}
      />

      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200 opacity-20" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-yellow-200 opacity-20" />
        <div className="absolute top-1/3 left-10 w-16 h-16 rounded-full bg-blue-300 opacity-30" />
        <div className="absolute bottom-40 right-20 w-20 h-20 rounded-full bg-blue-400 opacity-25" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div className="flex justify-center mb-4">
            <Logo size="lg" animated={true} />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-xl text-neutral-dark max-w-md mx-auto h-8"
          >
            <TypeWriter
              texts={[
                "The premier platform for LinkedIn account rentals",
                "Boost your business with professional accounts",
                "Expand your network and reach within minutes",
                "Secure and reliable LinkedIn solutions"
              ]}
              typingSpeed={70}
              className="font-medium"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 max-w-2xl mb-8"
        >
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md"
            >
              {item.icon}
              <span className="ml-2 text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-2 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0px 0px 10px rgba(79, 171, 247, 0.4)",
                "0px 0px 20px rgba(79, 171, 247, 0.8)",
                "0px 0px 10px rgba(79, 171, 247, 0.4)"
              ],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white py-3 px-8 rounded-full font-medium flex items-center shadow-lg"
          >
            <Linkedin className="mr-2 h-5 w-5" />
            Connect Now
          </motion.button>
        </motion.div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Logo size="md" />
            </div>
            <DialogTitle className="sr-only">Choose Your Role</DialogTitle>
            <DialogDescription className="text-center">
              Choose your role to get started with our LinkedIn account rental service.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-2 px-1">
            <div className="flex justify-around mb-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-xs font-medium">Secure & Trusted</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                <span className="text-xs font-medium">Premium Accounts</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <span className="text-xs font-medium">Global Network</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 py-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUserTypeSelect('taker')}
              className="flex flex-col h-36 w-full items-center justify-center bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 ease-in-out shadow-lg rounded-xl cursor-pointer"
            >
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Linkedin className="h-7 w-7" />
              </div>
              <span className="font-bold text-lg">LinkedIn Taker</span>
              <span className="text-xs mt-1 text-white/80">Rent an account</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUserTypeSelect('provider')}
              className="flex flex-col h-36 w-full items-center justify-center bg-gradient-to-b from-purple-500 to-indigo-700 text-white transition-all duration-300 ease-in-out shadow-lg rounded-xl cursor-pointer"
            >
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Users className="h-7 w-7" />
              </div>
              <span className="font-bold text-lg">LinkedIn Provider</span>
              <span className="text-xs mt-1 text-white/80">List your account</span>
            </motion.div>
          </div>

          <DialogFooter className="sm:justify-center">
            <p className="text-xs text-neutral-dark text-center">
              By continuing, you agree to our{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Welcome;
