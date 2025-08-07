// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "wouter";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger
// } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";
// import { formatDistanceToNow } from "date-fns";
// import {
//   Mail,
//   Phone,
//   Calendar,
//   User,
//   Building,
//   Briefcase,
//   Download,
//   Trash2
// } from "lucide-react";

// // Function to export data to CSV
// function exportToCSV(data, filename) {
//   if (!data || data.length === 0) return;

//   let csvContent = "";
//   let headers = [];

//   // Determine the headers from the first object
//   if (filename === 'contact-messages') {
//     headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Created At', 'Read Status'];
//     csvContent = headers.join(',') + '\n';

//     data.forEach(row => {
//       const values = [
//         row.id,
//         `"${row.name?.replace(/"/g, '""') || ''}"`,
//         `"${row.email?.replace(/"/g, '""') || ''}"`,
//         `"${row.subject?.replace(/"/g, '""') || ''}"`,
//         `"${row.message?.replace(/"/g, '""') || ''}"`,
//         new Date(row.createdAt).toLocaleString(),
//         row.isRead ? 'Read' : 'Unread'
//       ];
//       csvContent += values.join(',') + '\n';
//     });
//   } else if (filename === 'demo-requests') {
//     headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Designation', 'Created At', 'Read Status'];
//     csvContent = headers.join(',') + '\n';

//     data.forEach(row => {
//       const values = [
//         row.id,
//         `"${row.firstName?.replace(/"/g, '""') || ''}"`,
//         `"${row.lastName?.replace(/"/g, '""') || ''}"`,
//         `"${row.email?.replace(/"/g, '""') || ''}"`,
//         `"${row.phone?.replace(/"/g, '""') || ''}"`,
//         `"${row.company?.replace(/"/g, '""') || 'Not specified'}"`,
//         `"${row.designation?.replace(/"/g, '""') || ''}"`,
//         new Date(row.createdAt).toLocaleString(),
//         row.isRead ? 'Read' : 'Unread'
//       ];
//       csvContent += values.join(',') + '\n';
//     });
//   } else if (filename === 'provider-inquiries') {
//     headers = ['ID', 'Full Name', 'Email', 'Phone', 'LinkedIn URL', 'Profile Status', 'Additional Info', 'Created At', 'Read Status'];
//     csvContent = headers.join(',') + '\n';

//     data.forEach(row => {
//       const values = [
//         row.id,
//         `"${row.fullName?.replace(/"/g, '""') || ''}"`,
//         `"${row.email?.replace(/"/g, '""') || ''}"`,
//         `"${row.phone?.replace(/"/g, '""') || ''}"`,
//         `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
//         row.profileStatus || '',
//         `"${row.additionalInfo?.replace(/"/g, '""') || ''}"`,
//         new Date(row.createdAt).toLocaleString(),
//         row.isRead ? 'Read' : 'Unread'
//       ];
//       csvContent += values.join(',') + '\n';
//     });
//   }

//   // Create a Blob and download link
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// export default function Admin() {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("contact");

//   // Get contact messages
//   const contactQuery = useQuery({
//     queryKey: ['contact-messages'],
//     queryFn: async () => {
//       const response = await fetch('http://localhost:5000/api/admin/contacts/', {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch contact messages');
//       }
//       const data = await response.json();
//       console.log("Contact Messages Data:", data);
//       return Array.isArray(data.data) ? data.data : [];
//     },
//     retry: 2,
//   });

//   // Get demo requests
//   const demoQuery = useQuery({
//     queryKey: ['demo-requests'],
//     queryFn: async () => {
//       const response = await fetch('http://localhost:5000/api/admin/demos/', {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch demo requests');
//       }
//       const data = await response.json();
//       console.log("Demo Requests Data:", data);


//       return Array.isArray(data.data) ? data.data : [];
//     },
//     retry: 2,
//   });

