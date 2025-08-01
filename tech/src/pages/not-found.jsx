import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Home,
  ArrowLeft,
  Search
} from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <SEO
        title="Page Not Found - TechInRent"
        description="Sorry, the page you're looking for doesn't exist. Explore our LinkedIn account rental services and find what you need."
        noIndex={true}
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-blue-50 px-4">
        <Card className="w-full max-w-2xl mx-4 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              404
            </CardTitle>
            <p className="text-xl text-gray-600">Page Not Found</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-8 text-lg">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/home">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="px-6 py-3">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Services
                </Button>
              </Link>
              <Button
                variant="ghost" 
                onClick={() => window.history.back()}
                className="px-6 py-3"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/linkedin-marketplace">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800">
                    LinkedIn Marketplace
                  </Button>
                </Link>
                <Link href="/earn-money-linkedin">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800">
                    Earn Money
                  </Button>
                </Link>
                <Link href="/buy-linkedin-on-rent">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800">
                    Buy LinkedIn
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
