//1111111111111111111111111111111 nr.txt
// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
//   Clipboard,
//   Calendar,
//   User,
//   Building,
//   Briefcase,
//   Download,
//   Lock,
//   Clock,
//   MessageCircle,
//   Trash2
// } from "lucide-react";

// // Function to export data to CSV
// function exportToCSV(data, filename) {
//   if (!data || data.length === 0) return;

//   let csvContent = "";
//   let headers = [];

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
//   } else if (filename === 'provider-registrations') {
//     headers = ['ID', 'Full Name', 'Email', 'Phone', 'LinkedIn URL', 'Profile Status', 'Additional Info', 'Created At', 'Read Status'];
//     csvContent = headers.join(',') + '\n';
//     data.forEach(row => {
//       const values = [
//         row.id,
//         `"${row.fullName?.replace(/"/g, '""') || ''}"`,
//         `"${row.email?.replace(/"/g, '""') || ''}"`,
//         `"${row.phone?.replace(/"/g, '""') || ''}"`,
//         `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
//         row.profileStatus,
//         `"${row.additionalInfo?.replace(/"/g, '""') || ''}"`,
//         new Date(row.createdAt).toLocaleString(),
//         row.isRead ? 'Read' : 'Unread'
//       ];
//       csvContent += values.join(',') + '\n';
//     });
//   } else if (filename === 'linkedin-connection-orders') {
//     headers = ['ID', 'Customer Name', 'Email', 'Phone', 'LinkedIn URL', 'Connections', 'Package', 'Total Price', 'Payment Method', 'Status', 'Created At', 'Read Status'];
//     csvContent = headers.join(',') + '\n';
//     data.forEach(row => {
//       const values = [
//         row.id,
//         `"${row.customerName?.replace(/"/g, '""') || ''}"`,
//         `"${row.email?.replace(/"/g, '""') || ''}"`,
//         `"${row.phone?.replace(/"/g, '""') || ''}"`,
//         `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
//         row.connections,
//         `"${row.packageName?.replace(/"/g, '""') || ''}"`,
//         `$${row.totalPrice}`,
//         `"${row.paymentMethod?.replace(/"/g, '""') || ''}"`,
//         row.status,
//         new Date(row.createdAt).toLocaleString(),
//         row.isRead ? 'Read' : 'Unread'
//       ];
//       csvContent += values.join(',') + '\n';
//     });
//   }

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// // Safer fetcher function for react-query
// const fetcher = async (url) => {
//   const response = await fetch(url, {
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const contentType = response.headers.get('content-type');

//   if (!response.ok) {
//     const errorText = await response.text(); // in case it's HTML
//     throw new Error(`Error fetching ${url}: ${response.status} - ${errorText}`);
//   }

//   if (contentType && contentType.includes('application/json')) {
//     const data = await response.json();
//     return data.data || [];
//   } else {
//     const text = await response.text();
//     throw new Error(`Expected JSON but got: ${text.slice(0, 100)}...`);
//   }
// };


// export default function Admin() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const [activeTab, setActiveTab] = useState("contact");

//   // React Query hooks for fetching data
//   const contactQuery = useQuery({
//     queryKey: ['contact-messages'],
//     queryFn: () => fetcher('/api/admin/contacts'),
//     initialData: [],
//   });

//   const demoQuery = useQuery({
//     queryKey: ['demo-requests'],
//     queryFn: () => fetcher('/api/demos'),
//     initialData: [],
//   });

//   const providerQuery = useQuery({
//     queryKey: ['provider-inquiries'],
//     queryFn: () => fetcher('/api/admin/providers'),
//     initialData: [],
//   });

//   const linkedinOrdersQuery = useQuery({
//     queryKey: ['linkedin-connection-orders'],
//     queryFn: () => fetcher('/api/admin/orders'),
//     initialData: [],
//   });

//   // Function to handle mutations (mark as read, delete, update)
//   const createMutation = (url, method, successMessage, errorMessage, refetchQueries) => {
//     return useMutation({
//       mutationFn: ({ id, payload }) => fetch(
//         payload ? `${url}/${id}` : `${url}/${id}`, {
//         method,
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: payload ? JSON.stringify(payload) : undefined,
//       }).then(res => {
//         if (!res.ok) throw new Error(errorMessage);
//         return res.json();
//       }),
//       onSuccess: () => {
//         toast({ title: "Success", description: successMessage });
//         refetchQueries.forEach(queryKey => queryClient.invalidateQueries({ queryKey }));
//       },
//       onError: (error) => {
//         toast({ title: "Error", description: error.message || errorMessage, variant: "destructive" });
//       },
//     });
//   };

//   // Mark as read mutations
//   const markContactAsReadMutation = createMutation('/api/admin/contacts', 'POST', 'Message marked as read', 'Failed to mark message as read', ['contact-messages']);
//   const markDemoAsReadMutation = createMutation('/api/admin/demos', 'POST', 'Demo request marked as read', 'Failed to mark demo request as read', ['demo-requests']);
//   const markProviderAsReadMutation = createMutation('/api/admin/providers', 'POST', 'Provider registration marked as read', 'Failed to mark provider registration as read', ['provider-inquiries']);
//   const markLinkedinOrderAsReadMutation = createMutation('/api/admin/orders', 'POST', 'Order marked as read', 'Failed to mark order as read', ['linkedin-connection-orders']);

//   // Delete mutations
//   const deleteContactMutation = createMutation('/api/admin/contacts', 'DELETE', 'Contact message deleted successfully', 'Failed to delete contact message', ['contact-messages']);
//   const deleteDemoMutation = createMutation('/api/admin/demos', 'DELETE', 'Demo request deleted successfully', 'Failed to delete demo request', ['demo-requests']);
//   const deleteProviderMutation = createMutation('/api/admin/inquiries', 'DELETE', 'Provider registration deleted successfully', 'Failed to delete provider registration', ['provider-inquiries']);
//   const deleteLinkedinOrderMutation = createMutation('/api/admin/orders', 'DELETE', 'LinkedIn order deleted successfully', 'Failed to delete LinkedIn order', ['linkedin-connection-orders']);

//   // Update order status mutation
//   const updateLinkedInOrderStatusMutation = createMutation('/api/admin/orders', 'PUT', 'Order status updated successfully', 'Failed to update order status', ['linkedin-connection-orders']);

//   const handleDelete = (mutationFn, id, message) => {
//     if (window.confirm(`Are you sure you want to delete this ${message}? This action cannot be undone.`)) {
//       mutationFn.mutate({ id });
//     }
//   };