//   // Get provider inquiries
//   const providerQuery = useQuery({
//     queryKey: ['provider-inquiries'],
//     queryFn: async () => {
//       const response = await fetch('http://localhost:5000/api/admin/allproviders/', {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch provider inquiries');
//       }
//       const data = await response.json();
//       console.log("Provider Inquiries Data:", data);
//       return Array.isArray(data.data) ? data.data : [];
//     },
//     retry: 2,
//   });
//   // Get LinkedIn connection orders
//   const linkedinQuery = useQuery({
//     queryKey: ['linkedin-connection-orders'],
//     queryFn: async () => {
//      const response = await fetch('http://localhost:5000/api/admin/allorders/', {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch LinkedIn connection orders');
//       }
//       const data = await response.json();
//       console.log("Provider Inquiries Data:", data);
//       return Array.isArray(data.data) ? data.data : [];
//     },
//     retry: 2,
//     initialData: [],
//   });
//   // Mark contact message as read
//   const markContactAsRead = async (id) => {
//     try {
//       const response = await fetch(`/api/admin/contacts/${id}/read`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark message as read');
//       }

//       await contactQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Message marked as read",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to mark message as read",
//         variant: "destructive",
//       });
//     }
//   };

//   // Mark demo request as read
//   const markDemoAsRead = async (id) => {
//     try {
//       const response = await fetch(`/api/admin/demos/${id}/read`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark demo request as read');
//       }

//       await demoQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Demo request marked as read",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to mark demo request as read",
//         variant: "destructive",
//       });
//     }
//   };

//   // Mark provider registration as read
//   const markProviderAsRead = async (id) => {
//     try {
//       const response = await fetch(`/api/admin/allproviders/${id}/read`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to mark provider registration as read');
//       }

//       await providerQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Provider registration marked as read",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to mark provider registration as read",
//         variant: "destructive",
//       });
//     }
//   };

  

//   // Delete contact message
//   const deleteContactMessage = async (id) => {
//     if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) {
//       return;
//     }
//     try {
//       const response = await fetch(`/api/admin/contacts/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       await contactQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Contact message deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to delete contact message",
//         variant: "destructive",
//       });
//     }
//   };

//   // Delete demo request
//   const deleteDemoRequest = async (id) => {
//     if (!confirm("Are you sure you want to delete this demo request? This action cannot be undone.")) {
//       return;
//     }
//     try {
//       const response = await fetch(`/api/admin/demos/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       await demoQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Demo request deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to delete demo request",
//         variant: "destructive",
//       });
//     }
//   };

//   // Delete provider registration
//   const deleteProviderRegistration = async (id) => {
//     if (!confirm("Are you sure you want to delete this provider registration? This action cannot be undone.")) {
//       return;
//     }
//     try {
//       const response = await fetch(`/api/admin/inquiries/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       await providerQuery.refetch();
//       toast({
//         title: "Success",
//         description: "Provider registration deleted successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to delete provider registration",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-skyblue/30">
//       <div className="container mx-auto py-6 px-4 sm:px-6">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-4">Admin Dashboard</h1>
//         <p className="text-gray-700 mb-8">
//           Manage your platform data and monitor activities
//         </p>

//         <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
//             <TabsTrigger value="contact">Contact Messages</TabsTrigger>
//             <TabsTrigger value="demo">Demo Requests</TabsTrigger>
//             <TabsTrigger value="provider">Provider Registrations</TabsTrigger>
//             <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
//           </TabsList>

//           <TabsContent value="contact">
//             {contactQuery.isLoading ? (
//               <div className="text-center py-10">Loading messages...</div>
//             ) : contactQuery.isError ? (
//               <div className="text-center py-10 text-red-500">
//                 Error: {contactQuery.error.message}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <div className="mb-4 flex justify-between">
//                   <Button
//                     variant="outline"
//                     onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
//                     disabled={!contactQuery.data?.length}
//                   >
//                     <Download className="mr-2 h-4 w-4" /> Export CSV
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => contactQuery.refetch()}
//                   >
//                     Refresh
//                   </Button>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Email</th>
//                       <th className="px-4 py-2">Subject</th>
//                       <th className="px-4 py-2">Message</th>
//                       <th className="px-4 py-2">Date</th>
//                       <th className="px-4 py-2 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {contactQuery.data.map((message, index) => (
//                       <tr key={message.id} className={message.isRead ? "opacity-70" : ""}>
//                         <td className="px-4 py-2" key={index} >{message.fullname}</td>
//                         <td className="px-4 py-2">{message.email}</td>
//                         <td className="px-4 py-2">{message.subject || "no subject"}</td>
//                         <td className="px-4 py-2 whitespace-pre-wrap">{message.message}</td>
//                         <td className="px-4 py-2">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</td>
//                         <td className="px-4 py-2 flex gap-2 justify-center">
//                           {!message.isRead && (
//                             <Button size="sm" variant="outline" onClick={() => markContactAsRead(message.id)}>Mark Read</Button>
//                           )}
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="text-red-600"
//                             onClick={() => deleteContactMessage(message.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </TabsContent>


