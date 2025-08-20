import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Mail } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/service/SEO";

const ServerError = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <SEO
        title="Server Error - TechInRent"
        description="We're experiencing technical difficulties. Our team is working to resolve this issue. Please try again later."
        noIndex={true}
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-blue-50 px-4">
        <Card className="w-full max-w-2xl mx-4 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              500
            </CardTitle>
            <p className="text-xl text-gray-600">Internal Server Error</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-8 text-lg">
              We're experiencing technical difficulties. Our team has been
              notified and is working to resolve this issue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href="/home">
                <Button variant="outline" className="px-6 py-3">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="px-6 py-3">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If the problem persists, please contact our support team for
                assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServerError;
