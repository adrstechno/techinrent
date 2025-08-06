// import { useState, useEffect } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Copy, MessageCircle, Shield, CreditCard, Upload, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { apiRequest } from '@/lib/queryClient';

// export default function OrderSummaryPage() {
//   const [, setLocation] = useLocation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState('');
//   const [linkedinUrl, setLinkedinUrl] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [paymentDone, setPaymentDone] = useState('no');
//   const [notes, setNotes] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [submittedOrderId, setSubmittedOrderId] = useState(null);
//   const [showUploadScreen, setShowUploadScreen] = useState(false);
//   const [screenshot, setScreenshot] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     const storedPackage = localStorage.getItem('selectedPackage');
//     if (storedPackage) {
//       setSelectedPackage(JSON.parse(storedPackage));
//     } else {
//       setLocation('/select-package');
//     }
//   }, [setLocation]);
// // Add this at the top of your file
// const API_BASE_URL = 'http://localhost:5001/api/orders';

//   const paymentMethods = [
//     {
//       id: "trc20-usdt",
//       name: "TRC-20 USDT",
//       address: "TExampleAddress1234567890",
//       network: "Tron Network",
//       icon: CreditCard
//     },
//     {
//       id: "bep20-usdt",
//       name: "BEP-20 USDT",
//       address: "0xExampleAddress1234567890",
//       network: "Binance Smart Chain",
//       icon: CreditCard
//     },
//     {
//       id: "binance-pay",
//       name: "Binance Pay",
//       address: "1234567890",
//       network: "Binance Pay ID",
//       icon: CreditCard
//     }
//   ];

//  const orderMutation = useMutation({
//   mutationFn: async (orderData) => {
//     const response = await fetch(API_BASE_URL, {
//       method: 'POST',
//       body: JSON.stringify(orderData),  
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         package: orderData.packageType,
//         cost: parseFloat(orderData.price),
//         fullname: orderData.customerName,
//         email: orderData.customerEmail,
//         phone: orderData.phone,
//         linkedin: orderData.linkedinUrl,
//         additionalNotes: orderData.notes,
//         paymentMethod: orderData.paymentMethod,
//         paymentStatus: orderData.paymentDone ? 'completed' : 'pending'
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to submit order');
//     }

//     return response.json();
//   },
//   // Update your order mutation's onSuccess
// onSuccess: (data) => {
//   setOrderSubmitted(true);
//   setSubmittedOrderId(data.orderId);

//   // Store order details in localStorage
//   const orderDetails = {
//     orderId: data.orderId,
//     connections: selectedPackage?.label.split(' ')[0] || '',
//     packageName: selectedPackage?.label,
//     totalPrice: selectedPackage?.price,
//     estimatedDelivery: "24-48 hours",
//     paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
//     customerEmail,
//     customerName
//   };

//   localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

//   // Show appropriate next steps
//   if (paymentDone === 'yes') {
//     setShowUploadScreen(true);
//   } else {
//     toast({
//       title: "Order Submitted",
//       description: "Your order has been successfully submitted. Redirecting to success page..."
//     });
//     setTimeout(() => {
//       setLocation('/order-success');
//     }, 3000);
//   }
// },
//    onError: (error) => {
//   setIsLoading(false);
//   toast({
//     title: "Error",
//     description: error.message || "Failed to submit order. Please try again.",
//     variant: "destructive"
//   });
// },
//   });

// const uploadMutation = useMutation({
//   mutationFn: async ({ orderId, screenshot }) => {
//     // Convert base64 to blob for proper file upload
//     const blob = await fetch(screenshot).then(res => res.blob());
//     const file = new File([blob], 'payment-screenshot.png', { type: 'image/png' });

//     const formData = new FormData();
//     formData.append('screenshot', file);

//     const response = await fetch(`${API_BASE_URL}/${orderId}/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to upload screenshot');
//     }

//     return response.json();
//   },
//     onSuccess: (data) => {
//       const selectedPackageData = packages.find(pkg => pkg.value === selectedPackage);
//       const orderDetails = {
//         orderId: data.orderId,
//         connections: selectedPackageData?.label.split(' ')[0] || selectedPackage,
//         packageName: selectedPackageData?.label,
//         totalPrice: selectedPackageData?.price,
//         estimatedDelivery: "24-48 hours"
//       };
//       localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
//       toast({
//         title: "Screenshot Uploaded",
//         description: "Your payment screenshot has been uploaded successfully!"
//       });
//       setTimeout(() => {
//         setLocation('/order-success');
//       }, 2000);
//     },
//    onError: (error) => {
//   setIsUploading(false);
//   toast({
//     title: "Error",
//     description: error.message || "Failed to upload screenshot. Please try again.",
//     variant: "destructive"
//   });
// }
//   });

