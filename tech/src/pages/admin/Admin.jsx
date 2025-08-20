import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { formatDistanceToNow } from "date-fns";
import {
  Mail,
  Phone,
  Clipboard,
  Calendar,
  User,
  Building,
  Briefcase,
  Download,
  Lock,
  Clock,
  MessageCircle,
} from "lucide-react";

const API_URI = "https://tech-in-rent.onrender.com/api/admin";

// Function to export data to CSV (aligned with backend models)
function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;

  let csvContent = "";
  let headers = [];

  if (filename === "contact-messages") {
    headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Message",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id,
        `"${row.fullname?.replace(/"/g, '""') || ""}"`,
        `"${row.email?.replace(/"/g, '""') || ""}"`,
        `"${row.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.company?.replace(/"/g, '""') || ""}"`,
        `"${row.message?.replace(/"/g, '""') || ""}"`,
        new Date(row.createdAt).toLocaleString(),
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "demo-requests") {
    headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Company",
      "Job Title",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id,
        `"${row.firstName?.replace(/"/g, '""') || ""}"`,
        `"${row.lastName?.replace(/"/g, '""') || ""}"`,
        `"${row.email?.replace(/"/g, '""') || ""}"`,
        `"${row.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.companyName?.replace(/"/g, '""') || ""}"`,
        `"${row.jobtitle?.replace(/"/g, '""') || ""}"`,
        new Date(row.createdAt).toLocaleString(),
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "provider-registrations") {
    headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "LinkedIn URL",
      "Verification",
      "Additional Info",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id,
        `"${row.fullName?.replace(/"/g, '""') || ""}"`,
        `"${row.email?.replace(/"/g, '""') || ""}"`,
        `"${row.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedIn?.replace(/"/g, '""') || ""}"`,
        `"${row.verification || ""}"`,
        `"${row.additionalInfo?.replace(/"/g, '""') || ""}"`,
        new Date(row.createdAt).toLocaleString(),
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "linkedin-connection-orders") {
    headers = [
      "ID",
      "Customer Name",
      "Email",
      "Phone",
      "LinkedIn URL",
      "Package",
      "Total Price",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id,
        `"${row.customer?.fullname?.replace(/"/g, '""') || ""}"`,
        `"${row.customer?.email?.replace(/"/g, '""') || ""}"`,
        `"${row.customer?.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedin?.replace(/"/g, '""') || ""}"`,
        `"${row.package?.replace(/"/g, '""') || ""}"`,
        row.cost ?? "",
        `"${row.paymentMethod?.replace(/"/g, '""') || ""}"`,
        `"${row.paymentStatus || ""}"`,
        `"${row.status || ""}"`,
        new Date(row.createdAt).toLocaleString(),
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "view-forms") {
    headers = [
      "ID",
      "Form ID",
      "Full Name",
      "Phone Number",
      "Email",
      "LinkedIn Email",
      "LinkedIn Password",
      "Read",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id,
        row.formId,
        `"${row.fullName?.replace(/"/g, '""') || ""}"`,
        `"${row.phoneNumber?.replace(/"/g, '""') || ""}"`,
        `"${row.email?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedinEmail?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedinPassword?.replace(/"/g, '""') || ""}"`,
        row.paymentInfo?.read ? "true" : "false",
        new Date(row.createdAt).toLocaleString(),
      ];
      csvContent += values.join(",") + "\n";
    });
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Reusable fetcher function for react-query
const fetcher = async (url) => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  const data = await response.json();
  return data.data || [];
};

