// import React, { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Features from "@/components/Features";
// import HowItWorks from "@/components/HowItWorks";
// import FAQ from "@/components/FAQ";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
// import Pricing from "@/components/Pricing";
// import Testimonials from "@/components/Testimonials";
// import { useLocation } from "wouter";
// import Hero from "@/components/Hero";
// import ProviderFormPopup from "@/components/ProviderFormPopup";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import SEO from "@/components/SEO";
// import ContactForm from "@/components/ContactForm";
// import BookDemoForm from "@/components/BookDemoForm";
// import Logo from "@/components/Logo";

// const Home = () => {
//   const [userType, setUserType] = useState(null);
//   const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);
//   const [, setLocation] = useLocation();
//   const [isBookingDemo, setIsBookingDemo] = useState(false);
//   useEffect(() => {
//     // Check if user type is stored in localStorage
//     const storedUserType = localStorage.getItem('userType');
//     if (storedUserType) {
//       setUserType(storedUserType);
//     } else {
//       // If no user type is found, redirect to welcome page
//       setLocation('/');
//     }
//   }, [setLocation]);

//   // If no user type yet, show loading or return to welcome page
//   if (!userType) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-skyblue">
//         <div className="text-center">
//           <h2 className="font-heading text-2xl font-semibold text-primary mb-4 tracking-normal">
//             Loading...
//           </h2>
//           <p className="font-body font-normal tracking-normal">
//             Please select your user type on the welcome page.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const handleOpenProviderForm = () => {
//     setIsProviderFormOpen(true);
//   };

//   const handleCloseProviderForm = () => {
//     setIsProviderFormOpen(false);
//   };

//   // Define SEO content based on user type
//   const seoTitle = userType === 'taker'
//     ? "Rent LinkedIn Accounts - TechInRent LinkedIn Account Rental Service"
//     : "Earn Money - Provide Your LinkedIn Account on TechInRent";

//   const seoDescription = userType === 'taker'
//     ? "Rent verified LinkedIn accounts for your business outreach and marketing campaigns. Scale your LinkedIn prospecting with TechInRent's secure account rental service."
//     : "Earn money by providing your LinkedIn account on TechInRent. Secure, trusted process with guaranteed monthly payments and zero technical involvement.";

//   const seoKeywords = userType === 'taker'
//     ? "linkedin accounts, linkedin rental, b2b prospecting, linkedin outreach, rent linkedin profile, business networking accounts"
//     : "earn money linkedin, monthly income linkedin, passive income linkedin, provide linkedin account, linkedin account monetization";

//   // Structured data based on user type
//   const structuredData = userType === 'taker'
//     ? {
//       "@context": "https://schema.org",
//       "@type": "Service",
//       "name": "LinkedIn Account Rental Service",
//       "description": "Rent verified LinkedIn accounts for your business outreach and marketing campaigns.",
//       "provider": {
//         "@type": "Organization",
//         "name": "TechInRent",
//         "url": "https://techinrent.com"
//       },
//       "serviceType": "LinkedIn Account Rental",
//       "areaServed": "Worldwide",
//       "offers": {
//         "@type": "Offer",
//         "availability": "https://schema.org/InStock",
//         "price": "Variable",
//         "priceCurrency": "USD"
//       }
//     }
//     : {
//       "@context": "https://schema.org",
//       "@type": "Service",
//       "name": "LinkedIn Account Provider Program",
//       "description": "Earn money by providing your LinkedIn account through our secure platform.",
//       "provider": {
//         "@type": "Organization",
//         "name": "TechInRent",
//         "url": "https://techinrent.com"
//       },
//       "serviceType": "LinkedIn Account Monetization",
//       "areaServed": "Worldwide",
//       "offers": {
//         "@type": "Offer",
//         "availability": "https://schema.org/InStock"
//       }

//     };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <SEO
//         title={seoTitle}
//         description={seoDescription}
//         keywords={seoKeywords}
//         structuredData={structuredData}
//       />
//       <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">

//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Logo size="md" />
//           <div className="flex items-center gap-4">
//             <Button variant="outline" onClick={() => setLocation("/")}>
//               Home
//             </Button>
//             <Button onClick={() => window.history.back()}>
//               Return
//             </Button>
//           </div>
//         </div>


//       </header>
//       <main className="flex-grow">




//         {/* Middle section info card */}
//         <div className="lg:col-span-1">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-xl shadow-lg p-6"
//           >
//             <h3 className="text-lg font-bold text-primary mb-4">Ready to Get Started?</h3>
//             <p className="text-gray-700 mb-4">
//               Our streamlined process makes it easy to rent both verified (500+ connections) and non-verified LinkedIn accounts to supercharge your outreach campaigns.
//             </p>
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
//                   <span className="text-primary font-semibold">1</span>
//                 </div>
//                 <span className="text-sm">Choose your account type</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
//                   <span className="text-primary font-semibold">2</span>
//                 </div>
//                 <span className="text-sm">Complete the rental agreement</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
//                   <span className="text-primary font-semibold">3</span>
//                 </div>
//                 <span className="text-sm">Get access within 24 hours</span>
//               </div>
//             </div>
//             <div className="mt-6 bg-primary/5 p-4 rounded-lg">
//               <p className="text-sm text-gray-700">
//                 <span className="font-semibold">24/7 Support available</span> - Our team is here to help you maximize your LinkedIn outreach success.
//               </p>
//             </div>
//           </motion.div>
//           {/* Side content or CTA (1/3 width) */}
//           <div className="lg:col-span-1">
//             <motion.div
//               // variants={fadeIn}
//               initial="hidden"
//               animate="visible"
//               className="bg-white rounded-xl shadow-lg p-6"
//             >
//               <h3 className="text-xl font-bold text-center mb-4">Ready to Start?</h3>
//               <p className="text-center text-gray-600 mb-4">
//                 {userType === 'taker'
//                   ? "Book a demo and see how we can accelerate your leads"
//                   : "Get started earning with your LinkedIn account today"
//                 }
//               </p>
//               <Button
//                 onClick={() => setIsBookingDemo(true)}
//                 className="w-full"
//               >
//                 {userType === 'taker' ? "Book Demo" : "Get Started"}
//               </Button>
//             </motion.div>
//           </div>
//           <BookDemoForm
//             isOpen={isBookingDemo}
//             onClose={() => setIsBookingDemo(false)}
//           />