//   const copyToClipboard = (text, type) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied",
//       description: `Copied ${type} to clipboard!`
//     });
//   };

//   const handleWhatsAppClick = () => {
//     const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${selectedPackage?.label || 'Not selected'}`;
//     const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const base64 = e.target?.result;
//         setScreenshot(base64);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//  const handleUploadScreenshot = async () => {
//   if (!submittedOrderId || !screenshot) {
//     toast({
//       title: "Error",
//       description: "Please select a screenshot to upload.",
//       variant: "destructive"
//     });
//     return;
//   }

//   setIsUploading(true);

//   try {
//     await uploadMutation.mutateAsync({ 
//       orderId: submittedOrderId, 
//       screenshot 
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     setIsUploading(false);
//   }
// };

//   const validateForm = () => {
//     if (!selectedPayment) {
//       toast({
//         title: "Error",
//         description: "Please select a payment method.",
//         variant: "destructive"
//       });
//       return false;
//     }
//     if (!linkedinUrl) {
//       toast({
//         title: "Error",
//         description: "Please enter your LinkedIn profile URL.",
//         variant: "destructive"
//       });
//       return false;
//     }
//     if (!linkedinUrl.includes('linkedin.com')) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid LinkedIn profile URL.",
//         variant: "destructive"
//       });
//       return false;
//     }
//     if (!customerName.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter your full name.",
//         variant: "destructive"
//       });
//       return false;
//     }
//    if (!customerEmail || !customerEmail.trim()) {
//     toast({
//       title: "Error",
//       description: "Email is required.",
//       variant: "destructive",
//     });
//     return false;
//   }

//   if (!customerEmail.includes("@") || !customerEmail.includes(".")) {
//     toast({
//       title: "Error",
//       description: "Please enter a valid email address.",
//       variant: "destructive",
//     });
//     return false;
//   }

//   return true;

//   };

//   const handleOrderSubmit = async () => {
//   if (!validateForm()) {
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const orderData = {
//       packageType: selectedPackage?.value,
//       price: selectedPackage?.price || '0',
//       linkedinUrl,
//       customerName,
//       customerEmail,
//       phone: customerPhone,
//       notes,
//       paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
//       paymentDone: paymentDone === 'yes'
//     };

//     await orderMutation.mutateAsync(orderData);
//   } catch (error) {
//     console.error('Order submission error:', error);
//     setIsLoading(false);
//   }
// };

//   if (!selectedPackage) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-purple-800">
//         <div className="text-center text-white">
//           <h2 className="text-2xl font-bold mb-4">Loading...</h2>
//           <p>Please select a package to continue.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden mobile-scroll-optimize">
//       <SEO
//         title="Order Summary - Complete Your LinkedIn Connections Purchase | TechInRent"
//         description="Complete your LinkedIn connections order with secure crypto payments. Review your selected package and provide your information for fast delivery."
//         keywords="order summary linkedin connections, complete linkedin order, buy linkedin connections checkout, linkedin connections payment"
//         structuredData={{
//           "@context": "https://schema.org",
//           "@type": "WebPage",
//           "name": "Order Summary - LinkedIn Connections",
//           "description": "Complete your LinkedIn connections purchase with secure checkout",
//           "provider": {
//             "@type": "Organization",
//             "name": "TechInRent",
//             "url": "https://techinrent.com"
//           }
//         }}
//       />
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
//         <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" />
//       </div>
//       <div className="container mx-auto px-4 py-12 sm:py-20">
//         <header className="text-center mb-8">
//           <div className="mb-4">
//             <Logo size="md" animated={true} />
//           </div>
//           <div className="flex items-center justify-center gap-4 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => setLocation('/select-package')}
//               className="text-white hover:bg-white/20"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Packages
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setLocation('/')}
//               className="text-white hover:bg-white/20"
//             >
//               Home
//             </Button>
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-bold text-white">Complete Your Order</h1>
//         </header>
//         <div className="grid lg:grid-cols-2 gap-8">
//           <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-black text-blue-600 flex items-center gap-2">
//                 👤 Your Information
//               </CardTitle>
//               <CardDescription>
//                 Please provide your details and LinkedIn profile information
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="customerName">Full Name *</Label>
//                   <Input
//                     id="customerName"
//                     placeholder="Enter your full name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     className="mt-1"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="customerEmail">Email Address *</Label>
//                   <Input
//                     id="customerEmail"
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     className="mt-1"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="customerPhone">Phone Number</Label>
//                 <Input
//                   id="customerPhone"
//                   placeholder="Enter your phone number"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="linkedinUrl">🔗 LinkedIn Profile URL *</Label>
//                 <Input
//                   id="linkedinUrl"
//                   placeholder="https://www.linkedin.com/in/your-profile"
//                   value={linkedinUrl}
//                   onChange={(e) => setLinkedinUrl(e.target.value)}
//                   className="mt-1"
//                   required
//                 />
//                 <p className="text-sm text-gray-500 mt-1">Enter the LinkedIn profile where you want to receive connections</p>
//               </div>
//               <div>
//                 <Label htmlFor="notes">Additional Notes (Optional)</Label>
//                 <Textarea
//                   id="notes"
//                   placeholder="Any special requirements or notes for your order..."
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="mt-1"
//                   rows={3}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//           <div className="space-y-8">
//             <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black text-green-600 flex items-center gap-2">
//                   💳 Select Payment Method
//                 </CardTitle>
//                 <CardDescription>
//                   Choose your preferred cryptocurrency payment method
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
//                   {paymentMethods.map((method) => (
//                     <div key={method.id} className="relative">
//                       <div
//                         className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
//                           selectedPayment === method.id
//                             ? 'border-green-500 bg-green-50'
//                             : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                       >
//                         <RadioGroupItem value={method.id} id={method.id} />
//                         <Label htmlFor={method.id} className="flex-1 cursor-pointer">
//                           <div className="flex justify-between items-center w-full">
//                             <div className="flex items-center gap-3">
//                               <method.icon className="w-6 h-6 text-blue-600" />
//                               <div>
//                                 <div className="font-bold text-lg text-gray-800">{method.name}</div>
//                                 <div className="text-sm text-gray-600">{method.network}</div>
//                               </div>
//                             </div>
//                             {selectedPayment === method.id && (
//                               <div className="flex items-center gap-2">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => copyToClipboard(method.address, `${method.name} Address`)}
//                                 >
//                                   <Copy className="w-4 h-4 mr-1" />
//                                   Copy Address
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                           {selectedPayment === method.id && (
//                             <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono block mt-2">
//                               {method.address.slice(0, 20)}...
//                             </code>
//                           )}
//                         </Label>
//                       </div>
//                     </div>
//                   ))}
//                 </RadioGroup>
//                 {selectedPayment && (
//                   <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                     <h4 className="font-bold text-blue-800 mb-2">Payment Instructions</h4>
//                     <ul className="text-sm text-blue-700 space-y-1">
//                       <li>1. Copy the payment address above</li>
//                       <li>2. Send exactly ${selectedPackage?.price} USDT to the address</li>
//                       <li>3. Take a screenshot of your transaction</li>
//                       <li>4. Upload the screenshot after submitting your order</li>
//                     </ul>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//             <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black flex items-center gap-2">
//                   📋 Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Customer</span>
//                     <span>{customerName || 'Not provided'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Email</span>
//                     <span className="text-sm">{customerEmail || 'No email'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>LinkedIn Profile</span>
//                     <span>
//                       {linkedinUrl ? (
//                         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">
//                           {linkedinUrl}
//                         </a>
//                       ) : 'Not provided'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Package</span>
//                     <span>{selectedPackage?.label || 'Not selected'}</span>
//                   </div>
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Price</span>
//                     <span className="text-yellow-300">${selectedPackage?.price || '0'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Method</span>
//                     <span>{paymentMethods.find(p => p.id === selectedPayment)?.name || 'Not selected'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Status</span>
//                     <Badge variant="secondary" className={paymentDone === 'yes' ? 'bg-green-500' : 'bg-orange-500'}>
//                       {paymentDone === 'yes' ? 'Completed' : 'Pending'}
//                     </Badge>
//                   </div>
//                 </div>
//                 <div className="border-t border-white/20 pt-4 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Real connections from verified profiles</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Delivered within 24-48 hours</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 100% safe and secure process</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Money-back guarantee</span>
//                   </div>
//                 </div>
//               {/* Update your submit button */}
// <Button
//   onClick={handleOrderSubmit}
//   disabled={isLoading || !selectedPayment || !linkedinUrl || !customerName || !customerEmail}
//   className="w-full bg-white text-purple-600 hover:bg-gray-100"
// >
//   {isLoading ? (
//     <>
//       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//       Processing...
//     </>
//   ) : `Submit Order - $${selectedPackage?.price || '0'}`}
// </Button>

// {/* Update your upload button */}
// <Button
//   onClick={handleUploadScreenshot}
//   disabled={!screenshot || isUploading}
//   className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
// >
//   {isUploading ? (
//     <>
//       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//       Uploading...
//     </>
//   ) : "Upload Screenshot"}
// </Button>
//                 <div className="text-center">
//                   <span>Need bulk orders?</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleWhatsAppClick}
//                     className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full mt-2"
//                   >
//                     <MessageCircle className="w-4 h-4 mr-2" />
//                     WhatsApp for Bulk Orders
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//         {showUploadScreen && submittedOrderId && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-md w-full">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                   📸 Upload Payment Screenshot
//                 </CardTitle>
//                 <CardDescription className="text-gray-600">
//                   Please upload your payment screenshot to complete the verification process
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400">
//                   <div className="space-y-2">
//                     <p className="text-sm font-semibold text-gray-700">Click to upload or drag and drop</p>
//                     <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileUpload}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                 </div>
//                 {screenshot && (
//                   <div className="text-center">
//                     <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
//                       <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
//                       <p className="text-sm text-green-700 font-semibold">Screenshot selected</p>
//                     </div>
//                   </div>
//                 )}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h4 className="font-semibold text-blue-800 mb-2">Important Note</h4>
//                   <p className="text-sm text-blue-700">
//                     Uploading the payment screenshot is required to complete your order. 
//                     Our team will review and process your order within 24 hours.
//                   </p>
//                 </div>
//                 <div className="flex gap-3">
//                   <Button
//                     onClick={() => setShowUploadScreen(false)}
//                     variant="outline"
//                     className="flex-1"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleUploadScreenshot}
//                     disabled={!screenshot || uploadMutation.isPending}
//                     className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//                   >
//                     {isUploading ? "Uploading..." : "Upload Screenshot"}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//         {orderSubmitted && !showUploadScreen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-md w-full">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                   🎉 Order Submitted Successfully
//                 </CardTitle>
//                 <CardDescription className="text-gray-600">
//                   Thank you for your order! Here's what happens next:
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                   <div className="flex items-center gap-2 text-green-700 mb-3">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">Order ID: {submittedOrderId}</span>
//                   </div>
//                   <ul className="text-sm text-green-700 space-y-2">
//                     <li>• Your order has been received and is being processed</li>
//                     <li>• You will receive an email confirmation shortly</li>
//                     <li>• Connections will be delivered within 24-48 hours</li>
//                     <li>• Our team will contact you if needed</li>
//                   </ul>
//                 </div>
//                 {paymentDone === 'yes' && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <p className="text-sm text-blue-700">
//                       Payment confirmed. Your payment screenshot has been uploaded and will be verified by our team.
//                     </p>
//                   </div>
//                 )}
//                 {paymentDone === 'no' && (
//                   <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
//                     <p className="text-sm text-orange-700">
//                       Payment pending. Please complete the payment to proceed with your order.
//                     </p>
//                   </div>
//                 )}
//                 <Button
//                   onClick={() => setLocation('/')}
//                   className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
//                 >
//                   Back to Home
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Copy, MessageCircle, Shield, CreditCard, Upload, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';

// const API_BASE_URL = 'http://localhost:5001/api/orders';

// export default function OrderSummaryPage() {
//   const [, setLocation] = useLocation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState('');
//   const [linkedinUrl, setLinkedinUrl] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [paymentDone, setPaymentDone] = useState('no');
//   const [notes, setNotes] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [submittedOrderId, setSubmittedOrderId] = useState(null);
//   const [showUploadScreen, setShowUploadScreen] = useState(false);
//   const [screenshot, setScreenshot] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     const storedPackage = localStorage.getItem('selectedPackage');
//     if (storedPackage) {
//       setSelectedPackage(JSON.parse(storedPackage));
//     } else {
//       setLocation('/select-package');
//     }
//   }, [setLocation]);

//   const paymentMethods = [
//     {
//       id: "trc20-usdt",
//       name: "TRC-20 USDT",
//       address: "TExampleAddress1234567890",
//       network: "Tron Network",
//       icon: CreditCard
//     },
//     {
//       id: "bep20-usdt",
//       name: "BEP-20 USDT",
//       address: "0xExampleAddress1234567890",
//       network: "Binance Smart Chain",
//       icon: CreditCard
//     },
//     {
//       id: "binance-pay",
//       name: "Binance Pay",
//       address: "1234567890",
//       network: "Binance Pay ID",
//       icon: CreditCard
//     }
//   ];

//   const orderMutation = useMutation({
//     mutationFn: async (orderData) => {
//       const response = await fetch(API_BASE_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           package: orderData.packageType,
//           cost: parseFloat(orderData.price),
//           fullname: orderData.customerName,
//           email: orderData.customerEmail,
//           phone: orderData.phone,
//           linkedin: orderData.linkedinUrl,
//           additionalNotes: orderData.notes,
//           paymentMethod: orderData.paymentMethod,
//           paymentStatus: orderData.paymentDone ? 'completed' : 'pending'
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to submit order');
//       }

//       return response.json();
//     },
//     onSuccess: (data) => {
//       setOrderSubmitted(true);
//       setSubmittedOrderId(data.orderId);

//       const orderDetails = {
//         orderId: data.orderId,
//         packageName: selectedPackage?.label,
//         totalPrice: selectedPackage?.price,
//         estimatedDelivery: "24-48 hours",
//         paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
//         customerEmail,
//         customerName
//       };

//       localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

//       if (paymentDone === 'yes') {
//         setShowUploadScreen(true);
//       } else {
//         toast({
//           title: "Order Submitted",
//           description: "Your order has been successfully submitted. Redirecting to success page..."
//         });
//         setTimeout(() => {
//           setLocation('/order-success');
//         }, 3000);
//       }
//     },
//     onError: (error) => {
//       setIsLoading(false);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to submit order. Please try again.",
//         variant: "destructive"
//       });
//     }
//   });

//   const uploadMutation = useMutation({
//     mutationFn: async ({ orderId, file }) => {
//       const formData = new FormData();
//       formData.append('screenshot', file);

//       const response = await fetch(`${API_BASE_URL}/${orderId}/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to upload screenshot');
//       }

//       return response.json();
//     },
//     onSuccess: (data) => {
//       const orderDetails = {
//         ...JSON.parse(localStorage.getItem('lastOrderDetails')),
//         paymentVerified: true
//       };
//       localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

//       toast({
//         title: "Payment Verified!",
//         description: "Your order is now being processed"
//       });

//       setTimeout(() => {
//         setLocation('/order-success');
//       }, 2000);
//     },
//     onError: (error) => {
//       setIsUploading(false);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to upload screenshot. Please try again.",
//         variant: "destructive"
//       });
//     }
//   });

//   const handleFileUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file type and size
//     if (!file.type.startsWith('image/')) {
//       toast({
//         title: "Invalid file",
//         description: "Please upload an image file",
//         variant: "destructive"
//       });
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "File too large",
//         description: "Max size: 5MB",
//         variant: "destructive"
//       });
//       return;
//     }

//     setScreenshot(file);
//   };

//   const handleUploadScreenshot = () => {
//     if (!submittedOrderId || !screenshot) {
//       toast({
//         title: "Error",
//         description: "Please select a screenshot to upload.",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsUploading(true);
//     uploadMutation.mutate({
//       orderId: submittedOrderId,
//       file: screenshot
//     });
//   };

//   const copyToClipboard = (text, type) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied",
//       description: `Copied ${type} to clipboard!`
//     });
//   };

//   const handleWhatsAppClick = () => {
//     const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${selectedPackage?.label || 'Not selected'}`;
//     const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const validateForm = () => {
//     if (!selectedPayment) {
//       toast({
//         title: "Error",
//         description: "Please select a payment method.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid LinkedIn profile URL.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!customerName.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter your full name.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!customerEmail || !customerEmail.includes("@") || !customerEmail.includes(".")) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid email address.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleOrderSubmit = () => {
//     if (!validateForm()) return;

//     setIsLoading(true);

//     const orderData = {
//       packageType: selectedPackage?.value,
//       price: selectedPackage?.price || '0',
//       linkedinUrl,
//       customerName,
//       customerEmail,
//       phone: customerPhone,
//       notes,
//       paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
//       paymentDone: paymentDone === 'yes'
//     };

//     orderMutation.mutate(orderData);
//   };

//   if (!selectedPackage) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-purple-800">
//         <div className="text-center text-white">
//           <h2 className="text-2xl font-bold mb-4">Loading...</h2>
//           <p>Please select a package to continue.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden">
//       <SEO
//         title="Order Summary - Complete Your LinkedIn Connections Purchase | TechInRent"
//         description="Complete your LinkedIn connections order with secure crypto payments."
//       />

//       <div className="container mx-auto px-4 py-12 sm:py-20">
//         <header className="text-center mb-8">
//           <Logo size="md" animated={true} className="mb-4" />
//           <h1 className="text-3xl sm:text-4xl font-bold text-white">Complete Your Order</h1>
//         </header>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Customer Information Card */}
//           <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-black text-blue-600">👤 Your Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="customerName">Full Name *</Label>
//                   <Input
//                     id="customerName"
//                     placeholder="Enter your full name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     className="mt-1"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="customerEmail">Email Address *</Label>
//                   <Input
//                     id="customerEmail"
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     className="mt-1"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="customerPhone">Phone Number</Label>
//                 <Input
//                   id="customerPhone"
//                   placeholder="Enter your phone number"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="linkedinUrl">🔗 LinkedIn Profile URL *</Label>
//                 <Input
//                   id="linkedinUrl"
//                   placeholder="https://www.linkedin.com/in/your-profile"
//                   value={linkedinUrl}
//                   onChange={(e) => setLinkedinUrl(e.target.value)}
//                   className="mt-1"
//                   required
//                 />
//                 <p className="text-sm text-gray-500 mt-1">Enter the LinkedIn profile where you want to receive connections</p>
//               </div>
//               <div>
//                 <Label htmlFor="notes">Additional Notes (Optional)</Label>
//                 <Textarea
//                   id="notes"
//                   placeholder="Any special requirements or notes for your order..."
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="mt-1"
//                   rows={3}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Payment and Order Summary */}
//           <div className="space-y-8">
//             {/* Payment Method Card */}
//             <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black text-green-600">💳 Select Payment Method</CardTitle>
//                   <CardDescription>
//                    Choose your preferred cryptocurrency payment method
//                  </CardDescription>
//               </CardHeader>

//              <CardContent>
//                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
//                   {paymentMethods.map((method) => (
//                     <div key={method.id} className="relative">
//                       <div
//                         className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
//                           selectedPayment === method.id
//                             ? 'border-green-500 bg-green-50'
//                             : 'border-gray-200 hover:border-gray-400'
//                         }`}
//                       >
//                         <RadioGroupItem value={method.id} id={method.id} />
//                         <Label htmlFor={method.id} className="flex-1 cursor-pointer">
//                           <div className="flex justify-between items-center w-full">
//                             <div className="flex items-center gap-3">
//                               <method.icon className="w-6 h-6 text-blue-600" />
//                               <div>
//                                 <div className="font-bold text-lg text-gray-800">{method.name}</div>
//                                 <div className="text-sm text-gray-600">{method.network}</div>
//                               </div>
//                             </div>
//                             {selectedPayment === method.id && (
//                               <div className="flex items-center gap-2">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => copyToClipboard(method.address, `${method.name} Address`)}
//                                 >
//                                   <Copy className="w-4 h-4 mr-1" />
//                                   Copy Address
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                           {selectedPayment === method.id && (
//                             <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono block mt-2">
//                               {method.address.slice(0, 20)}...
//                             </code>
//                           )}
//                         </Label>
//                       </div>
//                     </div>
//                   ))}
//                 </RadioGroup>
//                 {selectedPayment && (
//                   <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                     <h4 className="font-bold text-blue-800 mb-2">Payment Instructions</h4>
//                     <ul className="text-sm text-blue-700 space-y-1">
//                       <li>1. Copy the payment address above</li>
//                       <li>2. Send exactly ${selectedPackage?.price} USDT to the address</li>
//                       <li>3. Take a screenshot of your transaction</li>
//                       <li>4. Upload the screenshot after submitting your order</li>
//                     </ul>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Order Summary Card */}
//             <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black">📋 Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Order details remain the same */}
//                    <div className="space-y-3">
//                    <div className="flex justify-between">
//                     <span>Customer</span>
//                      <span>{customerName || 'Not provided'}</span>
//                    </div>
//                   <div className="flex justify-between">
//                    <span>Email</span>
//                      <span className="text-sm">{customerEmail || 'No email'}</span>
//                  </div>
//                    <div className="flex justify-between">
//                   <span>LinkedIn Profile</span>
//                    <span>
//                       {linkedinUrl ? (
//                         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">
//                           {linkedinUrl}
//                         </a>
//                       ) : 'Not provided'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Package</span>
//                     <span>{selectedPackage?.label || 'Not selected'}</span>
//                   </div>
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Price</span>
//                     <span className="text-yellow-300">${selectedPackage?.price || '0'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Method</span>
//                     <span>{paymentMethods.find(p => p.id === selectedPayment)?.name || 'Not selected'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Payment Status</span>
//                     <Badge variant="secondary" className={paymentDone === 'yes' ? 'bg-green-500' : 'bg-orange-500'}>
//                       {paymentDone === 'yes' ? 'Completed' : 'Pending'}
//                     </Badge>
//                   </div>
//                 </div>
//                 <div className="border-t border-white/20 pt-4 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Real connections from verified profiles</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Delivered within 24-48 hours</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 100% safe and secure process</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Money-back guarantee</span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleOrderSubmit}
//                   disabled={isLoading || !selectedPayment || !linkedinUrl || !customerName || !customerEmail}
//                   className="w-full bg-white text-purple-600 hover:bg-gray-100"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : `Submit Order - $${selectedPackage?.price || '0'}`}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Screenshot Upload Modal */}
//         {showUploadScreen && submittedOrderId && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <Card className="w-full max-w-md">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-black">📸 Upload Payment Proof</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="border-2 border-dashed rounded-lg p-8 text-center">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="screenshot-upload"
//                   />
//                   <label
//                     htmlFor="screenshot-upload"
//                     className="cursor-pointer"
//                   >
//                     {screenshot ? (
//                       <img
//                         src={URL.createObjectURL(screenshot)}
//                         alt="Payment proof"
//                         className="max-h-52 mx-auto mb-4"
//                       />
//                     ) : (
//                       <div className="space-y-2">
//                         <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                         <p>Click to upload or drag and drop</p>
//                         <p className="text-sm text-gray-500">PNG, JPG (Max 5MB)</p>
//                       </div>
//                     )}
//                   </label>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowUploadScreen(false)}
//                     className="flex-1"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleUploadScreenshot}
//                     disabled={!screenshot || isUploading}
//                     className="flex-1"
//                   >
//                     {isUploading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Uploading...
//                       </>
//                     ) : "Confirm Upload"}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, MessageCircle, Shield, CreditCard, Upload, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5001/api/orders';

export default function OrderSummaryPage() {
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentDone, setPaymentDone] = useState('no');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedPackage = localStorage.getItem('selectedPackage');
    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    } else {
      setLocation('/select-package');
    }
  }, [setLocation]);

  const paymentMethods = [
    {
      id: "trc20-usdt",
      name: "TRC-20 USDT",
      address: "TExampleAddress1234567890",
      network: "Tron Network",
      icon: CreditCard
    },
    {
      id: "bep20-usdt",
      name: "BEP-20 USDT",
      address: "0xExampleAddress1234567890",
      network: "Binance Smart Chain",
      icon: CreditCard
    },
    {
      id: "binance-pay",
      name: "Binance Pay",
      address: "1234567890",
      network: "Binance Pay ID",
      icon: CreditCard
    }
  ];

 const orderMutation = useMutation({
  mutationFn: async (orderData) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package: orderData.packageType,
        cost: parseFloat(orderData.price),
        fullname: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.phone,
        linkedin: orderData.linkedinUrl,
        additionalNotes: orderData.notes,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentDone ? 'completed' : 'pending'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit order');
    }

    return response.json();
  },
  onSuccess: (data) => {
    setOrderSubmitted(true);
    setSubmittedOrderId(data.orderId);

    const orderDetails = {
      orderId: data.orderId,
      packageName: selectedPackage?.label,
      totalPrice: selectedPackage?.price,
      estimatedDelivery: "24-48 hours",
      paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
      customerEmail,
      customerName
    };

    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

    if (paymentDone === 'yes') {
      setShowUploadScreen(true);
      
      // Auto-upload screenshot after 3 seconds if available
      setTimeout(() => {
        if (screenshot) {
          setIsUploading(true);
          uploadMutation.mutate({
            orderId: data.orderId,
            file: screenshot
          });
        } else {
          toast({
            title: "Ready to Upload",
            description: "Please upload your payment screenshot",
          });
        }
      }, 3000);
    } else {
      toast({
        title: "Order Submitted",
        description: "Your order has been successfully submitted. Redirecting to success page..."
      });
      setTimeout(() => {
        setLocation('/order-success');
      }, 3000);
    }
  },
  onError: (error) => {
    setIsLoading(false);
    toast({
      title: "Error",
      description: error.message || "Failed to submit order. Please try again.",
      variant: "destructive"
    });
  }
});


// Upload mutation (should be defined above orderMutation)
const uploadMutation = useMutation({
  mutationFn: async ({ orderId, file }) => {
    const formData = new FormData();
    formData.append('screenshot', file);

    const response = await fetch(`${API_BASE_URL}/${orderId}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload screenshot');
    }

    return response.json();
  },
  onSuccess: () => {
    toast({
      title: "Payment Verified!",
      description: "Your order is now being processed"
    });
    setLocation('/order-success');
  },
  onError: (error) => {
    setIsUploading(false);
    toast({
      title: "Upload Failed",
      description: error.message || "Failed to upload screenshot. Please try again.",
      variant: "destructive"
    });
  }
});

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Max size: 5MB",
        variant: "destructive"
      });
      return;
    }

    setScreenshot(file);
  };

  const handleUploadScreenshot = () => {
    if (!submittedOrderId || !screenshot) {
      toast({
        title: "Error",
        description: "Please select a screenshot to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    uploadMutation.mutate({
      orderId: submittedOrderId,
      file: screenshot
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `Copied ${type} to clipboard!`
    });
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${selectedPackage?.label || 'Not selected'}`;
    const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const validateForm = () => {
    if (!selectedPayment) {
      toast({
        title: "Error",
        description: "Please select a payment method.",
        variant: "destructive"
      });
      return false;
    }

    if (!linkedinUrl || !linkedinUrl.includes('linkedin.com')) {
      toast({
        title: "Error",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive"
      });
      return false;
    }

    if (!customerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return false;
    }

    if (!customerEmail || !customerEmail.includes("@") || !customerEmail.includes(".")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleOrderSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const orderData = {
      packageType: selectedPackage?.value,
      price: selectedPackage?.price || '0',
      linkedinUrl,
      customerName,
      customerEmail,
      phone: customerPhone,
      notes,
      paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
      paymentDone: paymentDone === 'yes'
    };

    orderMutation.mutate(orderData);
  };

  if (!selectedPackage) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-purple-800">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p>Please select a package to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden">
      <SEO
        title="Order Summary - Complete Your LinkedIn Connections Purchase | TechInRent"
        description="Complete your LinkedIn connections order with secure crypto payments."
      />

      <div className="container mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-8">
          <Logo size="md" animated={true} className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Complete Your Order</h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information Card */}
          <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-black text-blue-600">👤 Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">🔗 LinkedIn Profile URL *</Label>
                <Input
                  id="linkedinUrl"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="mt-1"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Enter the LinkedIn profile where you want to receive connections</p>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or notes for your order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment and Order Summary */}
          <div className="space-y-8">
            {/* Payment Method Card */}
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black text-green-600">💳 Select Payment Method</CardTitle>
                  <CardDescription>
                   Choose your preferred cryptocurrency payment method
                 </CardDescription>
              </CardHeader>

             <CardContent>
                 <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <div
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          selectedPayment === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-3">
                              <method.icon className="w-6 h-6 text-blue-600" />
                              <div>
                                <div className="font-bold text-lg text-gray-800">{method.name}</div>
                                <div className="text-sm text-gray-600">{method.network}</div>
                              </div>
                            </div>
                            {selectedPayment === method.id && (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(method.address, `${method.name} Address`)}
                                >
                                  <Copy className="w-4 h-4 mr-1" />
                                  Copy Address
                                </Button>
                              </div>
                            )}
                          </div>
                          {selectedPayment === method.id && (
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono block mt-2">
                              {method.address.slice(0, 20)}...
                            </code>
                          )}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                {selectedPayment && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2">Payment Instructions</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>1. Copy the payment address above</li>
                      <li>2. Send exactly ${selectedPackage?.price} USDT to the address</li>
                      <li>3. Take a screenshot of your transaction</li>
                      <li>4. Upload the screenshot after submitting your order</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary Card */}
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-black">📋 Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Customer</span>
                    <span>{customerName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="text-sm">{customerEmail || 'No email'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LinkedIn Profile</span>
                    <span>
                      {linkedinUrl ? (
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">
                          {linkedinUrl}
                        </a>
                      ) : 'Not provided'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package</span>
                    <span>{selectedPackage?.label || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Price</span>
                    <span className="text-yellow-300">${selectedPackage?.price || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span>{paymentMethods.find(p => p.id === selectedPayment)?.name || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Status</span>
                    <Badge variant="secondary" className={paymentDone === 'yes' ? 'bg-green-500' : 'bg-orange-500'}>
                      {paymentDone === 'yes' ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">🔹 Real connections from verified profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">🔹 Delivered within 24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">🔹 100% safe and secure process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">🔹 Money-back guarantee</span>
                  </div>
                </div>
                <Button
                  onClick={handleOrderSubmit}
                  disabled={isLoading || !selectedPayment || !linkedinUrl || !customerName || !customerEmail}
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : `Submit Order - $${selectedPackage?.price || '0'}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Screenshot Upload Modal */}
        {showUploadScreen && submittedOrderId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black">📸 Upload Payment Proof</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="cursor-pointer"
                  >
                    {screenshot ? (
                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt="Payment proof"
                        className="max-h-52 mx-auto mb-4"
                      />
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p>Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowUploadScreen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadScreenshot}
                    disabled={!screenshot || isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : "Confirm Upload"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}