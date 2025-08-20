import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  Linkedin,
  Shield,
  Wallet,
  ChevronRight,
  Settings,
} from "lucide-react";
import ContactForm from "../contact/ContactForm";

export default function HeroProvider() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const benefits = [
    { text: "Zero technical involvement required" },
    { text: "Account protection and security guaranteed" },
    { text: "Flexible terms and conditions" },
    { text: "24/7 support and monitoring" },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 text-black py-16 md:py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            transition: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-secondary opacity-5"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 4,
              repeat: Infinity,
            },
          }}
          className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-primary opacity-5"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main content (2/3 width) */}
          <div className="lg:col-span-2">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
                Earn Money with Your LinkedIn Account
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Turn your professional LinkedIn account into a
                revenue-generating asset by renting it to verified businesses
                through our secure system.
              </p>

              <motion.div
                variants={fadeIn}
                className="mt-6 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-secondary rounded-xl p-6 max-w-2xl shadow-lg relative"
              >
                <div className="absolute -right-2 -top-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  LIMITED OFFER
                </div>
                <h3 className="text-2xl font-bold text-secondary flex items-center">
                  <Wallet className="h-6 w-6 mr-2" />
                  Earn Money Guaranteed
                </h3>
                <div className="mt-3 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-gray-700 font-medium">
                    <span className="text-blue-600 font-bold">
                      $500+ MONTHLY PAYMENT
                    </span>{" "}
                    directly into your account for each approved LinkedIn
                    profile
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Payments made on-time, every month
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      No minimum activity requirements
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Bonus opportunities for premium accounts
                    </li>
                  </ul>
                </div>
                <div className="mt-3 text-sm text-gray-700 italic">
                  *Payments begin immediately after account verification and
                  approval
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-8">
                <h3 className="font-bold text-xl flex items-center text-secondary">
                  <Check className="h-6 w-6 mr-2" /> Why Partner With Us?
                </h3>
                <div className="mt-4 space-y-2">
                  {benefits.map((benefit, index) => (
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
                <h3 className="font-bold text-xl flex items-center text-secondary">
                  <Check className="h-6 w-6 mr-2" /> Who Uses Your Account?
                </h3>
                <motion.p
                  variants={fadeIn}
                  className="mt-4 p-6 bg-white rounded-lg shadow-md text-gray-700"
                >
                  We work with vetted, corporate clients who need accounts for
                  outbound communication, lead generation, and business outreach
                  — not for personal use or spam.
                </motion.p>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-8">
                <h3 className="font-bold text-xl flex items-center text-secondary">
                  <Check className="h-6 w-6 mr-2" /> How It Works
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                      <Settings className="h-6 w-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2">Secure Access</h4>
                    <p className="text-sm text-gray-600">
                      You provide access via our secure launcher
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                      <Shield className="h-6 w-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2">Safe Management</h4>
                    <p className="text-sm text-gray-600">
                      Your account is warmed up and managed safely
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-20 h-20 bg-red-500 rotate-45 z-0"></div>
                    <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-3 relative z-10">
                      <Wallet className="h-6 w-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2 relative z-10">
                      Earn Monthly
                    </h4>
                    <p className="text-sm text-gray-600 relative z-10">
                      <span className="font-bold text-blue-600">$500+</span>{" "}
                      Monthly payment direct payment for each LinkedIn account
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Start Earning Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="bg-white hover:bg-gray-50 text-secondary border-secondary px-8 py-3 rounded-lg font-semibold"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Contact form (1/3 width) */}
          <div className="lg:col-span-1">
            <ContactForm
              title="Start Earning Today"
              subtitle="Join thousands of LinkedIn account providers earning monthly income"
              className="bg-white rounded-xl shadow-lg p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