//           <TabsContent value="demo">
//             {demoQuery.isLoading ? (
//               <div className="text-center py-10">Loading demo requests...</div>
//             ) : demoQuery.isError ? (
//               <div className="text-center py-10 text-red-500">
//                 Error: {demoQuery.error.message}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <div className="mb-4 flex justify-between">
//                   <Button variant="outline" onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}>
//                     <Download className="mr-2 h-4 w-4" /> Export CSV
//                   </Button>
//                   <Button variant="outline" onClick={() => demoQuery.refetch()}>Refresh</Button>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Email</th>
//                       <th className="px-4 py-2">Phone</th>
//                       <th className="px-4 py-2">Company</th>
//                       <th className="px-4 py-2">Job Title</th>
//                       <th className="px-4 py-2">Date</th>
//                       <th className="px-4 py-2 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {demoQuery.data.map((request, index) => (
//                       <tr key={request.id || request._id || index} className={request.isRead ? "opacity-70" : ""}>
//                         <td className="px-4 py-2">{request.firstName} {request.lastName}</td>
//                         <td className="px-4 py-2">{request.email}</td>
//                         <td className="px-4 py-2">{request.phone}</td>
//                         <td className="px-4 py-2">{request.companyName}</td>
//                         <td className="px-4 py-2">{request.jobtitle}</td>
//                         <td className="px-4 py-2">{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</td>
//                         <td className="px-4 py-2 flex gap-2 justify-center">
//                           {!request.isRead && (
//                             <Button size="sm" variant="outline" onClick={() => markDemoAsRead(request.id)}>Mark Read</Button>
//                           )}
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="text-red-600"
//                             onClick={() => deleteDemoRequest(request.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </TabsContent>


//           {/* PROVIDER REGISTRATIONS TABLE */}
//           <TabsContent value="provider">
//             {providerQuery.isLoading ? (
//               <div className="text-center py-10">Loading provider registrations...</div>
//             ) : providerQuery.isError ? (
//               <div className="text-center py-10 text-red-500">
//                 Error: {providerQuery.error.message}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <div className="mb-4 flex justify-between">
//                   <Button variant="outline" onClick={() => exportToCSV(providerQuery.data, 'provider-inquiries')}>
//                     <Download className="mr-2 h-4 w-4" /> Export CSV
//                   </Button>
//                   <Button variant="outline" onClick={() => providerQuery.refetch()}>Refresh</Button>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Email</th>
//                       <th className="px-4 py-2">Phone</th>
//                       <th className="px-4 py-2">LinkedIn URL</th>
//                       <th className="px-4 py-2">Status</th>
//                       <th className="px-4 py-2">Additional Info</th>
//                       <th className="px-4 py-2">Date</th>
//                       <th className="px-4 py-2 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {providerQuery.data.map((inquiry) => (
//                       <tr key={inquiry.id} className={inquiry.isRead ? "opacity-70" : ""}>
//                         <td className="px-4 py-2">{inquiry.fullName}</td>
//                         <td className="px-4 py-2">{inquiry.email}</td>
//                         <td className="px-4 py-2">{inquiry.phone}</td>
//                         <td className="px-4 py-2">{inquiry.linkedIn}</td>
//                         <td className="px-4 py-2">{inquiry.verification || '-'}</td>
//                         <td className="px-4 py-2 whitespace-pre-wrap">{inquiry.additionalInfo}</td>
//                         <td className="px-4 py-2">
//                           {inquiry.createdAt && !isNaN(new Date(inquiry.createdAt)) ? (
//                             formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })
//                           ) : (
//                             "Invalid date"
//                           )}
//                         </td>

//                         <td className="px-4 py-2 flex gap-2 justify-center">
//                           {!inquiry.isRead && (
//                             <Button size="sm" variant="outline" onClick={() => markProviderAsRead(inquiry.id)}>Mark Read</Button>
//                           )}
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="text-red-600"
//                             onClick={() => deleteProviderRegistration(inquiry.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </TabsContent>