//   const renderLoading = () => <div className="text-center py-10">Loading...</div>;
//   const renderError = (error) => <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
//   const renderNoData = (message) => <div className="text-center py-10 text-gray-500">{`No ${message} found.`}</div>;

//   return (
//     <div className="min-h-screen bg-skyblue/30">
//       <div className="container mx-auto py-6 px-4 sm:py-10">
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Manage your platform data and monitor activities</p>
//         </div>

//         <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1 gap-1">
//             <TabsTrigger value="contact" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
//               Contact
//             </TabsTrigger>
//             <TabsTrigger value="demo" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
//               Demo
//             </TabsTrigger>
//             <TabsTrigger value="provider" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
//               Provider
//             </TabsTrigger>
//             <TabsTrigger value="linkedin-orders" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
//               LinkedIn
//             </TabsTrigger>
//             <TabsTrigger value="secureforms" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
//               Forms
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="contact">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
//               <h2 className="text-xl font-semibold">Contact Messages</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
//                   disabled={contactQuery.isLoading || !contactQuery.data?.length}
//                   className="text-sm"
//                 >
//                   <Download className="mr-2 h-4 w-4" /> Export CSV
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => contactQuery.refetch()}
//                   disabled={contactQuery.isFetching}
//                   className="text-sm"
//                 >
//                   Refresh
//                 </Button>
//               </div>
//             </div>
//             {contactQuery.isFetching ? (
//               renderLoading()
//             ) : contactQuery.isError ? (
//               renderError(contactQuery.error)
//             ) : contactQuery.data?.length === 0 ? (
//               renderNoData('contact messages')
//             ) : (
//               <div className="space-y-4">
//                 {contactQuery.data.map(message => (
//                   <Card key={message.id} className={`max-w-2xl mx-auto ${message.isRead ? "opacity-70" : ""}`}>
//                     <CardHeader className="pb-2">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{message.subject || "No Subject"}</CardTitle>
//                           <CardDescription className="flex items-center gap-1 mt-1">
//                             <Calendar className="h-3 w-3" />
//                             {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
//                           </CardDescription>
//                         </div>
//                         {!message.isRead && (<Badge>New</Badge>)}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center gap-2">
//                         <User className="h-4 w-4 text-gray-500" />
//                         <span className="font-medium">{message.name}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-gray-500" />
//                         <span>{message.email}</span>
//                       </div>
//                       <Separator />
//                       <div className="pt-2 whitespace-pre-wrap text-gray-700 break-words">
//                         {message.message}
//                       </div>
//                       <div className="pt-2 flex justify-end gap-2">
//                         {!message.isRead && (
//                           <Button variant="outline" size="sm" onClick={() => markContactAsReadMutation.mutate({ id: message.id })}>
//                             Mark as Read
//                           </Button>
//                         )}
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDelete(deleteContactMutation, message.id, 'contact message')}
//                           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="demo">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
//               <h2 className="text-xl font-semibold">Demo Requests</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}
//                   disabled={demoQuery.isLoading || !demoQuery.data?.length}
//                   className="text-sm"
//                 >
//                   <Download className="mr-2 h-4 w-4" /> Export CSV
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => demoQuery.refetch()}
//                   disabled={demoQuery.isFetching}
//                   className="text-sm"
//                 >
//                   Refresh
//                 </Button>
//               </div>
//             </div>
//             {demoQuery.isFetching ? (
//               renderLoading()
//             ) : demoQuery.isError ? (
//               renderError(demoQuery.error)
//             ) : demoQuery.data?.length === 0 ? (
//               renderNoData('demo requests')
//             ) : (
//               <div className="space-y-4">
//                 {demoQuery.data.map(request => (
//                   <Card key={request.id || request._id} className={`max-w-2xl mx-auto ${request.isRead ? "opacity-70" : ""}`}>
//                     <CardHeader className="pb-2">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{request.firstName} {request.lastName}</CardTitle>
//                           <CardDescription className="flex items-center gap-1 mt-1">
//                             <Calendar className="h-3 w-3" />
//                             {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
//                           </CardDescription>
//                         </div>
//                         {!request.isRead && (<Badge>New</Badge>)}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-gray-500" />
//                         <span>{request.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="h-4 w-4 text-gray-500" />
//                         <span>{request.phone}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Building className="h-4 w-4 text-gray-500" />
//                         <span>{request.company || "Not specified"}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Briefcase className="h-4 w-4 text-gray-500" />
//                         <span>{request.designation}</span>
//                       </div>
//                       <div className="pt-2 flex justify-end gap-2">
//                         {!request.isRead && (
//                           <Button variant="outline" size="sm" onClick={() => markDemoAsReadMutation.mutate({ id: request.id })}>
//                             Mark as Read
//                           </Button>
//                         )}
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDelete(deleteDemoMutation, request.id, 'demo request')}
//                           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="provider">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
//               <h2 className="text-xl font-semibold">Provider Registrations</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => exportToCSV(providerQuery.data, 'provider-registrations')}
//                   disabled={providerQuery.isLoading || !providerQuery.data?.length}
//                   className="text-sm"
//                 >
//                   <Download className="mr-2 h-4 w-4" /> Export CSV
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => providerQuery.refetch()}
//                   disabled={providerQuery.isFetching}
//                   className="text-sm"
//                 >
//                   Refresh
//                 </Button>
//               </div>
//             </div>
//             {providerQuery.isFetching ? (
//               renderLoading()
//             ) : providerQuery.isError ? (
//               renderError(providerQuery.error)
//             ) : providerQuery.data?.length === 0 ? (
//               renderNoData('provider registrations')
//             ) : (
//               <div className="space-y-4">
//                 {providerQuery.data.map(provider => (
//                   <Card key={provider.id} className={`max-w-2xl mx-auto ${provider.isRead ? "opacity-70" : ""}`}>
//                     <CardHeader className="pb-2">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle className="text-lg">{provider.fullName}</CardTitle>
//                           <CardDescription className="flex items-center gap-1 mt-1">
//                             <Calendar className="h-3 w-3" />
//                             {formatDistanceToNow(new Date(provider.createdAt), { addSuffix: true })}
//                           </CardDescription>
//                         </div>
//                         {!provider.isRead && (<Badge>New</Badge>)}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-gray-500" />
//                         <span>{provider.email}</span>
//                       </div>
//                       {provider.phone && (
//                         <div className="flex items-center gap-2">
//                           <Phone className="h-4 w-4 text-gray-500" />
//                           <span>{provider.phone}</span>
//                         </div>
//                       )}
//                       <div className="flex items-center gap-2">
//                         <Clipboard className="h-4 w-4 text-gray-500" />
//                         <span>
//                           <a
//                             href={provider.linkedinUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:underline"
//                           >
//                             LinkedIn Profile
//                           </a>
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Badge variant={provider.profileStatus === 'verified' ? 'default' : 'outline'}>
//                           {provider.profileStatus === 'verified' ? 'Verified Profile' : 'Non-Verified Profile'}
//                         </Badge>
//                       </div>
//                       {provider.additionalInfo && (
//                         <>
//                           <Separator />
//                           <div>
//                             <h4 className="text-sm font-medium mb-1">Additional Information:</h4>
//                             <p className="text-sm text-gray-600 whitespace-pre-wrap">{provider.additionalInfo}</p>
//                           </div>
//                         </>
//                       )}
//                       <div className="pt-2 flex justify-end gap-2">
//                         {!provider.isRead && (
//                           <Button variant="outline" size="sm" onClick={() => markProviderAsReadMutation.mutate({ id: provider.id })}>
//                             Mark as Read
//                           </Button>
//                         )}
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDelete(deleteProviderMutation, provider.id, 'provider registration')}
//                           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="secureforms" className="space-y-6">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//               <h2 className="text-xl font-semibold">Secure Forms</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Link href="/admin/secure-forms">
//                   <Button
//                     className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto"
//                   >
//                     <Lock className="mr-2 h-4 w-4" />
//                     Manage Secure Forms
//                   </Button>
//                 </Link>
//               </div>
//             </div>