//           <div className="mt-8">
//             <ContactForm
//               title="Get Started Today"
//               subtitle="Fill out this form and our team will contact you within 24 hours."
//               className="bg-white rounded-xl shadow-lg p-6"
//             />
//           </div>
//         </div>




//         <Contact />





//       </main>
//       <Footer />
//       {/* Provider Form Popup */}
//       <ProviderFormPopup
//         isOpen={isProviderFormOpen}
//         onClose={handleCloseProviderForm}
//       />
//     </div>
//   );
// };

// export default Home;





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
import ContactForm from "@/components/ContactForm";
import BookDemoForm from "@/components/BookDemoForm";
import Logo from "@/components/Logo";

const Home = () => {
  const [userType, setUserType] = useState(null);
  const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [isBookingDemo, setIsBookingDemo] = useState(false);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  if (!userType) {
    return (
      <div className="flex items-center justify-center h-screen bg-sky-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">Loading...</h2>
          <p>Please select your user type on the welcome page.</p>
        </div>
      </div>
    );
  }

  const handleOpenProviderForm = () => setIsProviderFormOpen(true);
  const handleCloseProviderForm = () => setIsProviderFormOpen(false);

  const seoTitle =
    userType === "taker"
      ? "Rent LinkedIn Accounts - TechInRent LinkedIn Account Rental Service"
      : "Earn Money - Provide Your LinkedIn Account on TechInRent";

  const seoDescription =
    userType === "taker"
      ? "Rent verified LinkedIn accounts for your business outreach and marketing campaigns. Scale your LinkedIn prospecting with TechInRent's secure account rental service."
      : "Earn money by providing your LinkedIn account on TechInRent. Secure, trusted process with guaranteed monthly payments and zero technical involvement.";

  const seoKeywords =
    userType === "taker"
      ? "linkedin accounts, linkedin rental, b2b prospecting, linkedin outreach, rent linkedin profile, business networking accounts"
      : "earn money linkedin, monthly income linkedin, passive income linkedin, provide linkedin account, linkedin account monetization";

  const structuredData =
    userType === "taker"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "LinkedIn Account Rental Service",
          description:
            "Rent verified LinkedIn accounts for your business outreach and marketing campaigns.",
          provider: {
            "@type": "Organization",
            name: "TechInRent",
            url: "https://techinrent.com",
          },
          serviceType: "LinkedIn Account Rental",
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            price: "Variable",
            priceCurrency: "USD",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "LinkedIn Account Provider Program",
          description:
            "Earn money by providing your LinkedIn account through our secure platform.",
          provider: {
            "@type": "Organization",
            name: "TechInRent",
            url: "https://techinrent.com",
          },
          serviceType: "LinkedIn Account Monetization",
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
          },
        };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={structuredData}
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setLocation("/")}>Home</Button>
            <Button onClick={() => window.history.back()}>Return</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8">
        {/* Section: Info and CTA */}
        <section className="max-w-7xl mx-auto py-10 grid gap-8 md:grid-cols-2">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Ready to Get Started?</h3>
            <p className="text-gray-700 mb-4">
              Our streamlined process makes it easy to rent both verified (500+ connections)
              and non-verified LinkedIn accounts to supercharge your outreach campaigns.
            </p>
            <div className="space-y-3">
              {["Choose your account type", "Complete the rental agreement", "Get access within 24 hours"].map(
                (step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </div>
                )
              )}
            </div>
            <div className="mt-6 bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">24/7 Support available</span> - Our team is here to help you
                maximize your LinkedIn outreach success.
              </p>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <h3 className="text-3xl font-bold text-center text-gray-700  mb-4">Ready to Start?</h3>
          <ul className="text-gray-600 mb-6 space-y-2 list-disc list-inside text-left sm:text-center">
  <li>Book your free demo to explore TechInRent's outreach potential.</li>
  <li>Access verified LinkedIn profiles to reach your ideal audience.</li>
  <li>Boost credibility and increase campaign response rates.</li>
  <li>Save time and scale your B2B prospecting effortlessly.</li>
  <li>See real results — no commitment, just performance.</li>
</ul>

            <Button onClick={() => setIsBookingDemo(true)} className="w-full text-xl">
               Book Demo
            </Button>
          </motion.div>
        </section>

        {/* Booking Form */}
        <BookDemoForm
          isOpen={isBookingDemo}
          onClose={() => setIsBookingDemo(false)}
        />

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto mt-10">
          <ContactForm
            title="Get Started Today"
            subtitle="Fill out this form and our team will contact you within 24 hours."
            className="bg-white rounded-2xl shadow-md p-6"
          />
        </section>

        {/* Contact Info */}
        <section className="max-w-7xl mx-auto mt-10">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Provider Form Popup */}
      <ProviderFormPopup isOpen={isProviderFormOpen} onClose={handleCloseProviderForm} />
    </div>
  );
};

export default Home;
