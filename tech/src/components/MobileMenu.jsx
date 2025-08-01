import { Link, useLocation } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, LogOut } from "lucide-react";

export default function MobileMenu({
  isOpen,
  onClose,
  onNavigate,
  navItems = [],
  userType,
  onLogout
}) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Clear userType from localStorage
      localStorage.removeItem('userType');
      // Redirect to welcome page
      setLocation('/');
    }
    onClose();
  };

  // Default navigation items if not provided
  const defaultNavItems = () => {
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
        },
        {
          label: "Contact",
          section: "contact"
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

  const menuItems = navItems.length > 0 ? navItems : defaultNavItems();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Link href="/home" onClick={onClose}>
            <div className="flex items-center">
              <span className="text-primary font-inter font-bold text-2xl">Tech</span>
              <span className="text-secondary">InRent</span>
              {userType && (
                <span className={`ml-2 px-2 py-1 text-xs rounded ${
                  userType === 'taker' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                }`}>
                  {userType === 'taker' ? 'LinkedIn Taker' : 'LinkedIn Provider'}
                </span>
              )}
            </div>
          </Link>
          <button
            onClick={onClose}
            className="text-neutral-dark hover:text-primary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => onNavigate(item.section)}
            >
              {item.label}
            </div>
          ))}

          <div
            className={`p-3 rounded-md cursor-pointer ${
              userType === 'provider'
                ? 'bg-secondary text-white hover:bg-secondary-dark'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            onClick={() => onNavigate("contact")}
          >
            Get Started
          </div>

          {userType && (
            <div
              className="p-3 flex items-center text-neutral-dark hover:text-primary cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