//             <Card className="max-w-2xl mx-auto">
//               <CardHeader>
//                 <CardTitle>Secure Form Management</CardTitle>
//                 <CardDescription>
//                   Create and manage secure forms for collecting sensitive information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="rounded-lg border p-4">
//                     <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
//                     <p className="text-sm text-gray-500 mb-4">
//                       Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.
//                     </p>
//                     <Link href="/admin/secure-forms">
//                       <Button
//                         variant="outline"
//                         className="w-full"
//                       >
//                         Create New Link
//                       </Button>
//                     </Link>
//                   </div>
//                   <div className="rounded-lg border p-4">
//                     <h3 className="text-lg font-medium mb-2">View Submissions</h3>
//                     <p className="text-sm text-gray-500 mb-4">
//                       Access and manage all the secure form submissions from users.
//                     </p>
//                     <Link href="/admin/secure-forms">
//                       <Button
//                         variant="outline"
//                         className="w-full"
//                       >
//                         View Submissions
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
//                   <h4 className="text-amber-800 font-medium">Security Note</h4>
//                   <p className="text-sm text-amber-700 mt-1">
//                     Secure forms contain sensitive information. Access is restricted to authorized administrators only.
//                     All form URLs are single-use and expire after submission.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="linkedin-orders">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
//               <h2 className="text-xl font-semibold">LinkedIn Connection Orders</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => exportToCSV(linkedinOrdersQuery.data, 'linkedin-connection-orders')}
//                   disabled={linkedinOrdersQuery.isLoading || !linkedinOrdersQuery.data?.length}
//                   className="text-sm"
//                 >
//                   <Download className="mr-2 h-4 w-4" /> Export CSV
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => linkedinOrdersQuery.refetch()}
//                   disabled={linkedinOrdersQuery.isFetching}
//                   className="text-sm"
//                 >
//                   Refresh
//                 </Button>
//               </div>
//             </div>
//             {linkedinOrdersQuery.isFetching ? (
//               renderLoading()
//             ) : linkedinOrdersQuery.isError ? (
//               renderError(linkedinOrdersQuery.error)
//             ) : linkedinOrdersQuery.data?.length === 0 ? (
//               renderNoData('LinkedIn connection orders')
//             ) : (
//               <div className="grid gap-4">
//                 {linkedinOrdersQuery.data.map(order => (
//                   <Card key={order.id} className="w-full">
//                     <CardHeader>
//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                         <div className="flex-1">
//                           <CardTitle className="text-base sm:text-lg">
//                             Order #{order.id} - {order.customerName}
//                           </CardTitle>
//                           <CardDescription className="text-sm">
//                             {order.connections} connections • {order.packageName} • ${order.totalPrice}
//                           </CardDescription>
//                         </div>
//                         <div className="flex gap-2">
//                           <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'secondary' : 'outline'}>
//                             {order.status}
//                           </Badge>
//                           {!order.isRead && (<Badge variant="destructive">Unread</Badge>)}
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
//                         <div className="space-y-3">
//                           <div className="flex items-center gap-2">
//                             <Mail className="h-4 w-4 text-gray-500" />
//                             <span className="font-medium">Email:</span>
//                             <span>{order.email}</span>
//                           </div>
//                           {order.phone && (
//                             <div className="flex items-center gap-2">
//                               <Phone className="h-4 w-4 text-gray-500" />
//                               <span className="font-medium">Phone:</span>
//                               <span>{order.phone}</span>
//                             </div>
//                           )}
//                           <div className="flex items-start gap-2">
//                             <Building className="h-4 w-4 text-gray-500 mt-0.5" />
//                             <span className="font-medium">LinkedIn:</span>
//                             <a href={order.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
//                               {order.linkedinUrl}
//                             </a>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Clipboard className="h-4 w-4 text-gray-500" />
//                             <span className="font-medium">Payment Method:</span>
//                             <span>{order.paymentMethod}</span>
//                           </div>
//                           {order.notes && (
//                             <div className="flex items-start gap-2">
//                               <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
//                               <span className="font-medium">Notes:</span>
//                               <span className="text-gray-700 break-words">{order.notes}</span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="space-y-3">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4 text-gray-500" />
//                             <span className="font-medium">Order Date:</span>
//                             <span>{new Date(order.createdAt).toLocaleString('en-US', {
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit',
//                               second: '2-digit',
//                               timeZoneName: 'short'
//                             })}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Clock className="h-4 w-4 text-gray-500" />
//                             <span className="font-medium">Time Since:</span>
//                             <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
//                           </div>
//                           {order.paymentScreenshot ? (
//                             <div className="space-y-2">
//                               <div className="flex items-center gap-2">
//                                 <Lock className="h-4 w-4 text-green-600" />
//                                 <span className="font-medium text-green-600">Payment Screenshot:</span>
//                               </div>
//                               <div className="border rounded-lg p-2 bg-gray-50">
//                                 <img
//                                   src={order.paymentScreenshot}
//                                   alt="Payment Screenshot"
//                                   className="max-w-full h-auto max-h-48 rounded cursor-pointer hover:opacity-80 transition-opacity"
//                                   onClick={() => window.open(order.paymentScreenshot, '_blank')}
//                                 />
//                                 <div className="mt-2 text-xs text-gray-600">
//                                   Click to view full size
//                                 </div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <Lock className="h-4 w-4 text-red-500" />
//                               <span className="font-medium text-red-500">Payment Screenshot:</span>
//                               <span className="text-red-500">Not uploaded</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <Separator className="my-4" />