//           {/* LINKEDIN ORDERS TABLE */}
//           <TabsContent value="linkedin-orders">
//             {linkedinQuery.isLoading ? (
//               <div className="text-center py-10">Loading LinkedIn orders...</div>
//             ) : linkedinQuery.isError ? (
//               <div className="text-center py-10 text-red-500">
//                 Error: {linkedinQuery.error.message}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <div className="mb-4 flex justify-between">
//                   <Button variant="outline" onClick={() => exportToCSV(linkedinQuery.data, 'linkedin-orders')}>
//                     <Download className="mr-2 h-4 w-4" /> Export CSV
//                   </Button>
//                   <Button variant="outline" onClick={() => linkedinQuery.refetch()}>Refresh</Button>
//                 </div>
//                 <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2">Full Name</th>
//                       <th className="px-4 py-2">Email</th>
//                       <th className="px-4 py-2">LinkedIn URL</th>
//                       <th className="px-4 py-2">Package</th>
//                        <th className="px-4 py-2">Cost</th>
//                       <th className="px-4 py-2">AdditionalNotes</th>
//                       <th className="px-4 py-2">Payment Method</th>
//                       <th className="px-4 py-2">Payment Screenshot</th>
                     
//                       <th className="px-4 py-2">Date</th>
//                       <th className="px-4 py-2 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {linkedinQuery.data.map((order) => (
//                       <tr key={order.id} className={order.isRead ? "opacity-70" : ""}>
//                         <td className="px-4 py-2">{order.customer.fullname}</td>
//                         <td className="px-4 py-2">{order.customer.email}</td>
//                         <td className="px-4 py-2">{order.linkedin}</td>
//                         <td className="px-4 py-2">{order.package || '-'}</td>
//                         <td className="px-4 py-2">{order.cost ? `$${order.cost}` : '-'}</td>
//                         <td className="px-4 py-2 whitespace-pre-wrap">{order.additionalNotes}</td>
//                         <td className="px-4 py-2">{order.paymentMethod || '-'}</td>
//                    <td className="px-4 py-2">
//   {order.paymentScreenshot ? (
//     <a    href={`http://localhost:5000${order.paymentScreenshot}`} target="_blank" rel="noopener noreferrer">
//       <img
//        src={`../../server${order.paymentScreenshot}`}
//         alt="Payment Screenshot"
//         className="h-16 w-16 object-cover rounded hover:scale-105 transition-transform cursor-pointer"
//       />
//     </a>
//   ) : (
//     '-'
//   )}
// </td>


//                         <td className="px-4 py-2">{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</td>
//                         <td className="px-4 py-2 flex gap-2 justify-center">
//                           {!order.isRead && (
//                             <Button size="sm" variant="outline" onClick={() => markLinkedinOrderAsRead(order.id)}>Mark Read</Button>
//                           )}
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="text-red-600"
//                             onClick={() => deleteLinkedinOrder(order.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </TabsContent>

