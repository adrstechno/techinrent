import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { scrollToSection } from "@/lib/utils";
import Logo from "./Logo";

const Navbar = ({ userType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isHomePage = location === "/home";

  const handleScrollToSection = (id) => {
    if (isHomePage) {
      scrollToSection(id);
    } else {
      window.location.href = `/buy-linkedin-on-rent#${id}`;
    }
  };

  const handleLogout = () => {
    // Clear userType from localStorage
    localStorage.removeItem('userType');
    // Redirect to welcome page
    setLocation('/');
  };

  // Navigation items based on user type
  const getNavItems = () => {
    if (userType === 'taker') {
      return [
        {
          label: "How It Works",
          section: "how-it-works"
        },
        {
          label: "Pricing",
          section: "pricing"
        },
        {
          label: "Features",
          section: "features"
        },
        {
          label: "Testimonials",
          section: "testimonials"
        }
      ];
    } else if (userType === 'provider') {
      return [
        {
          label: "How It Works",
          section: "how-it-works"
        },
        {
          label: "Benefits",
          section: "benefits"
        },
        {
          label: "Requirements",
          section: "requirements"
        },
        {
          label: "Contact",
          section: "contact"
        }
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  // Button color based on user type
  const buttonClass = userType === 'taker'
    ? "bg-primary hover:bg-primary-dark text-white"
    : "bg-secondary hover:bg-secondary-dark text-white";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo size="sm" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(item.section)}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

         
             <Button
 onClick={() => window.history.back()}

  size="sm"
  className="flex items-center gap-2 bg-purple-600 text-white"
>
  Return
</Button>
            

           
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(section) => {
          handleScrollToSection(section);
          setIsMenuOpen(false);
        }}
        navItems={navItems}
        userType={userType}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