//                       <div className="flex flex-wrap gap-2 justify-between items-center">
//                         <div className="flex flex-wrap gap-2">
//                           {!order.isRead && (
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => markLinkedinOrderAsReadMutation.mutate({ id: order.id })}
//                               className="text-xs"
//                             >
//                               Mark as Read
//                             </Button>
//                           )}
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateLinkedInOrderStatusMutation.mutate({ id: order.id, payload: { status: 'processing' } })}
//                             disabled={order.status === 'processing'}
//                             className="text-xs"
//                           >
//                             Mark Processing
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateLinkedInOrderStatusMutation.mutate({ id: order.id, payload: { status: 'completed' } })}
//                             disabled={order.status === 'completed'}
//                             className="text-xs"
//                           >
//                             Mark Completed
//                           </Button>
//                         </div>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDelete(deleteLinkedinOrderMutation, order.id, 'LinkedIn order')}
//                           className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

///222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222r.txt

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
//       const response = await fetch('http://localhost:5000/api/admin/providers/', {
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
//      const response = await fetch('http://localhost:5000/api/admin/orders/', {
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
//        <button>
//         Create new lin
//        </button>

//         <p className="text-gray-700 mb-8">
//           Manage your platform data and monitor activities
//         </p>

//         <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
//             <TabsTrigger value="contact">Contact Messages</TabsTrigger>
//             <TabsTrigger value="demo">Demo Requests</TabsTrigger>
//             <TabsTrigger value="provider">Provider Registrations</TabsTrigger>
//             <TabsTrigger value="linkedin-orders">LinkedIn Orders</TabsTrigger>
//             <TabsTrigger value="linkedin-orders">Forms</TabsTrigger>
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
//                     {providerQuery.data.map((inquiry , index) => (
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
//                       <th className="px-4 py-2">Message</th>
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
//                         <td className="px-4 py-2 whitespace-pre-wrap">${order.cost}</td>
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
//                 <TabsContent value="secureforms" className="space-y-6">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//                             <h2 className="text-xl font-semibold">Secure Forms</h2>
//              <div className="flex flex-col sm:flex-row gap-2">
//                 <Link href="/admin/secure-forms">
//                   <Button
//                     className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto"
//                   >
//                     <Lock className="mr-2 h-4 w-4" />
//                     Manage Secure Forms
//                   </Button>
//                 </Link>
//               </div>
//             </div>

//             <Card className="max-w-2xl mx-auto">
//               <CardHeader>
//                 <CardTitle>Secure Form Management</CardTitle>
//                 <CardDescription>
//                   Create and manage secure forms for collecting sensitive information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="rounded-lg border p-4">
//                     <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
//                     <p className="text-sm text-gray-500 mb-4">
//                       Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.
//                     </p>
//                     <Link href="/admin/secure-forms">
//                       <Button
//                         variant="outline"
//                         className="w-full"
//                       >
//                         Create New Link
//                       </Button>
//                     </Link>
//                   </div>
//                   <div className="rounded-lg border p-4">
//                     <h3 className="text-lg font-medium mb-2">View Submissions</h3>
//                     <p className="text-sm text-gray-500 mb-4">
//                       Access and manage all the secure form submissions from users.
//                     </p>
//                     <Link href="/admin/secure-forms">
//                       <Button
//                         variant="outline"
//                         className="w-full"
//                       >
//                         View Submissions
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
//                   <h4 className="text-amber-800 font-medium">Security Note</h4>
//                   <p className="text-sm text-amber-700 mt-1">
//                     Secure forms contain sensitive information. Access is restricted to authorized administrators only.
//                     All form URLs are single-use and expire after submission.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//         </Tabs>
//       </div>
//     </div>
//   );
// }





// ✅ Updated React Admin Dashboard with full working API  33333333333333333333333333333333
/**
 * ✅ Updated: Admin Dashboard now uses full API URLs instead of relative endpoints.
 * 💡 Fixes the 'Response not JSON: <!DOCTYPE html>' issue due to wrong API path.
 */

// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Link } from "wouter";
// import {
//   Tabs, TabsContent, TabsList, TabsTrigger
// } from "@/components/ui/tabs";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";
// import { formatDistanceToNow } from "date-fns";
// import {
//   Mail, Phone, Clipboard, Calendar, User, Building, Briefcase, Download,
//   Lock, Clock, MessageCircle, Trash2
// } from "lucide-react";

// const API_BASE = 'http://localhost:5000'; // ✅ Change to your working backend URL

// const fetcher = async (path) => {
//   const url = path.startsWith("http") ? path : `http://localhost:5000${path}`;
//   const res = await fetch(url, { credentials: 'include' });
//   const text = await res.text();
//   if (!res.ok) throw new Error(text);
//   try {
//     const json = JSON.parse(text);
//     return json?.data || [];
//   } catch (e) {
//     console.error("Response not JSON:", text);
//     throw new Error("Response not JSON: " + text.slice(0, 100));
//   }
// };

// const createMutation = (path, method, successMsg, errorMsg, queryKeys, queryClient, toast) => {
//   return useMutation({
//     mutationFn: async ({ id, payload }) => {
//       const url = `${API_BASE}${path}/${id}`;
//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: payload ? JSON.stringify(payload) : undefined
//       });
//       if (!res.ok) throw new Error(await res.text());
//       return res.json();
//     },
//     onSuccess: () => {
//       toast({ title: "Success", description: successMsg });
//       queryKeys.forEach(q => queryClient.invalidateQueries({ queryKey: [q] }));
//     },
//     onError: (e) => toast({ title: "Error", description: e.message || errorMsg, variant: 'destructive' })
//   });
// };

// const exportToCSV = (data, headers, rowMapper, filename) => {
//   if (!data?.length) return;
//   let csv = headers.join(',') + '\n';
//   data.forEach(row => csv += rowMapper(row).join(',') + '\n');
//   const blob = new Blob([csv], { type: 'text/csv' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export default function AdminDashboard() {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("contact");