//         </Tabs>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
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
  Calendar,
  User,
  Building,
  Briefcase,
  Download,
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
        `"${row.name?.replace(/"/g, '""') || ''}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.subject?.replace(/"/g, '""') || ''}"`,
        `"${row.message?.replace(/"/g, '""') || ''}"`,
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
        `"${row.firstName?.replace(/"/g, '""') || ''}"`,
        `"${row.lastName?.replace(/"/g, '""') || ''}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.company?.replace(/"/g, '""') || 'Not specified'}"`,
        `"${row.designation?.replace(/"/g, '""') || ''}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  } else if (filename === 'provider-inquiries') {
    headers = ['ID', 'Full Name', 'Email', 'Phone', 'LinkedIn URL', 'Profile Status', 'Additional Info', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';

    data.forEach(row => {
      const values = [
        row.id,
        `"${row.fullName?.replace(/"/g, '""') || ''}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
        row.profileStatus || '',
        `"${row.additionalInfo?.replace(/"/g, '""') || ''}"`,
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
      const response = await fetch('http://localhost:5000/api/admin/contacts/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      const data = await response.json();
      console.log("Contact Messages Data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
    retry: 2,
  });

  // Get demo requests
  const demoQuery = useQuery({
    queryKey: ['demo-requests'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/admin/demos/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch demo requests');
      }
      const data = await response.json();
      console.log("Demo Requests Data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
    retry: 2,
  });

  // Get provider inquiries
  const providerQuery = useQuery({
    queryKey: ['provider-inquiries'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/admin/allproviders/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch provider inquiries');
      }
      const data = await response.json();
      console.log("Provider Inquiries Data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
    retry: 2,
  });

  // Get LinkedIn connection orders
  const linkedinQuery = useQuery({
    queryKey: ['linkedin-connection-orders'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/admin/allorders/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn connection orders');
      }
      const data = await response.json();
      console.log("orders Inquiries Data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
    retry: 2,
    
  });

  // Mark contact message as read
  const markContactAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }

      await contactQuery.refetch();
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark message as read",
        variant: "destructive",
      });
    }
  };

  // Mark demo request as read
  const markDemoAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/demos/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark demo request as read');
      }

      await demoQuery.refetch();
      toast({
        title: "Success",
        description: "Demo request marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark demo request as read",
        variant: "destructive",
      });
    }
  };

  // Mark provider registration as read
  const markProviderAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/allproviders/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark provider registration as read');
      }

      await providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark provider registration as read",
        variant: "destructive",
      });
    }
  };

  // Mark LinkedIn order as read
  const markLinkedinOrderAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/allorders/${id}/read`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark LinkedIn order as read');
      }

      await linkedinQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark LinkedIn order as read",
        variant: "destructive",
      });
    }
  };

  // Delete contact message
  const deleteContactMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) {
      return;
    }
    try {
        const response = await fetch(`http://localhost:5000/api/contact/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await contactQuery.refetch();
      toast({
        title: "Success",
        description: "Contact message deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact message",
        variant: "destructive",
      });
    }
  };
