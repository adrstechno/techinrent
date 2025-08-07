// import { Link } from "wouter";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Send,
//   Building2
// } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-neutral-darkest text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="lg:col-span-1">
//             <Link href="/">
//               <span className="text-white font-inter font-bold text-2xl cursor-pointer">
//                 Tech<span className="text-secondary">InRent</span>
//               </span>
//             </Link>
//             <p className="text-neutral-medium mb-6 mt-4">
//               Premium LinkedIn account rental services for businesses looking to expand their network and reach.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="https://linkedin.com/company/techinrent"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-neutral-medium hover:text-white transition-colors"
//               >
//                 <Building2 size={20} />
//               </a>
//               <a
//                 href="https://instagram.com/techinrent"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-neutral-medium hover:text-white transition-colors"
//                 aria-label="Instagram"
//               >
//                 📷
//               </a>
//               <a
//                 href="https://wa.me/1234567890"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-neutral-medium hover:text-white transition-colors"
//               >
//                 <FaWhatsapp size={20} />
//               </a>
//               <a
//                 href="https://youtube.com/@techinrent"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-neutral-medium hover:text-white transition-colors"
//                 aria-label="YouTube"
//               >
//                 ▶️
//               </a>
//             </div>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 className="font-inter font-semibold text-lg mb-4 text-white/90">Services</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/linkedin-marketplace" className="text-neutral-medium hover:text-white transition-colors">
//                   LinkedIn Account Rental
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/earn-money-linkedin" className="text-neutral-medium hover:text-white transition-colors">
//                   Earn with LinkedIn
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/social-media-account-rental" className="text-neutral-medium hover:text-white transition-colors">
//                   Social Media Accounts
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/business-outreach" className="text-neutral-medium hover:text-white transition-colors">
//                   Business Outreach
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-inter font-semibold text-lg mb-4 text-white/90">Company</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/about" className="text-neutral-medium hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-neutral-medium hover:text-white transition-colors">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/careers" className="text-neutral-medium hover:text-white transition-colors">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog" className="text-neutral-medium hover:text-white transition-colors">
//                   Blog
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="font-inter font-semibold text-lg mb-4 text-white/90">Newsletter</h3>
//             <p className="text-neutral-medium mb-4">
//               Subscribe to our newsletter for tips, new accounts, and industry updates.
//             </p>
//             <form className="flex">
//               <Input
//                 type="email"
//                 placeholder="Your email"
//                 className="flex-grow rounded-l-md border-gray-600 bg-gray-800 text-white focus:border-secondary"
//               />
//               <Button 
//                 type="submit"
//                 className="rounded-r-md bg-secondary hover:bg-secondary/90 px-4 ml-2"
//               >
//                 <Send size={16} />
//               </Button>
//             </form>
//           </div>
//         </div>