//   const contactQuery = useQuery({ queryKey: ['contacts'], queryFn: () => fetcher('/api/admin/contacts') });
//   const demoQuery = useQuery({ queryKey: ['demos'], queryFn: () => fetcher('/api/admin/demos') });
//   const providerQuery = useQuery({ queryKey: ['providers'], queryFn: () => fetcher('/api/admin/providers') });
//   const orderQuery = useQuery({ queryKey: ['orders'], queryFn: () => fetcher('/api/admin/orders') });

//   const markContact = createMutation('/api/admin/contacts', 'POST', 'Marked as read', 'Error', ['contacts'], queryClient, toast);
//   const markDemo = createMutation('/api/admin/demos', 'POST', 'Marked as read', 'Error', ['demos'], queryClient, toast);
//   const markProvider = createMutation('/api/admin/providers', 'POST', 'Marked as read', 'Error', ['providers'], queryClient, toast);
//   const markOrder = createMutation('/api/admin/orders', 'POST', 'Marked as read', 'Error', ['orders'], queryClient, toast);

//   const deleteContact = createMutation('/api/admin/contacts', 'DELETE', 'Deleted', 'Error', ['contacts'], queryClient, toast);
//   const deleteDemo = createMutation('/api/admin/demos', 'DELETE', 'Deleted', 'Error', ['demos'], queryClient, toast);
//   const deleteProvider = createMutation('/api/admin/providers', 'DELETE', 'Deleted', 'Error', ['providers'], queryClient, toast);
//   const deleteOrder = createMutation('/api/admin/orders', 'DELETE', 'Deleted', 'Error', ['orders'], queryClient, toast);

//   const updateOrderStatus = createMutation('/api/admin/orders', 'PUT', 'Status updated', 'Error', ['orders'], queryClient, toast);

//   const deleteResponse = createMutation('/responses', 'DELETE', 'Response deleted', 'Error', ['secureforms'], queryClient, toast);
//   const markResponseRead = createMutation('/responses', 'PUT', 'Marked read', 'Error', ['secureforms'], queryClient, toast);

//   const handleDelete = (mutation, id, msg) => window.confirm(`Delete this ${msg}?`) && mutation.mutate({ id });

//   const renderLoading = () => <div className="text-center py-6">Loading...</div>;
//   const renderError = (e) => <div className="text-center py-6 text-red-600">{e.message}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid grid-cols-5 gap-1 bg-white border rounded">
//           <TabsTrigger value="contact">Contact</TabsTrigger>
//           <TabsTrigger value="demo">Demo</TabsTrigger>
//           <TabsTrigger value="provider">Provider</TabsTrigger>
//           <TabsTrigger value="orders">Orders</TabsTrigger>
//           <TabsTrigger value="secureforms">Forms</TabsTrigger>
//         </TabsList>

//         <TabsContent value="contact">
//           <Section
//             title="Contact Messages"
//             query={contactQuery}
//             onMarkRead={markContact}
//             onDelete={deleteContact}
//             headers={["ID", "Name", "Email", "Subject", "Message", "Created", "Read"]}
//             filename="contact-messages"
//             mapRow={(r) => [r._id, r.fullname, r.email, r.subject, r.message, new Date(r.createdAt).toLocaleString(), r.isRead ? 'Yes' : 'No']}
//           />
//         </TabsContent>

//         <TabsContent value="demo">
//           <Section
//             title="Demo Requests"
//             query={demoQuery}
//             onMarkRead={markDemo}
//             onDelete={deleteDemo}
//             headers={["ID", "Name", "Email", "Phone", "Company", "Designation", "Created", "Read"]}
//             filename="demo-requests"
//             mapRow={(r) => [r.id, `${r.firstName} ${r.lastName}`, r.email, r.phone, r.company, r.designation, new Date(r.createdAt).toLocaleString(), r.isRead ? 'Yes' : 'No']}
//           />
//         </TabsContent>

//         <TabsContent value="provider">
//           <Section
//             title="Provider Registrations"
//             query={providerQuery}
//             onMarkRead={markProvider}
//             onDelete={deleteProvider}
//             headers={["ID", "Name", "Email", "Phone", "LinkedIn", "Status", "Info", "Created", "Read"]}
//             filename="provider-registrations"
//             mapRow={(r) => [r._id, r.fullName, r.email, r.phone, r.linkedIn, r.verification, r.additionalInfo, new Date(r.createdAt).toLocaleString(), r.isRead ? 'Yes' : 'No']}
//           />
//         </TabsContent>

//         <TabsContent value="orders">
//           <Section
//             title="LinkedIn Orders"
//             query={orderQuery}
//             onMarkRead={markOrder}
//             onDelete={deleteOrder}
//             headers={["ID", "Name", "Email", "Phone", "LinkedIn", "Connections", "Package", "Price", "Payment", "Status", "Created", "Read"]}
//             filename="linkedin-orders"
//             mapRow={(r) => [r._id, r.customerName, r.email, r.phone, r.linkedinUrl, r.connections, r.packageName, `$${r.totalPrice}`, r.paymentMethod, r.status, new Date(r.createdAt).toLocaleString(), r.isRead ? 'Yes' : 'No']}
//           />
//         </TabsContent>

//         <TabsContent value="secureforms">
//           <Card>
//             <CardHeader>
//               <CardTitle>Secure Form Management</CardTitle>
//               <CardDescription>Manage form responses and creation</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Link href="/admin/secure-forms">
//                 <Button variant="outline" className="mt-4">Go to Secure Forms</Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// function Section({ title, query, onMarkRead, onDelete, headers, filename, mapRow }) {
//   return (
//     <div className="mt-6">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <div className="space-x-2">
//           <Button onClick={() => exportToCSV(query.data, headers, mapRow, filename)} disabled={!query.data?.length}>Export</Button>
//           <Button onClick={() => query.refetch()} disabled={query.isFetching}>Refresh</Button>
//         </div>
//       </div>

//       {query.isLoading ? <div>Loading...</div> : query.isError ? <div>{query.error.message}</div> : (
//         <div className="space-y-4">
//           {query.data.map(item => (
//             <Card key={item.id} className={`border ${item.isRead ? 'opacity-60' : ''}`}>
//               <CardHeader>
//                 <CardTitle className="text-base">{item.subject || item.customerName || item.fullName}</CardTitle>
//                 <CardDescription>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex gap-2 justify-end">
//                   {!item.isRead && (
//                     <Button size="sm" variant="outline" onClick={() => onMarkRead.mutate({ id: item.id })}>Mark Read</Button>
//                   )}
//                   <Button size="sm" variant="outline" className="text-red-500" onClick={() => onDelete.mutate({ id: item.id })}><Trash2 className="h-4 w-4" /></Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


