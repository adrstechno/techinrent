import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar, DollarSign, TrendingUp, FileText, Settings, LogOut, Eye, CheckCircle, Clock, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    if (!isLoggedIn || !loginTime) {
      setLocation('/admin-login');
      return;
    }
    const sessionAge = Date.now() - parseInt(loginTime);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (sessionAge > twentyFourHours) {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminLoginTime');
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive"
      });
      setLocation('/admin-login');
    }
  }, [setLocation, toast]);

  const contactMessagesQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const response = await fetch('/api/contact', {
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to fetch contact messages');
      return response.json();
    }
  });

  const demoRequestsQuery = useQuery({
    queryKey: ["demo-requests"],
    queryFn: async () => {
      const response = await fetch('/api/demo-requests', {
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to fetch demo requests');
      return response.json();
    }
  });

  const providerSignupsQuery = useQuery({
    queryKey: ["provider-signups"],
    queryFn: async () => {
      const response = await fetch('/api/provider-signup', {
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to fetch provider signups');
      return response.json();
    }
  });

  const linkedinOrdersQuery = useQuery({
    queryKey: ["linkedin-orders"],
    queryFn: async () => {
      const response = await fetch('/api/linkedin-connection-orders', {
        credentials: "include"
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        throw new Error('Failed to fetch LinkedIn connection orders');
      }
      return response.json();
    },
    retry: false,
    retryDelay: 1000
  });

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default"
    });
    setLocation('/admin-login');
  };

  const markAsRead = async (type, id) => {
    try {
      const response = await fetch(`/api/${type}/${id}/read`, {
        method: "POST"
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: `${type.replace('-', ' ').replace(/(^\w|\s\w)/g, c => c.toUpperCase())} marked as read`,
          variant: "default"
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to mark ${type} as read`,
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const markLinkedInOrderAsRead = async (id) => {
    try {
      const response = await fetch(`/api/linkedin-connection-order/${id}/read`, {
        method: "POST"
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "LinkedIn order marked as read",
          variant: "default"
        });
        window.location.reload();
      }
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
      const response = await fetch(`/api/linkedin-connection-order/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: `Order status updated to ${status}`,
          variant: "default"
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const stats = {
    totalContacts: contactMessagesQuery.data?.length || 0,
    totalDemos: demoRequestsQuery.data?.length || 0,
    totalProviders: providerSignupsQuery.data?.length || 0,
    totalLinkedInOrders: linkedinOrdersQuery.data?.length || 0,
    unreadContacts: contactMessagesQuery.data?.filter(m => !m.isRead).length || 0,
    unreadDemos: demoRequestsQuery.data?.filter(d => !d.isRead).length || 0,
    unreadProviders: providerSignupsQuery.data?.filter(p => !p.isRead).length || 0,
    unreadLinkedInOrders: linkedinOrdersQuery.data?.filter(o => !o.isRead).length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEO
        title="Admin Dashboard - TechInRent"
        description="Admin dashboard for managing TechInRent platform"
        noIndex={true}
      />
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <Badge variant="secondary">Admin Dashboard</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setLocation("/")}>
              View Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                  <p className="text-3xl font-bold">{stats.totalContacts}</p>
                  <p className="text-sm text-red-600">{stats.unreadContacts} unread</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Demo Requests</p>
                  <p className="text-3xl font-bold">{stats.totalDemos}</p>
                  <p className="text-sm text-red-600">{stats.unreadDemos} unread</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Provider Signups</p>
                  <p className="text-3xl font-bold">{stats.totalProviders}</p>
                  <p className="text-sm text-red-600">{stats.unreadProviders} unread</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">LinkedIn Orders</p>
                  <p className="text-3xl font-bold">{stats.totalLinkedInOrders}</p>
                  <p className="text-sm text-red-600">{stats.unreadLinkedInOrders} unread</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Contact Messages</TabsTrigger>
            <TabsTrigger value="demos">Demo Requests</TabsTrigger>
            <TabsTrigger value="providers">Provider Signups</TabsTrigger>
            <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Messages from potential customers and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {contactMessagesQuery.isLoading ? (
                  <LoadingSpinner />
                ) : contactMessagesQuery.data && contactMessagesQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {contactMessagesQuery.data.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-4 border rounded-lg ${message.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{message.name}</h3>
                            {!message.isRead && <Badge variant="destructive">New</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                            {!message.isRead && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead('contact-messages', message.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {message.email}
                            </span>
                          </div>
                          <p className="font-medium">{message.subject}</p>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No contact messages yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="demos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demo Requests</CardTitle>
                <CardDescription>Requests for product demonstrations and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                {demoRequestsQuery.isLoading ? (
                  <LoadingSpinner />
                ) : demoRequestsQuery.data && demoRequestsQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {demoRequestsQuery.data.map((demo) => (
                      <motion.div
                        key={demo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-4 border rounded-lg ${demo.isRead ? 'bg-gray-50' : 'bg-green-50 border-green-200'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{demo.name}</h3>
                            {!demo.isRead && <Badge variant="destructive">New</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{formatDate(demo.createdAt)}</span>
                            {!demo.isRead && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead('demo-requests', demo.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {demo.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {demo.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {demo.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Preferred: {demo.preferredDate || "Not specified"}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-2">{demo.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No demo requests yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Signups</CardTitle>
                <CardDescription>LinkedIn account providers who want to rent their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {providerSignupsQuery.isLoading ? (
                  <LoadingSpinner />
                ) : providerSignupsQuery.data && providerSignupsQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {providerSignupsQuery.data.map((provider) => (
                      <motion.div
                        key={provider.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-4 border rounded-lg ${provider.isRead ? 'bg-gray-50' : 'bg-purple-50 border-purple-200'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{provider.name}</h3>
                            {!provider.isRead && <Badge variant="destructive">New</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{formatDate(provider.createdAt)}</span>
                            {!provider.isRead && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead('provider-signups', provider.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {provider.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {provider.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {provider.industry}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {provider.connections} connections
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              Account Age: {provider.accountAge || "Not specified"}
                            </span>
                            <a
                              href={provider.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              LinkedIn URL
                            </a>
                          </div>
                          <p className="text-gray-600">{provider.additionalInfo}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No provider signups yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="linkedin-orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn Connection Orders</CardTitle>
                <CardDescription>Orders for LinkedIn connection purchase services</CardDescription>
              </CardHeader>
              <CardContent>
                {linkedinOrdersQuery.isLoading ? (
                  <LoadingSpinner />
                ) : linkedinOrdersQuery.isError ? (
                  <div className="text-center text-red-500 py-8">
                    Error loading LinkedIn orders
                    <p className="text-sm text-gray-500 mt-2">Please check authentication and try refreshing the page</p>
                  </div>
                ) : linkedinOrdersQuery.data && linkedinOrdersQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {linkedinOrdersQuery.data.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-6 border rounded-lg ${order.isRead ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={order.isRead ? "secondary" : "default"}>Order #{order.id}</Badge>
                            <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'outline' : 'secondary'}>
                              {order.status}
                            </Badge>
                            {order.paymentDone && (
                              <Badge variant="default">Payment Done</Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Customer Details</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Name: </span>{order.customerName}
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {order.customerEmail}
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2 mt-4">Order Details</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Package: </span>{order.packageName}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Connections: </span>{order.connections}
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-bold text-green-600">${order.price}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Payment Method: </span>{order.paymentMethod}
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2 mt-4">LinkedIn Profile URL</h4>
                            <a
                              href={order.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Profile
                            </a>
                            <h4 className="font-semibold text-gray-800 mb-2 mt-4">Additional Notes</h4>
                            <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded">{order.notes}</p>
                          </div>
                          {order.screenshot && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Payment Screenshot</h4>
                              <div className="bg-gray-100 p-3 rounded">
                                <p className="text-sm text-gray-600">Screenshot uploaded</p>
                                <p className="text-xs text-gray-500 mt-1">{order.screenshot.substring(0, 50)}...</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-4 border-t">
                          {!order.isRead && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markLinkedInOrderAsRead(order.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateLinkedInOrderStatus(order.id, 'processing')}
                            disabled={order.status === 'processing'}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Mark Processing
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateLinkedInOrderStatus(order.id, 'completed')}
                            disabled={order.status === 'completed'}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Completed
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No LinkedIn connection orders yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}