//         {/* Site Map Section */}
//         <div className="border-t border-gray-700 mt-10 pt-8">
//           <h3 className="font-inter font-semibold text-lg mb-6 text-center text-white/90">Site Map</h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
//             <div>
//               <h4 className="font-semibold mb-3 text-white">Main Pages</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="/" className="text-neutral-medium hover:text-white transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/about" className="text-neutral-medium hover:text-white transition-colors">
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="text-neutral-medium hover:text-white transition-colors">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3 text-white">LinkedIn Services</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="/linkedin-marketplace" className="text-neutral-medium hover:text-white transition-colors">
//                     Account Marketplace
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/verified-accounts" className="text-neutral-medium hover:text-white transition-colors">
//                     Verified Accounts
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/premium-accounts" className="text-neutral-medium hover:text-white transition-colors">
//                     Premium Accounts
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3 text-white">For Providers</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="/earn-money-linkedin" className="text-neutral-medium hover:text-white transition-colors">
//                     Earn Money
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/provider-signup" className="text-neutral-medium hover:text-white transition-colors">
//                     Become Provider
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/provider-dashboard" className="text-neutral-medium hover:text-white transition-colors">
//                     Provider Dashboard
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3 text-white">Other Services</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="/social-media-account-rental" className="text-neutral-medium hover:text-white transition-colors">
//                     Social Media Rental
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/business-outreach" className="text-neutral-medium hover:text-white transition-colors">
//                     Business Outreach
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/lead-generation" className="text-neutral-medium hover:text-white transition-colors">
//                     Lead Generation
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3 text-white">Legal</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <Link href="/terms" className="text-neutral-medium hover:text-white transition-colors">
//                     Terms of Service
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="text-neutral-medium hover:text-white transition-colors">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/refund" className="text-neutral-medium hover:text-white transition-colors">
//                     Refund Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3 text-white">Support</h4>
//               <ul className="space-y-1">
//                 <li>
//                   <a href="/#faq" className="text-neutral-medium hover:text-white transition-colors">
//                     FAQ
//                   </a>
//                 </li>
//                 <li>
//                   <Link href="/help" className="text-neutral-medium hover:text-white transition-colors">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="text-neutral-medium hover:text-white transition-colors">
//                     Contact Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-neutral-medium text-sm">
//             &copy; {new Date().getFullYear()} TechInRent. All rights reserved.
//           </p>
//           <div className="mt-4 md:mt-0">
//             <p className="text-neutral-medium text-sm">Secure payments accepted</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Send,
  Building2,
  Instagram,
  Youtube,
  Mail,
  MessageCircle,
  HelpCircle,
  Shield,
  DollarSign,
  Users,
  Briefcase,
  Home,
  FileText,
  ArrowRight
} from "lucide-react";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="text-white font-bold text-2xl cursor-pointer flex items-center">
                <Building2 className="mr-2" size={24} />
                Tech<span className="text-blue-400">InRent</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 mt-4 text-sm leading-relaxed">
              Premium LinkedIn account rental services for businesses looking to expand their network and reach.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/techinrent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://instagram.com/techinrent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://youtube.com/@techinrent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center">
              <Briefcase className="mr-2" size={18} />
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "LinkedIn Account Rental", href: "/linkedin-marketplace", icon: <ArrowRight size={14} className="mr-2" /> },
                { name: "Earn with LinkedIn", href: "/earn-money-linkedin", icon: <DollarSign size={14} className="mr-2" /> },
                { name: "Social Media Accounts", href: "/social-media-account-rental", icon: <Users size={14} className="mr-2" /> },
                { name: "Business Outreach", href: "/business-outreach", icon: <MessageCircle size={14} className="mr-2" /> },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors flex items-center text-sm">
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center">
              <Building2 className="mr-2" size={18} />
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about", icon: <FileText size={14} className="mr-2" /> },
                { name: "Contact", href: "/contact", icon: <Mail size={14} className="mr-2" /> },
                { name: "Careers", href: "/careers", icon: <Users size={14} className="mr-2" /> },
                { name: "Blog", href: "/blog", icon: <FileText size={14} className="mr-2" /> },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors flex items-center text-sm">
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white flex items-center">
              <Mail className="mr-2" size={18} />
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for tips, new accounts, and industry updates.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-grow rounded-l-md border-gray-700 bg-gray-800 text-white focus:border-blue-400 focus:ring-blue-400"
              />
              <Button 
                type="submit"
                className="rounded-r-md bg-blue-600 hover:bg-blue-700 px-4 ml-0"
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>

        {/* Site Map Section */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <h3 className="font-semibold text-lg mb-6 text-center text-white">Site Map</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <Home size={16} className="mr-2" />
                Main Pages
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <Briefcase size={16} className="mr-2" />
                LinkedIn Services
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Account Marketplace", href: "/linkedin-marketplace" },
                  { name: "Verified Accounts", href: "/verified-accounts" },
                  { name: "Premium Accounts", href: "/premium-accounts" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <DollarSign size={16} className="mr-2" />
                For Providers
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Earn Money", href: "/earn-money-linkedin" },
                  { name: "Become Provider", href: "/provider-signup" },
                  { name: "Provider Dashboard", href: "/provider-dashboard" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <Users size={16} className="mr-2" />
                Other Services
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Social Media Rental", href: "/social-media-account-rental" },
                  { name: "Business Outreach", href: "/business-outreach" },
                  { name: "Lead Generation", href: "/lead-generation" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <Shield size={16} className="mr-2" />
                Legal
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Refund Policy", href: "/refund" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white flex items-center">
                <HelpCircle size={16} className="mr-2" />
                Support
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "FAQ", href: "/faq" },
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Support", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center">
  <p className="text-gray-500 text-sm">
    &copy; {new Date().getFullYear()} TechInRent. All rights reserved.
  </p>
 
</div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <p className="text-gray-500 text-sm">Secure payments:</p>
            <div className="flex space-x-3">
              <SiVisa className="text-gray-400 text-xl" />
              <SiMastercard className="text-gray-400 text-xl" />
              <SiPaypal className="text-gray-400 text-xl" />
            </div>
          </div>
         
        </div>
      </div>
    </footer>
  );
}