//444444444 (final and working )

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Trash2,
  PlusCircle,
  FileText
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";


// Base API URL
const API_BASE_URL = "http://localhost:5000/api";


// Function to export data to CSV
function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;

  let csvContent = "";
  let headers = [];

  if (filename === 'contact-messages') {
    headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row._id,
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
        row._id,
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
  } else if (filename === 'provider-registrations') {
    headers = ['ID', 'Full Name', 'Email', 'Phone', 'LinkedIn URL', 'Profile Status', 'Additional Info', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row._id,
        `"${row.fullName?.replace(/"/g, '""') || ''}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
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
        row._id,
        `"${row.customerName?.replace(/"/g, '""') || ''}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${row.linkedinUrl?.replace(/"/g, '""') || ''}"`,
        row.connections,
        `"${row.packageName?.replace(/"/g, '""') || ''}"`,
        `$${row.totalPrice}`,
        `"${row.paymentMethod?.replace(/"/g, '""') || ''}"`,
        row.status,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  } else if (filename === 'form-responses') {
    headers = ['ID', 'Form ID', 'Submitted By', 'Email', 'Phone', 'Response Data', 'Created At', 'Read Status'];
    csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      const values = [
        row._id,
        row.formId,
        `"${row.submittedBy?.replace(/"/g, '""') || 'Anonymous'}"`,
        `"${row.email?.replace(/"/g, '""') || ''}"`,
        `"${row.phone?.replace(/"/g, '""') || ''}"`,
        `"${JSON.stringify(row.responseData)?.replace(/"/g, '""') || ''}"`,
        new Date(row.createdAt).toLocaleString(),
        row.isRead ? 'Read' : 'Unread'
      ];
      csvContent += values.join(',') + '\n';
    });
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Safer fetcher function for react-query
const fetcher = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching ${url}: ${response.status} - ${errorText}`);
  }

  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || []);
  } else {
    const text = await response.text();
    throw new Error(`Expected JSON but got: ${text.slice(0, 100)}...`);
  }
};

// Function to fetch form responses
const fetchFormResponses = async () => {
  const response = await fetch(`http:localhost:5000/api/${formId}/responses`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching form responses: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("contact");

  // React Query hooks for fetching data
  const contactQuery = useQuery({
    queryKey: ['contact-messages'],
    queryFn: () => fetcher('/admin/contacts'),
    initialData: [],
  });

  const demoQuery = useQuery({
    queryKey: ['demo-requests'],
    queryFn: () => fetcher('/admin/demos'),
    initialData: [],
  });

  const providerQuery = useQuery({
    queryKey: ['provider-inquiries'],
    queryFn: () => fetcher('/admin/providers'),
    initialData: [],
  });

  const linkedinOrdersQuery = useQuery({
    queryKey: ['linkedin-connection-orders'],
    queryFn: () => fetcher('/admin/orders'),
    initialData: [],
  });

  const formResponsesQuery = useQuery({
    queryKey: ['form-responses'],
    queryFn: fetchFormResponses,
    initialData: [],
  });

  // Function to handle mutations (mark as read, delete, update)
  const createMutation = (endpoint, method, successMessage, errorMessage, refetchQueries) => {
    return useMutation({
      mutationFn: ({ id, payload }) => fetch(
        `${API_BASE_URL}${endpoint}/${id}`, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined,
      }).then(res => {
        if (!res.ok) throw new Error(errorMessage);
        return res.json();
      }),
    onSuccess: (_data, variables) => {
  toast({ title: "Deleted", description: "Item deleted successfully." });

  refetchQueries.forEach(queryKey => {
    queryClient.setQueryData(queryKey, (oldData) =>
      oldData?.filter(item => item.id !== variables.id)
    );

    queryClient.invalidateQueries({ queryKey }); // optional
  });
},


      onError: (error) => {
        toast({ title: "Error", description: error.message || errorMessage, variant: "destructive" });
      },
    });
  };

  // Mark as read mutations
  const markContactAsReadMutation = createMutation('/contacts', 'PUT', 'Message marked as read', 'Failed to mark message as read', ['contact-messages']);
  const markDemoAsReadMutation = createMutation('/demos', 'PUT', 'Demo request marked as read', 'Failed to mark demo request as read', ['demo-requests']);
  const markProviderAsReadMutation = createMutation('/providers', 'PUT', 'Provider registration marked as read', 'Failed to mark provider registration as read', ['provider-inquiries']);
  const markLinkedinOrderAsReadMutation = createMutation('/orders', 'PUT', 'Order marked as read', 'Failed to mark order as read', ['linkedin-connection-orders']);
  const markFormResponseAsReadMutation = createMutation('/responses', 'PUT', 'Form response marked as read', 'Failed to mark form response as read', ['form-responses']);

  // Delete mutations
  const deleteContactMutation = createMutation('/contact/delete', 'DELETE', 'Contact message deleted successfully', 'Failed to delete contact message', ['contact-messages']);
  const deleteDemoMutation = createMutation('/book-demo/delete', 'DELETE', 'Demo request deleted successfully', 'Failed to delete demo request', ['demo-requests']);
  const deleteProviderMutation = createMutation('/provider/delete', 'DELETE', 'Provider registration deleted successfully', 'Failed to delete provider registration', ['provider-inquiries']);
  const deleteLinkedinOrderMutation = createMutation('/orders/delete', 'DELETE', 'LinkedIn order deleted successfully', 'Failed to delete LinkedIn order', ['linkedin-connection-orders']);
  const deleteFormResponseMutation = createMutation('/responses', 'DELETE', 'Form response deleted successfully', 'Failed to delete form response', ['form-responses']);

  // Update order status mutation
  const updateLinkedInOrderStatusMutation = createMutation('/orders', 'PATCH', 'Order status updated successfully', 'Failed to update order status', ['linkedin-connection-orders']);
const createFormMutation = useMutation({
  mutationFn: () =>
    fetch('http://localhost:5000/api/forms/create', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      // No body — let backend generate formId internally
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create form');
      }
      return res.json();
    }),
  onSuccess: (data) => {
    toast({
      title: 'Success',
      description: data.message || 'Form created successfully',
    });

    // Save the generated formLink from backend (e.g., http://localhost:3000/form/<formId>)
    setGeneratedLink(data.formLink);

    // Optionally refresh submissions, etc.
    queryClient.invalidateQueries({ queryKey: ['form-responses'] });
  },
  onError: (error) => {
    toast({
      title: 'Error',
      description: error.message || 'Failed to create form',
      variant: 'destructive',
    });
  },
});



  const handleDelete = (mutationFn, id, message) => {
    if (window.confirm(`Are you sure you want to delete this ${message}? This action cannot be undone.`)) {
      mutationFn.mutate({ id });
    }
  };

  const handleCreateForm = () => {
    const formName = prompt("Enter a name for the new form:");
    if (formName) {
      createFormMutation.mutate({ name: formName });
    }
  };

  const renderLoading = () => <div className="text-center py-10">Loading...</div>;
  const renderError = (error) => <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  const renderNoData = (message) => <div className="text-center py-10 text-gray-500">{`No ${message} found.`}</div>;


const [generatedLink, setGeneratedLink] = useState('');
const [isGeneratingLink, setIsGeneratingLink] = useState(false);

const handleGenerateLink = async () => {
  setIsGeneratingLink(true);
  try {
    await createFormMutation.mutateAsync();
  } finally {
    setIsGeneratingLink(false);
  }
};


const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(generatedLink);
    toast({ title: 'Copied', description: 'Link copied to clipboard' });
  } catch {
    toast({ title: 'Error', description: 'Failed to copy link', variant: 'destructive' });
  }
};

  return (
    <div className="min-h-screen bg-skyblue/30">
      <div className="container mx-auto py-6 px-4 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your platform data and monitor activities</p>
        </div>

        <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1 gap-1">
            <TabsTrigger value="contact" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
              Contact
            </TabsTrigger>
            <TabsTrigger value="demo" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
              Demo
            </TabsTrigger>
            <TabsTrigger value="provider" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
              Provider
            </TabsTrigger>
            <TabsTrigger value="linkedin-orders" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="secureforms" className="text-xs sm:text-sm py-2 px-1 sm:px-2">
              Forms
            </TabsTrigger>
          </TabsList>

          {/*contacts */}
          <TabsContent value="contact">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(contactQuery.data, 'contact-messages')}
                  disabled={contactQuery.isLoading || !contactQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => contactQuery.refetch()}
                  disabled={contactQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {contactQuery.isFetching ? (
              renderLoading()
            ) : contactQuery.isError ? (
              renderError(contactQuery.error)
            ) : contactQuery.data?.length === 0 ? (
              renderNoData('contact messages')
            ) : (
              <div className="space-y-4">
                {contactQuery.data.map(message => (
                  <Card key={message._id} className={`max-w-2xl mx-auto ${message.isRead ? "opacity-70" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{message.subject || "No Subject"}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!message.isRead && (<Badge>New</Badge>)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{message.fullname}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 text-gray-500" />
                        <span>{message.company}</span>
                      </div>
                      <Separator />
                      <div className="pt-2 whitespace-pre-wrap text-gray-700 break-words">
                        {message.message}
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        {!message.isRead && (
                          <Button variant="outline" size="sm" onClick={() => markContactAsReadMutation.mutate({ id: message._id })}>
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deleteContactMutation, message._id, 'contact message')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          {/*demos */}
          <TabsContent value="demo">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Demo Requests</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(demoQuery.data, 'demo-requests')}
                  disabled={demoQuery.isLoading || !demoQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => demoQuery.refetch()}
                  disabled={demoQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {demoQuery.isFetching ? (
              renderLoading()
            ) : demoQuery.isError ? (
              renderError(demoQuery.error)
            ) : demoQuery.data?.length === 0 ? (
              renderNoData('demo requests')
            ) : (
              <div className="space-y-4">
                {demoQuery.data.map(request => (
                  <Card key={request._id} className={`max-w-2xl mx-auto ${request.isRead ? "opacity-70" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{request.firstName} {request.lastName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!request.isRead && (<Badge>New</Badge>)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{request.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{request.companyName || "Not specified"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span>{request.jobtitle}</span>
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        {!request.isRead && (
                          <Button variant="outline" size="sm" onClick={() => markDemoAsReadMutation.mutate({ id: request._id })}>
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deleteDemoMutation, request._id, 'demo request')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          {/*providers */}
          <TabsContent value="provider">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Provider Registrations</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(providerQuery.data, 'provider-registrations')}
                  disabled={providerQuery.isLoading || !providerQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => providerQuery.refetch()}
                  disabled={providerQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {providerQuery.isFetching ? (
              renderLoading()
            ) : providerQuery.isError ? (
              renderError(providerQuery.error)
            ) : providerQuery.data?.length === 0 ? (
              renderNoData('provider registrations')
            ) : (
              <div className="space-y-4">
                {providerQuery.data.map(provider => (
                  <Card key={provider._id} className={`max-w-2xl mx-auto ${provider.isRead ? "opacity-70" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{provider.fullName}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(provider.createdAt), { addSuffix: true })}
                          </CardDescription>
                        </div>
                        {!provider.isRead && (<Badge>New</Badge>)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{provider.email}</span>
                      </div>
                      {provider.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{provider.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-gray-500" />
                        <span>
                          <a
                            href={provider.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={provider.verification === 'verified' ? 'default' : 'outline'}>
                          {provider.verification === 'verified' ? 'Verified Profile' : 'Non-Verified Profile'}
                        </Badge>
                      </div>
                      {provider.additionalInfo && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="text-sm font-medium mb-1">Additional Information:</h4>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{provider.additionalInfo}</p>
                          </div>
                        </>
                      )}
                      <div className="pt-2 flex justify-end gap-2">
                        {!provider.isRead && (
                          <Button variant="outline" size="sm" onClick={() => markProviderAsReadMutation.mutate({ id: provider._id })}>
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deleteProviderMutation, provider._id, 'provider registration')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          {/*orders */}
          <TabsContent value="linkedin-orders">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">LinkedIn Connection Orders</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(linkedinOrdersQuery.data, 'linkedin-connection-orders')}
                  disabled={linkedinOrdersQuery.isLoading || !linkedinOrdersQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => linkedinOrdersQuery.refetch()}
                  disabled={linkedinOrdersQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>
            {linkedinOrdersQuery.isFetching ? (
              renderLoading()
            ) : linkedinOrdersQuery.isError ? (
              renderError(linkedinOrdersQuery.error)
            ) : linkedinOrdersQuery.data?.length === 0 ? (
              renderNoData('LinkedIn connection orders')
            ) : (
              <div className="grid gap-4">
                {linkedinOrdersQuery.data.map(order => (
                  <Card key={order._id} className="w-full">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg">
                            Name : {order.customer.fullname}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            connections :  {order.package} ${order.cost}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'secondary' : 'outline'}>
                            {order.status}
                          </Badge>
                          {!order.isRead && (<Badge variant="destructive">Unread</Badge>)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Email:</span>
                            <span>{order.customer.email}</span>
                          </div>
                          {order.customer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Phone:</span>
                              <span>{order.customer.phone}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="font-medium">LinkedIn:</span>
                            <a href={order.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                              {order.linkedin}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Payment Method:</span>
                            <span>{order.paymentMethod}</span>
                          </div>
                          {order.additionalNotes && (
                            <div className="flex items-start gap-2">
                              <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                              <span className="font-medium">Notes:</span>
                              <span className="text-gray-700 break-words">{order.additionalNotes}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Order Date:</span>
                            <span>{new Date(order.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              timeZoneName: 'short'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Time Since:</span>
                            <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
                          </div>
                          {order.paymentScreenshot ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-600">Payment Screenshot:</span>
                              </div>
                              <div className="border rounded-lg p-2 bg-gray-50">
                                <img

                                  src={`http://localhost:5000/api${order.paymentScreenshot}`}
                                  alt="Payment Screenshot"
                                  className="max-w-full h-auto max-h-48 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(order.paymentScreenshot, '_blank')}
                                />
                                <div className="mt-2 text-xs text-gray-600">
                                  Click to view full size
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4 text-red-500" />
                              <span className="font-medium text-red-500">Payment Screenshot:</span>
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
                              onClick={() => markLinkedinOrderAsReadMutation.mutate({ id: order._id })}
                              className="text-xs"
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateLinkedInOrderStatusMutation.mutate({ id: order._id, payload: { status: 'processing' } })}
                            disabled={order.status === 'processing'}
                            className="text-xs"
                          >
                            Mark Processing
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateLinkedInOrderStatusMutation.mutate({ id: order._id, payload: { status: 'completed' } })}
                            disabled={order.status === 'completed'}
                            className="text-xs"
                          >
                            Mark Completed
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deleteLinkedinOrderMutation, order._id, 'LinkedIn order')}
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* <TabsContent value="secureforms" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Secure Forms</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleCreateForm}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm"
                  disabled={createFormMutation.isLoading}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {createFormMutation.isLoading ? 'Creating...' : 'Create New Form'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(formResponsesQuery.data, 'form-responses')}
                  disabled={formResponsesQuery.isLoading || !formResponsesQuery.data?.length}
                  className="text-sm"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => formResponsesQuery.refetch()}
                  disabled={formResponsesQuery.isFetching}
                  className="text-sm"
                >
                  Refresh
                </Button>
              </div>
            </div>

            {formResponsesQuery.isFetching ? (
              renderLoading()
            ) : formResponsesQuery.isError ? (
              renderError(formResponsesQuery.error)
            ) : formResponsesQuery.data?.length === 0 ? (
              renderNoData('form responses')
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Responses</CardTitle>
                    <CardDescription>All submitted form responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Form ID</TableHead>
                          <TableHead>Submitted By</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Submitted At</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formResponsesQuery.data.map(response => (
                          <TableRow key={response._id} className={response.isRead ? "opacity-70" : ""}>
                            <TableCell className="font-medium">{response.formId}</TableCell>
                            <TableCell>{response.submittedBy || 'Anonymous'}</TableCell>
                            <TableCell>{response.email}</TableCell>
                            <TableCell>{response.phone || '-'}</TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}
                            </TableCell>
                            <TableCell>
                              <Badge variant={response.isRead ? "default" : "destructive"}>
                                {response.isRead ? "Read" : "Unread"}
                              </Badge>
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markFormResponseAsReadMutation.mutate({ id: response._id })}
                                disabled={response.isRead}
                              >
                                Mark Read
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(deleteFormResponseMutation, response._id, 'form response')}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Form Management</CardTitle>
                    <CardDescription>
                      Create and manage secure forms for collecting sensitive information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleCreateForm}
                          disabled={createFormMutation.isLoading}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          {createFormMutation.isLoading ? 'Creating...' : 'Create New Form'}
                        </Button>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-2">View Form Details</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Access and manage all the form details and configurations.
                        </p>
                        <Link href="/admin/secure-forms">
                          <Button
                            variant="outline"
                            className="w-full"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Forms
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
              </div>
            )}
          </TabsContent> */}

          
                 {/* <TabsContent value="secureforms" className="space-y-6">
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                             <h2 className="text-xl font-semibold">Secure Forms</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                 <Link href="/admin/secure-forms">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Manage Secure Forms
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Secure Form Management</CardTitle>
                <CardDescription>
                  Create and manage secure forms for collecting sensitive information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.
                    </p>
                    <Link href="/SecureFormAdmin">
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Create New Link
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">View Submissions</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Access and manage all the secure form submissions from users.
                    </p>
                    <Link href="/admin/secure-forms">
                      <Button
                        variant="outline"
                        className="w-full"
                      >
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
          </TabsContent> */}
           <TabsContent value="secureforms" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Secure Forms</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/admin/secure-forms">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm w-full sm:w-auto">
              <Lock className="mr-2 h-4 w-4" />
              Manage Secure Forms
            </Button>
          </Link>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Secure Form Management</CardTitle>
          <CardDescription>
            Create and manage secure forms for collecting sensitive information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">Generate New Form Link</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create a unique, one-time use link for collecting LinkedIn credentials and payment details securely.
              </p>
              
              {!generatedLink ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGenerateLink}
                  disabled={isGeneratingLink}
                >
                  {isGeneratingLink ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Create New Link'
                  )}
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input 
                      value={generatedLink} 
                      readOnly 
                      className="flex-1" 
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-amber-600">
                    <strong>Note:</strong> This link can be used only once. Copy it now as you won't see it again.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => setGeneratedLink('')}
                  >
                    Generate Another Link
                  </Button>
                </div>
              )}
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">View Submissions</h3>
              <p className="text-sm text-gray-500 mb-4">
                Access and manage all the secure form submissions from users.
              </p>
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
        </Tabs>
      </div>
    </div>
  )}