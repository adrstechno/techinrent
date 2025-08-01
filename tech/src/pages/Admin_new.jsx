import React, { useState, useEffect } from "react";
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
  // Format the data based on the type
  let csvContent = "";
  let headers = [];
  // Determine the headers from the first object
  if (filename === "contact-messages") {
    headers = ["ID", "Name", "Email", "Subject", "Message", "Created At", "Read Status"];
    // Add the header row
    csvContent = headers.join(",") + "\n";
    // Add each row of data
    data.forEach((row) = {
      const values = [
        row.id,
        `"${row.name.replace(/"/g, '""')}"`, // Escape quotes in the name
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.subject?.replace(/"/g, '""') || ""}"`,
        `"${row.message.replace(/"/g, '""')}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? "Read" : "Unread"
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "demo-requests") {
    headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Company", "Designation", "Created At", "Read Status"];
    // Add the header row
    csvContent = headers.join(",") + "\n";
    // Add each row of data
    data.forEach((row) = {
      const values = [
        row.id,
        `"${row.firstName.replace(/"/g, '""')}"`,
        `"${row.lastName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone.replace(/"/g, '""')}"`,
        `"${row.company?.replace(/"/g, '""') || "Not specified"}"`,
        `"${row.designation?.replace(/"/g, '""') || ""}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? "Read" : "Unread"
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "provider-registrations") {
    headers = ["ID", "Full Name", "Email", "Phone", "LinkedIn URL", "Profile Status", "Additional Info", "Created At", "Read Status"];
    // Add the header row
    csvContent = headers.join(",") + "\n";
    // Add each row of data
    data.forEach((row) = {
      const values = [
        row.id,
        `"${row.fullName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedinUrl.replace(/"/g, '""')}"`,
        row.profileStatus,
        `"${row.additionalInfo?.replace(/"/g, '""') || ""}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? "Read" : "Unread"
      ];
      csvContent += values.join(",") + "\n";
    });
  } else if (filename === "linkedin-connection-orders") {
    headers = ["ID", "Customer Name", "Email", "Phone", "LinkedIn URL", "Connections", "Package", "Total Price", "Payment Method", "Status", "Created At", "Read Status"];
    // Add the header row
    csvContent = headers.join(",") + "\n";
    // Add each row of data
    data.forEach((row) = {
      const values = [
        row.id,
        `"${row.customerName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.phone?.replace(/"/g, '""') || ""}"`,
        `"${row.linkedinUrl.replace(/"/g, '""')}"`,
        row.connections,
        `"${row.packageName.replace(/"/g, '""')}"`,
        `$${row.totalPrice}`,
        `"${row.paymentMethod.replace(/"/g, '""')}"`,
        row.status,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? "Read" : "Unread"
      ];
      csvContent += values.join(",") + "\n";
    });
  }
  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Admin = () = {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  // Get contact messages
  const contactQuery = useQuery("contact-messages", async () = {
    const response = await fetch("/api/contact", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch contact messages");
    }
    return response.json();
  });
  // Get demo requests
  const demoQuery = useQuery("demo-requests", async () = {
    const response = await fetch("/api/demo-requests", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch demo requests");
    }
    return response.json();
  });
  // Get provider registrations
  const providerQuery = useQuery("provider-registrations", async () = {
    const response = await fetch("/api/provider-signup", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch provider registrations");
    }
    return response.json();
  });
  // Get LinkedIn connection orders
  const linkedinOrdersQuery = useQuery("linkedin-connection-orders", async () = {
    const response = await fetch("/api/linkedin-connection-orders", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch LinkedIn connection orders");
    }
    return response.json();
  });

  const markContactAsRead = async (id) = {
    try {
      await fetch(`/api/contact/${id}/read`, {
        method: "POST",
        credentials: "include",
      });
      contactQuery.refetch();
      toast({
        title: "Success",
        description: "Contact message marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark contact message as read",
        variant: "destructive",
      });
    }
  };

  return (
    
    // Add your render logic here
    
  );
};

export default Admin;

