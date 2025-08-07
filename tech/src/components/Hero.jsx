import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  Linkedin,
  Users,
  ChevronRight,
  BarChart,
  Target,
  Shield,
  Wallet,
  Settings,
  MessageCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import BookDemoForm from "./BookDemoForm";
import { useLocation } from "wouter";

export default function Hero() {
  const [userType, setUserType] = useState(null);
  const [isBookingDemo, setIsBookingDemo] = useState(false);
 const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user type is stored in localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const takerFeatures = [
    { text: "Access to verified, high-quality LinkedIn profiles" },
    { text: "Protect your main account from potential restrictions" },
    { text: "Scale your outreach without limits" },
    { text: "Professional profiles with real connections" }
  ];

  const providerBenefits = [
    { text: "Earn passive income from your LinkedIn account" },
    { text: "Secure and monitored usage by verified businesses" },
    { text: "No impact on your personal LinkedIn activity" },
    { text: "Monthly payments guaranteed" }
  ];

  const renderContent = () => {
    if (userType === 'taker') {
      return (
        <div>
          <motion.h1
            variants={fadeIn}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
          >
            Rent Premium LinkedIn Accounts for Your Business
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-body mt-4 text-base sm:text-lg text-gray-700 mb-8"
          >
            Unlock high-quality LinkedIn profiles to accelerate your lead generation, sales, or recruitment efforts — all without putting your own account at risk.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-8"
          >
            <h3 className="font-heading font-semibold text-xl flex items-center text-primary tracking-normal mb-4">
              <Check className="h-6 w-6 mr-2" /> Ideal For
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                B2B Lead Generation & SDR Teams
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                Recruiting Agencies
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                Digital Marketing & Growth Agencies
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                Corporate Teams looking to scale outreach
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-8"
          >
            <h3 className="font-bold text-xl flex items-center text-primary mb-4">
              <Check className="h-6 w-6 mr-2" /> Why Rent LinkedIn Accounts?
            </h3>
            <div className="mt-4 space-y-2">
              {takerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <ChevronRight className="h-5 w-5 text-secondary mr-2" />
                  {feature.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-8"
          >
            <h3 className="font-bold text-xl flex items-center text-primary mb-4">
              <Check className="h-6 w-6 mr-2" /> Use Cases
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Generate thousands of weekly B2B leads
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Run A/B tests on account messaging
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Delegate prospecting without account bans
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                Protect your core brand accounts
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => setLocation("/home")}
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
            >
                <Linkedin className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button
         onClick={() => setLocation("/home")}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
            </Button>
          </motion.div>
        </div>
      );
    } else if (userType === 'provider') {
      return (
        <div>
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4"
          >
            Earn Money with Your LinkedIn Account
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mt-4 text-base sm:text-lg text-gray-700 mb-8"
          >
            Turn your professional LinkedIn account into a revenue-generating asset by renting it to verified businesses through our secure system.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="mt-8"
          >
            <h3 className="font-bold text-xl flex items-center text-secondary mb-4">
              <Check className="h-6 w-6 mr-2" /> Why Partner With Us?
            </h3>
            <div className="mt-4 space-y-2">
              {providerBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <ChevronRight className="h-5 w-5 text-primary mr-2" />
                  {benefit.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8">
            <h3 className="font-bold text-xl flex items-center text-secondary mb-4">
              <Check className="h-6 w-6 mr-2" /> Who Uses Your Account?
            </h3>
            <motion.p
              variants={fadeIn}
              className="mt-4 p-6 bg-white rounded-lg shadow-md text-gray-700"
            >
              We work with vetted, corporate clients who need accounts for outbound communication, lead generation, and business outreach — not for personal use or spam.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8">
            <h3 className="font-bold text-xl flex items-center text-secondary mb-4">
              <Check className="h-6 w-6 mr-2" /> How It Works
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto">
                  <Settings className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Secure Access</h4>
                <p className="text-sm text-gray-600">You provide access via our secure launcher</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Safe Management</h4>
                <p className="text-sm text-gray-600">Your account is warmed up and managed safely</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto">
                  <Wallet className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Earn Monthly</h4>
                <p className="text-sm text-gray-600">You earn passive income monthly</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollToSection("pricing")}
              className="bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary"
            >
              Get Started
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      );
    } else {
      // Default content if no user type is detected
      return (
        <div className="text-center">
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Welcome to TechInRent
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 mb-8"
          >
            Please select whether you're a LinkedIn Taker or Provider on the welcome page.
          </motion.p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
          >
            Go to Welcome Page
          </Button>
        </div>
      );
    }
  };

  return (
    <section className="bg-skyblue text-black py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            transition: {
              duration: 20,
              ease: "linear",
              repeat: Infinity
            }
          }}
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary opacity-5"
          style={{ willChange: 'transform' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            }
          }}
          className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-secondary opacity-5"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Main content (2/3 width) */}
          <div className="lg:col-span-2">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {renderContent()}
            </motion.div>
          </div>

         
        </div>
      </div>

    </section>
  );
}