import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

export default function Breadcrumb({ items = [] }) {

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    ...items
  ];
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {index === 0 && (
                <Home className="h-4 w-4 text-gray-500 mr-2" />
              )}
              {item.href && index < breadcrumbItems.length - 1 ? (
                <Link href={item.href}>
                  <span className="text-blue-600 hover:text-blue-800 hover:underline">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className={index === breadcrumbItems.length - 1 ?
                  "text-gray-900 font-medium" : "text-gray-500"}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}