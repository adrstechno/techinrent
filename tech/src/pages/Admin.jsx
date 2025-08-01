import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Mail, Phone, Clipboard, Calendar, User, Building, Briefcase, Download, Lock, Clock, MessageCircle, Trash2 } from "lucide-react";

function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;
  let csvContent = "";
  let headers = [];
  if (filename === 'contact-messages') {
    headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row.id,
        `"${row.name.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.subject?.replace(/"/g, '""') || ''}"`,
        `"${row.message.replace(/"/g, '""')}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  } else if (filename === 'demo-requests') {
    headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Designation', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row.id,
        `"${row.firstName.replace(/"/g, '""')}"`,
        `"${row.lastName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone.replace(/"/g, '""')}"`,
        `"${row.company?.replace(/"/g, '""') || 'Not specified'}"`,
        `"${row.designation?.replace(/"/g, '""') || ''}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  } else if (filename === 'provider-registrations') {
    headers = ['ID', 'Full Name', 'Email', 'Phone', 'LinkedIn URL', 'Profile Status', 'Additional Info', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row.id,
        `"${row.fullName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.linkedinUrl.replace(/"/g, '""')}"`,
        row.profileStatus,
        `"${row.additionalInfo?.replace(/"/g, '""') || ''}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  } else if (filename === 'linkedin-connection-orders') {
    headers = ['ID', 'Customer Name', 'Email', 'Phone', 'LinkedIn URL', 'Connections', 'Package', 'Total Price', 'Payment Method', 'Status', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row.id,
        `"${row.customerName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.linkedinUrl.replace(/"/g, '""')}"`,
        row.connections,
        `"${row.packageName.replace(/"/g, '""')}"`,
        `$${row.totalPrice}`,
        `"${row.paymentMethod.replace(/"/g, '""')}"`,
        row.status,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  }
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Admin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const contactQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const response = await fetch('/api/contact', {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      return response.json();
    },
    retry: false,
    initialData: []
  });
  const demoQuery = useQuery({
    queryKey: ["demo-requests"],
    queryFn: async () => {
      const response = await fetch('/api/demo-requests', {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch demo requests');
      }
      return response.json();
    },
    retry: false,
    initialData: []
  });
  const providerQuery = useQuery({
    queryKey: ["provider-registrations"],
    queryFn: async () => {
      const response = await fetch('/api/provider-signup', {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch provider registrations');
      }
      return response.json();
    },
    retry: false,
    initialData: []
  });
  const linkedinOrdersQuery = useQuery({
    queryKey: ["linkedin-connection-orders"],
    queryFn: async () => {
      const response = await fetch('/api/linkedin-connection-orders', {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn connection orders');
      }
      return response.json();
    },
    retry: false,
    initialData: []
  });

  const markContactAsRead = async (id) => {
    try {
      await fetch(`/api/contact/${id}/read`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      contactQuery.refetch();
      toast({
        title: "Success",
        description: "Contact message marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark contact message as read",
        variant: "destructive"
      });
    }
  };

  const markDemoAsRead = async (id) => {
    try {
      await fetch(`/api/demo-requests/${id}/read`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      demoQuery.refetch();
      toast({
        title: "Success",
        description: "Demo request marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark demo request as read",
        variant: "destructive"
      });
    }
  };

  const markProviderAsRead = async (id) => {
    try {
      await fetch(`/api/provider-signup/${id}/read`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark provider registration as read",
        variant: "destructive"
      });
    }
  };

  const markLinkedInOrderAsRead = async (id) => {
    try {
      await fetch(`/api/linkedin-connection-order/${id}/read`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order marked as read"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark LinkedIn order as read",
        variant: "destructive"
      });
    }
  };

  const updateLinkedInOrderStatus = async (id, status) => {
    try {
      await fetch(`/api/linkedin-connection-order/${id}/status`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: `Order status updated to ${status}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const deleteContactMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      contactQuery.refetch();
      toast({
        title: "Success",
        description: "Contact message deleted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact message",
        variant: "destructive"
      });
    }
  };

  const deleteDemoRequest = async (id) => {
    if (!confirm("Are you sure you want to delete this demo request? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/demo-requests/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      demoQuery.refetch();
      toast({
        title: "Success",
        description: "Demo request deleted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete demo request",
        variant: "destructive"
      });
    }
  };

  const deleteProviderRegistration = async (id) => {
    if (!confirm("Are you sure you want to delete this provider registration? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/provider-registrations/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration deleted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete provider registration",
        variant: "destructive"
      });
    }
  };

  const deleteLinkedInOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this LinkedIn connection order? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/linkedin-connection-orders/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order deleted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete LinkedIn order",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-skyblue/30">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage your platform data and monitor activities</h1>
        <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
            <TabsTrigger value="demo">Demo Requests</TabsTrigger>
            <TabsTrigger value="provider">Provider Registrations</TabsTrigger>
            <TabsTrigger value="secureforms">Secure Forms</TabsTrigger>
            <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="contact" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">Contact Messages</h2>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Button
                  onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
                  disabled={contactQuery.isLoading || contactQuery.data?.length === 0}
                  className="text-sm mb-2 sm:mb-0"
                >
                  <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => contactQuery.refetch()}
                  disabled={contactQuery.isLoading}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {contactQuery.isLoading ? (
              <div className="text-center py-10">Loading messages...</div>
            ) : contactQuery.isError ? (
              <div className="text-center py-10 text-red-500">Error loading contact messages. Please try again.</div>
            ) : (
              <div className="space-y-4">
                {contactQuery.data?.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No contact messages found.</div>
                ) : (
                  contactQuery.data?.map((message) => (
                    <Card key={message.id} className={`max-w-2xl mx-auto ${message.isRead ? "opacity-70" : ""}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{message.subject}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!message.isRead && (
                          <Badge variant="destructive">New</Badge>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{message.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {message.email}
                        </div>
                        <Separator />
                        <div className="pt-2 whitespace-pre-wrap text-gray-700 break-words">{message.message}</div>
                        <div className="pt-2 flex justify-end gap-2">
                          {!message.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markContactAsRead(message.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteContactMessage(message.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="demo" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">Demo Requests</h2>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Button
                  onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}
                  disabled={demoQuery.isLoading || demoQuery.data?.length === 0}
                  className="text-sm mb-2 sm:mb-0"
                >
                  <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => demoQuery.refetch()}
                  disabled={demoQuery.isLoading}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {demoQuery.isLoading ? (
              <div className="text-center py-10">Loading demo requests...</div>
            ) : demoQuery.isError ? (
              <div className="text-center py-10 text-red-500">Error loading demo requests. Please try again.</div>
            ) : (
              <div className="space-y-4">
                {demoQuery.data?.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No demo requests found.</div>
                ) : (
                  demoQuery.data?.map((request) => (
                    <Card key={request.id} className={`max-w-2xl mx-auto ${request.isRead ? "opacity-70" : ""}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{request.firstName} {request.lastName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!request.isRead && (
                          <Badge variant="destructive">New</Badge>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {request.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {request.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          {request.company || "Not specified"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          {request.designation}
                        </div>
                        <div className="pt-2 flex justify-end gap-2">
                          {!request.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markDemoAsRead(request.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteDemoRequest(request.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="provider" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">Provider Registrations</h2>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Button
                  onClick={() => exportToCSV(providerQuery.data, 'provider-registrations')}
                  disabled={providerQuery.isLoading || providerQuery.data?.length === 0}
                  className="text-sm mb-2 sm:mb-0"
                >
                  <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => providerQuery.refetch()}
                  disabled={providerQuery.isLoading}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {providerQuery.isLoading ? (
              <div className="text-center py-10">Loading provider registrations...</div>
            ) : providerQuery.isError ? (
              <div className="text-center py-10 text-red-500">Error loading provider registrations. Please try again.</div>
            ) : (
              <div className="space-y-4">
                {providerQuery.data?.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No provider registrations found.</div>
                ) : (
                  providerQuery.data?.map((provider) => (
                    <Card key={provider.id} className={`max-w-2xl mx-auto ${provider.isRead ? "opacity-70" : ""}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{provider.fullName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(provider.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!provider.isRead && (
                          <Badge variant="destructive">New</Badge>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {provider.email}
                        </div>
                        {provider.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            {provider.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-gray-500" />
                          <a
                            href={provider.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                        <h4 className="text-sm font-medium mb-1">Additional Information</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{provider.additionalInfo}</p>
                        <div className="pt-2 flex justify-end gap-2">
                          {!provider.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markProviderAsRead(provider.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProviderRegistration(provider.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="secureforms" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">Secure Forms</h2>
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto"
              >
                Manage Secure Forms
              </Button>
            </div>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Secure Form Management</CardTitle>
                <CardDescription>Create and manage secure forms for collecting sensitive information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
                    <p className="text-sm text-gray-500 mb-4">Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.</p>
                    <Link href="/admin/secure-forms">
                      <Button variant="outline" className="w-full">
                        Create New Link
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">View Submissions</h3>
                    <p className="text-sm text-gray-500 mb-4">Access and manage all the secure form submissions from users.</p>
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
                    Secure forms contain sensitive information. Access is restricted to authorized administrators only.
                    All form URLs are single-use and expire after submission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="linkedin-orders" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">LinkedIn Connection Orders</h2>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <Button
                  onClick={() => exportToCSV(linkedinOrdersQuery.data, 'linkedin-connection-orders')}
                  disabled={linkedinOrdersQuery.isLoading || linkedinOrdersQuery.data?.length === 0}
                  className="text-sm mb-2 sm:mb-0"
                >
                  <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => linkedinOrdersQuery.refetch()}
                  disabled={linkedinOrdersQuery.isLoading}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {linkedinOrdersQuery.isLoading ? (
              <div className="text-center py-8">Loading LinkedIn connection orders...</div>
            ) : linkedinOrdersQuery.isError ? (
              <div className="text-center py-8 text-red-500">Error loading LinkedIn connection orders. Please try again.</div>
            ) : (
              <div className="grid gap-4">
                {linkedinOrdersQuery.data?.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No LinkedIn connection orders found.</div>
                ) : (
                  linkedinOrdersQuery.data?.map((order) => (
                    <Card key={order.id} className="w-full">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <CardTitle className="text-base sm:text-lg">
                            {order.connections} connections • {order.packageName} • ${order.totalPrice}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'secondary' : 'outline'}>
                              {order.status}
                            </Badge>
                            {!order.isRead && (
                              <Badge variant="destructive">Unread</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Email: </span>{order.email}
                            </div>
                            {order.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Phone: </span>{order.phone}
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                              <span className="font-medium">LinkedIn: </span>
                              <a href={order.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Profile
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clipboard className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Payment Method: </span>{order.paymentMethod}
                            </div>
                            {order.notes && (
                              <div className="flex items-start gap-2">
                                <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                                <span className="font-medium">Notes: </span>
                                <span className="text-gray-700 break-words">{order.notes}</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Order Date: </span>
                              {new Date(order.createdAt).toLocaleString('en-US', {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: "short"
                              })}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Time Since: </span>
                              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                            </div>
                            {order.paymentScreenshot ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Lock className="h-4 w-4 text-green-600" />
                                  <span className="font-medium text-green-600">Payment Screenshot</span>
                                </div>
                                <div className="border rounded-lg p-2 bg-gray-50">
                                  <img
                                    src={order.paymentScreenshot}
                                    alt="Payment Screenshot"
                                    className="max-w-full h-auto max-h-48 rounded cursor-pointer"
                                    onClick={() => window.open(order.paymentScreenshot, '_blank')}
                                  />
                                  <div className="text-xs text-gray-500 mt-1">Click to view full size</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-red-500" />
                                <span className="font-medium text-red-500">Payment Screenshot: </span>
                                <span className="text-red-500">Not uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {!order.isRead && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markLinkedInOrderAsRead(order.id)}
                                className="text-xs"
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateLinkedInOrderStatus(order.id, 'processing')}
                              disabled={order.status === 'processing'}
                              className="text-xs"
                            >
                              Mark Processing
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateLinkedInOrderStatus(order.id, 'completed')}
                              disabled={order.status === 'completed'}
                              className="text-xs"
                            >
                              Mark Completed
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteLinkedInOrder(order.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500">Created {new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}