export default function Admin() {
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("contact");

  // React Query hooks for fetching data
  const contactQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => fetcher(`${API_URI}/contacts`),
    enabled: true,
  });

  const demoQuery = useQuery({
    queryKey: ["demo-requests"],
    queryFn: () => fetcher(`${API_URI}/demos`),
    enabled: true,
  });

  const providerQuery = useQuery({
    queryKey: ["provider-inquiries"],
    queryFn: () => fetcher(`${API_URI}/providers`),
    enabled: true,
  });

  const linkedinOrdersQuery = useQuery({
    queryKey: ["linkedin-connection-orders"],
    queryFn: () => fetcher(`${API_URI}/orders`),
    enabled: true,
  });

  const viewFormsQuery = useQuery({
    queryKey: ["view-forms"],
    queryFn: () => fetcher(`${API_URI}/all-responses`),
    enabled: true,
  });

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    dispatch(logout());
    navigate("/login"); // Updated to navigate to /login
  };

  const renderLoading = () => (
    <div className="text-center py-10">Loading...</div>
  );
  const renderError = (error) => (
    <div className="text-center py-10 text-red-500">Error: {error.message}</div>
  );
  const renderNoData = (message) => (
    <div className="text-center py-10 text-gray-500">{`No ${message} found.`}</div>
  );

  return (
    <div className="min-h-screen bg-skyblue/30">
      <div className="container mx-auto py-6 px-4 sm:py-10">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your platform data and monitor activities (Last updated:
              07:35 PM IST, Wednesday, August 20, 2025)
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-sm">
            Logout
          </Button>
        </div>

        <Tabs
          defaultValue="contact"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto p-1 gap-1">
            <TabsTrigger
              value="contact"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              Contact
            </TabsTrigger>
            <TabsTrigger
              value="demo"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              Demo
            </TabsTrigger>
            <TabsTrigger
              value="provider"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              Provider
            </TabsTrigger>
            <TabsTrigger
              value="linkedin-orders"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              LinkedIn
            </TabsTrigger>
            <TabsTrigger
              value="secureforms"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              Forms
            </TabsTrigger>
            <TabsTrigger
              value="viewforms"
              className="text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              View Forms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    exportToCSV(contactQuery.data, "contact-messages")
                  }
                  disabled={
                    contactQuery.isLoading || !contactQuery.data?.length
                  }
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => contactQuery.refetch()}
                  disabled={contactQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {contactQuery.isFetching ? (
              renderLoading()
            ) : contactQuery.isError ? (
              renderError(contactQuery.error)
            ) : !contactQuery.data || contactQuery.data.length === 0 ? (
              renderNoData("contact messages")
            ) : (
              <div className="space-y-4">
                {contactQuery.data.map((message) => (
                  <Card key={message._id} className="max-w-2xl mx-auto">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Contact Message
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(message.createdAt), {
                              addSuffix: true,
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{message.fullname}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{message.company}</span>
                      </div>
                      <Separator />
                      <div className="pt-2 whitespace-pre-wrap text-gray-700 break-words">
                        {message.message}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="demo">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Demo Requests</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(demoQuery.data, "demo-requests")}
                  disabled={demoQuery.isLoading || !demoQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => demoQuery.refetch()}
                  disabled={demoQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {demoQuery.isFetching ? (
              renderLoading()
            ) : demoQuery.isError ? (
              renderError(demoQuery.error)
            ) : !demoQuery.data || demoQuery.data.length === 0 ? (
              renderNoData("demo requests")
            ) : (
              <div className="space-y-4">
                {demoQuery.data.map((request) => (
                  <Card key={request._id} className="max-w-2xl mx-auto">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {request.firstName} {request.lastName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(request.createdAt), {
                              addSuffix: true,
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{request.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{request.companyName || "Not specified"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span>{request.jobtitle}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="provider">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Provider Registrations</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    exportToCSV(providerQuery.data, "provider-registrations")
                  }
                  disabled={
                    providerQuery.isLoading || !providerQuery.data?.length
                  }
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => providerQuery.refetch()}
                  disabled={providerQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {providerQuery.isFetching ? (
              renderLoading()
            ) : providerQuery.isError ? (
              renderError(providerQuery.error)
            ) : !providerQuery.data || providerQuery.data.length === 0 ? (
              renderNoData("provider registrations")
            ) : (
              <div className="space-y-4">
                {providerQuery.data.map((provider) => (
                  <Card key={provider._id} className="max-w-2xl mx-auto">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {provider.fullName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(provider.createdAt), {
                              addSuffix: true,
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{provider.email}</span>
                      </div>
                      {provider.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{provider.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-gray-500" />
                        <span>
                          <a
                            href={provider.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            provider.verification === "verified"
                              ? "default"
                              : "outline"
                          }
                        >
                          {provider.verification === "verified"
                            ? "Verified Profile"
                            : "Non-Verified Profile"}
                        </Badge>
                      </div>
                      {provider.additionalInfo && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              Additional Information:
                            </h4>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">
                              {provider.additionalInfo}
                            </p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="secureforms" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Secure Forms</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/admin/secure-forms">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto">
                    <Lock className="mr-2 h-4 w-4" />
                    Manage Secure Forms
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Secure Form Management</CardTitle>
                <CardDescription>
                  Create and manage secure forms for collecting sensitive
                  information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Generate New Form Link
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a unique, one-time use link for collecting LinkedIn
                      credentials and payment details securely.
                    </p>
                    <Link href="/admin/secure-forms">
                      <Button variant="outline" className="w-full">
                        Create New Link
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">
                      View Submissions
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Access and manage all the secure form submissions from
                      users.
                    </p>
                    <Link href="/admin/secure-forms">
                      <Button variant="outline" className="w-full">
                        View Submissions
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h4 className="text-amber-800 font-medium">Security Note</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Secure forms contain sensitive information. Access is
                    restricted to authorized administrators only. All form URLs
                    are single-use and expire after submission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="linkedin-orders">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">
                LinkedIn Connection Orders
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    exportToCSV(
                      linkedinOrdersQuery.data,
                      "linkedin-connection-orders"
                    )
                  }
                  disabled={
                    linkedinOrdersQuery.isLoading ||
                    !linkedinOrdersQuery.data?.length
                  }
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => linkedinOrdersQuery.refetch()}
                  disabled={linkedinOrdersQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {linkedinOrdersQuery.isFetching ? (
              renderLoading()
            ) : linkedinOrdersQuery.isError ? (
              renderError(linkedinOrdersQuery.error)
            ) : !linkedinOrdersQuery.data ||
              linkedinOrdersQuery.data.length === 0 ? (
              renderNoData("LinkedIn connection orders")
            ) : (
              <div className="grid gap-4">
                {linkedinOrdersQuery.data.map((order) => (
                  <Card key={order._id} className="w-full">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg">
                            Order #{order._id} - {order.customer?.fullname}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {order.package} • ${order.cost}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Email:</span>
                            <span>{order.customer?.email}</span>
                          </div>
                          {order.customer?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Phone:</span>
                              <span>{order.customer?.phone}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="font-medium">LinkedIn:</span>
                            <a
                              href={order.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {order.linkedin}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Payment Method:</span>
                            <span>{order.paymentMethod}</span>
                          </div>
                          {order.additionalNotes && (
                            <div className="flex items-start gap-2">
                              <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                              <span className="font-medium">Notes:</span>
                              <span className="text-gray-700 break-words">
                                {order.additionalNotes}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Order Date:</span>
                            <span>
                              {new Date(order.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  timeZoneName: "short",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Time Since:</span>
                            <span>
                              {formatDistanceToNow(new Date(order.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                          {order.paymentScreenshot ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-600">
                                  Payment Screenshot:
                                </span>
                              </div>
                              <div className="border rounded-lg p-2 bg-gray-50">
                                <img
                                  src={order.paymentScreenshot}
                                  alt="Payment Screenshot"
                                  className="max-w-full h-auto max-h-48 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() =>
                                    window.open(
                                      order.paymentScreenshot,
                                      "_blank"
                                    )
                                  }
                                />
                                <div className="mt-2 text-xs text-gray-600">
                                  Click to view full size
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4 text-red-500" />
                              <span className="font-medium text-red-500">
                                Payment Screenshot:
                              </span>
                              <span className="text-red-500">Not uploaded</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator className="my-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="viewforms">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">
                View Form Submission Response
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(viewFormsQuery.data, "view-forms")}
                  disabled={
                    viewFormsQuery.isLoading || !viewFormsQuery.data?.length
                  }
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => viewFormsQuery.refetch()}
                  disabled={viewFormsQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {viewFormsQuery.isFetching ? (
              renderLoading()
            ) : viewFormsQuery.isError ? (
              renderError(viewFormsQuery.error)
            ) : !viewFormsQuery.data || viewFormsQuery.data.length === 0 ? (
              renderNoData("view forms")
            ) : (
              <div className="space-y-4">
                {viewFormsQuery.data.map((view) => (
                  <Card key={view._id} className="max-w-2xl mx-auto">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            FormId: {view.formId}
                          </CardTitle>
                          <CardTitle className="text-lg">
                            Name: {view.fullName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(view.createdAt), {
                              addSuffix: true,
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{view.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{view.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>
                          LinkedIn Email:{" "}
                          {view.linkedinEmail || "Not specified"}
                        </span>
                        <br />
                        <span>
                          LinkedIn Password:{" "}
                          {view.linkedinPassword || "Not specified"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <p>Payment Info</p>
                        </div>
                        <ul className="ml-6 list-disc text-sm text-gray-700">
                          <li>Method: {view.paymentInfo.method}</li>
                          {view.paymentInfo.method === "bank" && (
                            <>
                              <li>
                                Account Number:{" "}
                                {view.paymentInfo.bank.accountNumber}
                              </li>
                              <li>IFSC: {view.paymentInfo.bank.ifsc}</li>
                            </>
                          )}
                          {view.paymentInfo.method === "crypto" && (
                            <>
                              <li>
                                Wallet ID: {view.paymentInfo.crypto.walletId}
                              </li>
                              <li>
                                Network: {view.paymentInfo.crypto.network}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
