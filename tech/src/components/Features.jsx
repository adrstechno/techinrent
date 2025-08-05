import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import ProviderForm from "./ProviderForm";
import ProviderFormPopup from "./ProviderFormPopup";
import {
  ShieldCheck,
  Calendar,
  Headset,
  TrendingUp,
  Network,
  LayoutGrid,
  UserPlus,
  Lock,
  Target
} from "lucide-react";

const Features = () => {
  const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);

  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const scaleFadeIn = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureCards = [
    {
      title: "High Quality Profiles",
      icon: <ShieldCheck className="text-primary h-6 w-6" />,
      items: [
        "Compatible with tools like HeyReach, PhantomBuster, La Growth Machine",
        "One profile = up to 10 real leads/month"
      ]
    },
    {
      title: "Fast Delivery",
      icon: <Calendar className="text-primary h-6 w-6" />,
      items: [
        "<5% restriction rate",
        "Delivered in 72 hours"
      ]
    },
    {
      title: "Support & Billing",
      icon: <Headset className="text-primary h-6 w-6" />,
      items: [
        "Monthly billing",
        "Responsive support (5 days/week)"
      ]
    }
  ];

  const useCases = [
    "Generate thousands of weekly B2B leads",
    "Run A/B tests on account messaging",
    "Delegate prospecting without account bans",
    "Protect your core brand accounts"
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Why Choose TechInRent?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleFadeIn}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center">
                {card.title}
              </h3>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 shadow mb-12"
        >
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">
            Use Cases
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">{useCase}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section for Providers */}
        <motion.div
          id="benefits"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Benefits for LinkedIn Account Providers
          </h2>
          <motion.div
            variants={fadeIn}
            className="bg-white border-2 border-secondary/20 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold mb-3">
              Monetize Your LinkedIn Account Securely & Passively
            </h3>
            <p className="text-gray-700 mb-4">
              Turn your professional LinkedIn account into a revenue-generating asset by renting it to verified businesses through our secure system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-secondary mb-2">
                  Why Partner With Us?
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">•</span>
                    Passive monthly income
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">•</span>
                    Zero technical involvement required
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">•</span>
                    Account protection ensured
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">•</span>
                    Fully compliant process
                  </li>
                </ul>
              </div>
              <div className="bg-secondary/5 p-4 rounded-lg">
                <h4 className="font-semibold text-secondary mb-2">
                  Who Uses Your Account?
                </h4>
                <p className="text-sm">
                  We work with vetted, corporate clients who need accounts for outbound communication, lead generation, and business outreach — not for personal use or spam.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsProviderFormOpen(true)}
              className="bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white"
            >
              Become a Provider
            </Button>
          </motion.div>
        </motion.div>

        {/* Requirements Section for Providers */}
        <motion.div
          id="requirements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Provider Requirements
          </h2>
          <motion.div
            variants={fadeIn}
            className="bg-white border-2 border-primary/20 rounded-xl p-6 shadow-md max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Minimum Requirements to Become a Provider
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-3">
                  Account Requirements
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>LinkedIn account must be at least 6 months old</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Minimum 500+ connections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Complete professional profile with photo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>No recent account restrictions or bans</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">
                  Provider Requirements
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Must be 18+ years old</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Valid government-issued ID for verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Reliable internet connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Agree to our terms and conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Provider Form Popup */}
      <ProviderFormPopup
        isOpen={isProviderFormOpen}
        onClose={() => setIsProviderFormOpen(false)}
      />
    </section>
  );
};

export default Features;