const deleteDemoRequest = async (id) => {
  if (!confirm("Are you sure you want to delete this demo request?")) return;

  try {
    const response = await fetch(`http://localhost:5000/api/book-demo/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    toast({
      title: "Deleted",
      description: "Demo request deleted successfully",
    });

    await demoQuery.refetch(); // If you're using React Query or SWR
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete",
      variant: "destructive",
    });
  }
};



  // Delete provider registration
  const deleteProviderRegistration = async (id) => {
    if (!confirm("Are you sure you want to delete this provider registration? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await providerQuery.refetch();
      toast({
        title: "Success",
        description: "Provider registration deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete provider registration",
        variant: "destructive",
      });
    }
  };

  // Delete LinkedIn order
  const deleteLinkedinOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this LinkedIn order? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/allorders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await linkedinQuery.refetch();
      toast({
        title: "Success",
        description: "LinkedIn order deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete LinkedIn order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-skyblue/30">
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 mb-8">
          Manage your platform data and monitor activities
        </p>

        <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
            <TabsTrigger value="demo">Demo Requests</TabsTrigger>
            <TabsTrigger value="provider">Provider Registrations</TabsTrigger>
            <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
          </TabsList>

          {/* CONTACT MESSAGES TABLE */}
          <TabsContent value="contact">
            {contactQuery.isLoading ? (
              <div className="text-center py-10">Loading messages...</div>
            ) : contactQuery.isError ? (
              <div className="text-center py-10 text-red-500">
                Error: {contactQuery.error.message}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Contact Messages</CardTitle>
                      <CardDescription>
                        {contactQuery.data?.length || 0} messages found
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
                        disabled={!contactQuery.data?.length}
                      >
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => contactQuery.refetch()}
                      >
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Message</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {contactQuery.data.map((message, index) => (
                          <tr key={message.id} className={message.isRead ? "bg-gray-50" : "bg-white"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{message.fullname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{message.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{message.subject || "no subject"}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 max-w-xs truncate">{message.message}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border border-gray-200">
                              <div className="flex gap-2 justify-center">
                                {!message.isRead && (
                                  <Button size="sm" variant="outline" onClick={() => markContactAsRead(message.id)}>Mark Read</Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                  onClick={() => deleteContactMessage(message._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* DEMO REQUESTS TABLE */}
          <TabsContent value="demo">
            {demoQuery.isLoading ? (
              <div className="text-center py-10">Loading demo requests...</div>
            ) : demoQuery.isError ? (
              <div className="text-center py-10 text-red-500">
                Error: {demoQuery.error.message}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Demo Requests</CardTitle>
                      <CardDescription>
                        {demoQuery.data?.length || 0} requests found
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                      <Button variant="outline" onClick={() => demoQuery.refetch()}>Refresh</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Phone</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Company</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Job Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {demoQuery.data.map((request, index) => (
                          <tr key={request.id || request._id || index} className={request.isRead ? "bg-gray-50" : "bg-white"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{request.firstName} {request.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{request.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{request.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{request.companyName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{request.jobtitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border border-gray-200">
                              <div className="flex gap-2 justify-center">
                                {!request.isRead && (
                                  <Button size="sm" variant="outline" onClick={() => markDemoAsRead(request.id)}>Mark Read</Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                  onClick={() => deleteDemoRequest(request._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PROVIDER REGISTRATIONS TABLE */}
          <TabsContent value="provider">
            {providerQuery.isLoading ? (
              <div className="text-center py-10">Loading provider registrations...</div>
            ) : providerQuery.isError ? (
              <div className="text-center py-10 text-red-500">
                Error: {providerQuery.error.message}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Provider Registrations</CardTitle>
                      <CardDescription>
                        {providerQuery.data?.length || 0} registrations found
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportToCSV(providerQuery.data, 'provider-inquiries')}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                      <Button variant="outline" onClick={() => providerQuery.refetch()}>Refresh</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Phone</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">LinkedIn URL</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Additional Info</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {providerQuery.data.map((inquiry) => (
                          <tr key={inquiry.id} className={inquiry.isRead ? "bg-gray-50" : "bg-white"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{inquiry.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{inquiry.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{inquiry.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                              {inquiry.linkedIn ? (
                                <a href={inquiry.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  View Profile
                                </a>
                              ) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                              <Badge variant={inquiry.verification === 'verified' ? 'default' : 'secondary'}>
                                {inquiry.verification || '-'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 max-w-xs truncate">{inquiry.additionalInfo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                              {inquiry.createdAt && !isNaN(new Date(inquiry.createdAt)) ? (
                                formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })
                              ) : (
                                "Invalid date"
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border border-gray-200">
                              <div className="flex gap-2 justify-center">
                                {!inquiry.isRead && (
                                  <Button size="sm" variant="outline" onClick={() => markProviderAsRead(inquiry.id)}>Mark Read</Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                  onClick={() => deleteProviderRegistration(inquiry.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* LINKEDIN ORDERS TABLE */}
          <TabsContent value="linkedin-orders">
            {linkedinQuery.isLoading ? (
              <div className="text-center py-10">Loading LinkedIn orders...</div>
            ) : linkedinQuery.isError ? (
              <div className="text-center py-10 text-red-500">
                Error: {linkedinQuery.error.message}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>LinkedIn Connection Orders</CardTitle>
                      <CardDescription>
                        {linkedinQuery.data?.length || 0} orders found
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportToCSV(linkedinQuery.data, 'linkedin-orders')}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                      </Button>
                      <Button variant="outline" onClick={() => linkedinQuery.refetch()}>Refresh</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Full Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">LinkedIn URL</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Package</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Cost</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Additional Notes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Payment Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Payment Screenshot</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {linkedinQuery.data.map((order) => (
                          <tr key={order.id} className={order.isRead ? "bg-gray-50" : "bg-white"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{order.customer.fullname}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{order.customer.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                              <a href={order.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                View Profile
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{order.package || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{order.cost ? `$${order.cost}` : '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 max-w-xs truncate">{order.additionalNotes}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{order.paymentMethod || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                              {order.paymentScreenshot ? (
                                <a href={`http://localhost:5000${order.paymentScreenshot}`} target="_blank" rel="noopener noreferrer">
                                  <img
                                    src={`../../server${order.paymentScreenshot}`}
                                    alt="Payment Screenshot"
                                    className="h-16 w-16 object-cover rounded hover:scale-105 transition-transform cursor-pointer"
                                  />
                                </a>
                              ) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border border-gray-200">
                              <div className="flex gap-2 justify-center">
                                {!order.isRead && (
                                  <Button size="sm" variant="outline" onClick={() => markLinkedinOrderAsRead(order.id)}>Mark Read</Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                  onClick={() => deleteLinkedinOrder(order.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}