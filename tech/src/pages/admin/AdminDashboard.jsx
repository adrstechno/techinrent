import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  MessageSquare,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  Mail,
  Phone,
  Briefcase,
  Clock,
  Eye,
} from "lucide-react";
import Logo from "@/components/service/Logo";
import SEO from "@/components/service/SEO";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { formatDate } from "@/lib/utils";

const fetcher = async (url, errorMsg) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(errorMsg || "Failed to fetch");
  return res.json();
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadContacts: 0,
    totalDemos: 0,
    unreadDemos: 0,
    totalProviders: 0,
    unreadProviders: 0,
    totalLinkedInOrders: 0,
    unreadLinkedInOrders: 0,
  });

  const contactMessagesQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () =>
      fetcher("/api/admin/contacts", "Failed to fetch contact messages"),
    onSuccess: (data) => {
      setStats((prev) => ({
        ...prev,
        totalContacts: data.length,
        unreadContacts: data.filter((d) => !d.isRead).length,
      }));
    },
  });

  const demoRequestsQuery = useQuery({
    queryKey: ["demo-requests"],
    queryFn: () => fetcher("/api/admin/demos", "Failed to fetch demo requests"),
    onSuccess: (data) => {
      setStats((prev) => ({
        ...prev,
        totalDemos: data.length,
        unreadDemos: data.filter((d) => !d.isRead).length,
      }));
    },
  });

  const providerSignupsQuery = useQuery({
    queryKey: ["provider-signups"],
    queryFn: () =>
      fetcher("/api/admin/inquiries", "Failed to fetch provider signups"),
    onSuccess: (data) => {
      setStats((prev) => ({
        ...prev,
        totalProviders: data.length,
        unreadProviders: data.filter((d) => !d.isRead).length,
      }));
    },
  });

  const linkedinOrdersQuery = useQuery({
    queryKey: ["linkedin-orders"],
    queryFn: () =>
      fetcher("/api/admin/orders", "Failed to fetch LinkedIn orders"),
    onSuccess: (data) => {
      setStats((prev) => ({
        ...prev,
        totalLinkedInOrders: data.length,
        unreadLinkedInOrders: data.filter((d) => !d.isRead).length,
      }));
    },
  });

  const markAsRead = async (type, id) => {
    await fetch(`/api/admin/${type}/${id}/mark-read`, {
      method: "PATCH",
    });
    queryClient.invalidateQueries([type]);
  };

  const markLinkedInOrderAsRead = (id) => markAsRead("linkedin-orders", id);

  const updateLinkedInOrderStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}/update-status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    queryClient.invalidateQueries(["linkedin-orders"]);
  };

  const handleLogout = () => {
    window.location.href = "/login";
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
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              View Site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Contact Messages"
            count={stats.totalContacts}
            unread={stats.unreadContacts}
            icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
          />
          <StatCard
            title="Demo Requests"
            count={stats.totalDemos}
            unread={stats.unreadDemos}
            icon={<Calendar className="h-8 w-8 text-green-600" />}
          />
          <StatCard
            title="Provider Signups"
            count={stats.totalProviders}
            unread={stats.unreadProviders}
            icon={<Users className="h-8 w-8 text-purple-600" />}
          />
          <StatCard
            title="LinkedIn Orders"
            count={stats.totalLinkedInOrders}
            unread={stats.unreadLinkedInOrders}
            icon={<DollarSign className="h-8 w-8 text-orange-600" />}
          />
        </div>

        {/* Add your TabsContent sections here like in your original long version */}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, unread, icon }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-sm text-red-600">{unread} unread</p>
        </div>
        {icon}
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboard;
