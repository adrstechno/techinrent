import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  Users,
  ChevronRight,
  BarChart,
  Target,
  Building2
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function HeroTaker() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    { text: "Access to verified, high-quality LinkedIn profiles" },
    { text: "No risk to your personal or company accounts" },
    { text: "Scale outreach without LinkedIn restrictions" },
    { text: "Professional profiles with established networks" }
  ];

  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 text-black py-16 md:py-24 relative">
      {/* Background decorations */}
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
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 4,
              repeat: Infinity
            }
          }}
          className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-secondary opacity-5"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main content (2/3 width) */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Rent Premium LinkedIn Accounts
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Unlock high-quality LinkedIn profiles to accelerate your lead generation, sales, or recruitment efforts — all without putting your own account at risk.
              </p>

              <motion.div
                variants={fadeIn}
                className="mt-8"
              >
                <h3 className="font-bold text-xl flex items-center text-primary">
                  <Check className="h-6 w-6 mr-2" /> Ideal For
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center bg-white rounded-lg p-3 shadow">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    B2B Lead Generation & SDR Teams
                  </div>
                  <div className="flex items-center bg-white rounded-lg p-3 shadow">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Building2 className="h-5 w-5 text-primary" />
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
                <h3 className="font-bold text-xl flex items-center text-primary">
                  <Check className="h-6 w-6 mr-2" /> Why Rent LinkedIn Accounts?
                </h3>
                <div className="mt-4 space-y-2">
                  {features.map((feature, index) => (
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

              <motion.div variants={fadeIn} className="mt-8">
                <h3 className="font-bold text-xl flex items-center text-primary">
                  <Check className="h-6 w-6 mr-2" /> Use Cases
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Browse Accounts
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="bg-white hover:bg-gray-50 text-primary border-primary px-8 py-3 rounded-lg font-semibold"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Contact form (1/3 width) */}
          <div className="lg:col-span-1">
            <ContactForm
              title="Get Started Today"
              subtitle="Access premium LinkedIn accounts for your business growth"
              className="bg-white rounded-xl shadow-lg p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}