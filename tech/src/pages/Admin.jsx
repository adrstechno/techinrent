import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
  Trash2
} from "lucide-react";

// Function to export data to CSV
function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;
  
  let csvContent = "";
  let headers = [];
  
  // Determine the headers from the first object
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
  
  // Create a Blob and download link
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

  // Get contact messages
  const contactQuery = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/contact', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      return response.json();
    },
    retry: 2,
    initialData: [],
  });

  // Get demo requests
  const demoQuery = useQuery({
    queryKey: ['demo-requests'],
    queryFn: async () => {
      const response = await fetch('/api/demo-requests', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch demo requests');
      }
      return response.json();
    },
    retry: 2,
    initialData: [],
  });

  // Get provider registrations
  const providerQuery = useQuery({
    queryKey: ['provider-signup'],
    queryFn: async () => {
      const response = await fetch('/api/provider-signup', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch provider registrations');
      }
      return response.json();
    },
    retry: 2,
    initialData: [],
  });

  // Get LinkedIn connection orders
  const linkedinOrdersQuery = useQuery({
    queryKey: ['linkedin-connection-orders'],
    queryFn: async () => {
      const response = await fetch('/api/linkedin-connection-orders', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn connection orders');
      }
      return response.json();
    },
    retry: 2,
    initialData: [],
  });

  // Mark contact message as read
  const markContactAsRead = async (id) => {
    try {
      await fetch(`/api/contact/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      contactQuery.refetch();
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  // Mark demo request as read
  const markDemoAsRead = async (id) => {
    try {
      await fetch(`/api/demo-requests/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      demoQuery.refetch();
      toast({
        title: "Success",
        description: "Demo request marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark demo request as read",
        variant: "destructive",
      });
    }
  };

  // Mark provider registration as read
  const markProviderAsRead = async (id) => {
    try {
      await fetch(`/api/provider-signup/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark provider registration as read",
        variant: "destructive",
      });
    }
  };

  // Mark LinkedIn connection order as read
  const markLinkedInOrderAsRead = async (id) => {
    try {
      await fetch(`/api/linkedin-connection-order/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark LinkedIn order as read",
        variant: "destructive",
      });
    }
  };

  // Update LinkedIn connection order status
  const updateLinkedInOrderStatus = async (id, status) => {
    try {
      await fetch(`/api/linkedin-connection-order/${id}/status`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: `Order status updated to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  // Delete functions for each section
  const deleteContactMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      contactQuery.refetch();
      toast({
        title: "Success",
        description: "Contact message deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact message",
        variant: "destructive",
      });
    }
  };

  const deleteDemoRequest = async (id) => {
    if (!confirm("Are you sure you want to delete this demo request? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/demo-requests/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      demoQuery.refetch();
      toast({
        title: "Success",
        description: "Demo request deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete demo request",
        variant: "destructive",
      });
    }
  };

  const deleteProviderRegistration = async (id) => {
    if (!confirm("Are you sure you want to delete this provider registration? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/provider-registrations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete provider registration",
        variant: "destructive",
      });
    }
  };

  const deleteLinkedInOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this LinkedIn connection order? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/linkedin-connection-orders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      linkedinOrdersQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete LinkedIn order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-skyblue/30">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your platform data and monitor activities</p>
        
        <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
            <TabsTrigger value="demo">Demo Requests</TabsTrigger>
            <TabsTrigger value="provider">Provider Registrations</TabsTrigger>
            <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
                  disabled={contactQuery.isLoading || contactQuery.data?.length === 0}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
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
              <div className="text-center py-10 text-red-500">
                Error loading contact messages. Please try again.
              </div>
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
                        <div className="pt-2 whitespace-pre-wrap text-gray-700 break-words">
                          {message.message}
                        </div>
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
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          {/* Similar structure for other tabs */}
          <TabsContent value="demo" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Demo Requests</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}
                  disabled={demoQuery.isLoading || demoQuery.data?.length === 0}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
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
              <div className="text-center py-10 text-red-500">
                Error loading demo requests. Please try again.
              </div>
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
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          {/* Provider registrations and LinkedIn orders tabs would follow similar pattern */}
        </Tabs>
      </div>
    </div>
  );
}
