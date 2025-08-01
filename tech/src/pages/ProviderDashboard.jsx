import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  DollarSign,
  Mail,
  Lock,
  HelpCircle
} from "lucide-react";
import ProviderProfile from "@/components/ProviderProfile";
import SEO from "@/components/SEO";
import SchemaOrg from "@/components/SchemaOrg";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // SEO Data for Provider Dashboard
  const dashboardSeoData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LinkedIn Provider Dashboard - TechInRent",
    "description": "Manage your LinkedIn account rental, track earnings, and update your profile settings.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "TechInRent Provider Dashboard",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <SEO
        title="LinkedIn Provider Dashboard - TechInRent"
        description="Manage your LinkedIn account rental, track earnings, and update your profile settings."
        keywords="linkedin provider dashboard, techinrent provider, manage linkedin rentals, track earnings, profile settings"
      />
      <SchemaOrg data={dashboardSeoData} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary">Provider Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your LinkedIn profile rental settings and activity</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40">
          <CardContent className="flex flex-col items-center pt-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
              AP
            </div>
            <h2 className="text-xl font-bold">Alexandra Peters</h2>
            <p className="text-sm text-gray-600 mb-2">Marketing Specialist</p>
            <Badge className="bg-green-100 text-green-800">Verified Profile</Badge>
            <div className="mt-6 space-y-1 w-full">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "profile" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "earnings" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setActiveTab("earnings")}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Earnings
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "rentals" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setActiveTab("rentals")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Active Rentals
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "settings" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "support" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => setActiveTab("support")}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button>
            </div>
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Verification</span>
                <span className="text-sm font-medium text-green-600">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Profile Setup</span>
                <span className="text-sm font-medium text-blue-600">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Rentals</span>
                <span className="text-sm font-medium">2</span>
              </div>
            </CardContent>
          </CardContent>
        </Card>
        {/* Main Content */}
        <Card className="lg:col-span-3 bg-white/95 backdrop-blur-lg border-2 border-white/40">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="rentals">Active Rentals</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Management
                </CardTitle>
                <CardDescription>Update and manage your LinkedIn profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <ProviderProfile />
              </CardContent>
            </TabsContent>
            <TabsContent value="earnings" className="mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Earnings Overview
                </CardTitle>
                <CardDescription>Track your earnings from LinkedIn profile rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12">
                  <p className="text-gray-500">Earnings data will appear here once your profile is rented.</p>
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="rentals" className="mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Active Rentals
                </CardTitle>
                <CardDescription>View and manage your active profile rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12">
                  <p className="text-gray-500">Your active rentals will appear here.</p>
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="settings" className="mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Communication Preferences
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Manage how we contact you</p>
                    <Button variant="outline" className="mt-2">Update Email Preferences</Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-primary" />
                      Privacy & Security
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your privacy settings</p>
                    <Button variant="outline" className="mt-2">Update Security Settings</Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Terms & Conditions
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Review terms and policies</p>
                    <Button variant="outline" className="mt-2">View Terms</Button>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="support" className="mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Support Center
                </CardTitle>
                <CardDescription>Get help with your account and profile rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800">Need help?</h3>
                    <p className="text-sm text-blue-600 mt-1">Our support team is available 24/7 to assist you.</p>
                    <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Contact Support</Button>
                  </div>
                  <div>
                    <h3 className="font-medium">Frequently Asked Questions</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-blue-600 underline cursor-pointer">How do rentals work?</li>
                      <li className="text-sm text-blue-600 underline cursor-pointer">How do I get paid?</li>
                      <li className="text-sm text-blue-600 underline cursor-pointer">How to update my profile?</li>
                      <li className="text-sm text-blue-600 underline cursor-pointer">Is my data secure?</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);