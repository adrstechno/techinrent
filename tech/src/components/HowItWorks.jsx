import { motion } from "framer-motion";
import {
  Search,
  CreditCard,
  Timer,
  ShieldCheck
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Browse & Select",
      description: "Choose from our verified LinkedIn accounts based on your industry and target audience needs.",
      icon: <Search className="h-8 w-8 text-primary" />
    },
    {
      number: "2",
      title: "Secure Payment",
      description: "Complete your rental agreement with our secure payment system and flexible terms.",
      icon: <CreditCard className="h-8 w-8 text-primary" />
    },
    {
      number: "3",
      title: "Quick Access",
      description: "Get instant access to your rented LinkedIn account with full credentials and guidelines.",
      icon: <Timer className="h-8 w-8 text-primary" />
    },
    {
      number: "4",
      title: "Start Outreach",
      description: "Begin your campaigns immediately. Connect, engage, and grow your business fast with reliable LinkedIn profiles.",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <section id="how-it-works" className="py-10  relative overflow-hidden">
      {/* Optimized background elements for mobile performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 6,
              repeat: Infinity
            }
          }}
          className="absolute top-20 -right-32 w-64 h-64 rounded-full bg-primary opacity-5"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            transition: {
              duration: 4,
              repeat: Infinity
            }
          }}
          className="absolute bottom-40 left-10 w-16 h-16 rounded-full bg-secondary opacity-10"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content (2/3 width) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0">
                Get started with our LinkedIn account rental service in just 4 simple steps
              </p>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex-shrink-0 flex items-center sm:mr-6 mb-4 sm:mb-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <div className="sm:hidden">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700">
                      {step.description}
                    </p>
                  </div>
                  <div className="hidden sm:block flex-shrink-0 ml-4">
                    {step.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-6">
                  <span className="text-4xl text-primary">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Ready to Scale Your Business?</h3>
                  <p className="text-gray-700 mt-1">
                    Our LinkedIn accounts are ready to help you reach your growth targets. Most clients see results within the first week of using our service.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle section info card
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-primary mb-4">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-4">
                Our streamlined process makes it easy to rent both verified (500+ connections) and non-verified LinkedIn accounts to supercharge your outreach campaigns.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <span className="text-sm">Choose your account type</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <span className="text-sm">Complete the rental agreement</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <span className="text-sm">Get access within 24 hours</span>
                </div>
              </div>
              <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">24/7 Support available</span> - Our team is here to help you maximize your LinkedIn outreach success.
                </p>
              </div>
            </motion.div>

            <div className="mt-8">
              <ContactForm
                title="Get Started Today"
                subtitle="Fill out this form and our team will contact you within 24 hours."
                className="bg-white rounded-xl shadow-lg p-6"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}