import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const SiteMap = () => {
  const siteStructure = {
    "Main Services": [
      {
        name: "LinkedIn Account Rental",
        href: "/rent-linkedin-account",
        description: "Rent verified LinkedIn accounts with established networks and premium features"
      },
      {
        name: "Buy Real LinkedIn Connections",
        href: "/buy-connections",
        description: "Grow your network with authentic, targeted LinkedIn connections"
      },
      {
        name: "LinkedIn Lead Generation",
        href: "/lead-generation",
        description: "Custom lead generation solutions from our in-house team"
      },
      {
        name: "LinkedIn Marketing Services",
        href: "/services",
        description: "Comprehensive LinkedIn marketing and outreach solutions"
      }
    ],
    "Business Solutions": [
      {
        name: "Social Media Account Rental",
        href: "/social-media-account-rental",
        description: "Access to various social media accounts for business growth"
      },
      {
        name: "LinkedIn Marketplace",
        href: "/linkedin-marketplace",
        description: "Browse and rent LinkedIn accounts from our marketplace"
      },
      {
        name: "Provider Dashboard",
        href: "/provider-dashboard",
        description: "Manage your account listings and earnings"
      }
    ],
    "Company": [
      {
        name: "About TechInRent",
        href: "/about",
        description: "Learn about our mission and team"
      },
      {
        name: "Contact Us",
        href: "/contact",
        description: "Get in touch with our support team"
      },
      {
        name: "Privacy Policy",
        href: "/privacy",
        description: "Our commitment to protecting your privacy"
      },
      {
        name: "Terms of Service",
        href: "/terms",
        description: "Terms and conditions for using our services"
      }
    ]
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore TechInRent</h2>
          <p className="text-lg text-gray-600">Discover all our services and features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(siteStructure).map(([category, links]) => (
            <div key={category} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
              <div className="space-y-3">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div className="flex items-start group cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-1 mr-2 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteMap;