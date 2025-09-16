// import { useState, useEffect } from "react";
// import { useLocation } from "wouter";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Copy,
//   MessageCircle,
//   CreditCard,
//   Upload,
//   CheckCircle,
//   ArrowLeft,
//   QrCode,
// } from "lucide-react";
// import SEO from "@/components/service/SEO";
// import Logo from "@/components/service/Logo";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";

// const API_BASE_URL = "https://tech-in-rent.onrender.com/api/orders";

// export default function OrderSummaryPage() {
//   const [selectedNetwork, setSelectedNetwork] = useState("");
//   const [, setLocation] = useLocation();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
//   const [linkedinUrl, setLinkedinUrl] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [customerEmail, setCustomerEmail] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [submittedOrderId, setSubmittedOrderId] = useState(null);
//   const [showUploadScreen, setShowUploadScreen] = useState(false);
//   const [screenshot, setScreenshot] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [customerCountryCode, setCustomerCountryCode] = useState("+91"); 
// const [customCustomerCode, setCustomCustomerCode] = useState("");

//   const { toast } = useToast();

//   useEffect(() => {
//     const storedPackage = localStorage.getItem("selectedPackage");
//     if (storedPackage) {
//       setSelectedPackage(JSON.parse(storedPackage));
//     } else {
//       setLocation("/select-package");
//     }
//   }, [setLocation]);

//   const paymentMethods = [
//     {
//       id: "crypto",
//       name: "Crypto",
//       options: [
//         {
//           id: "c-1",
//           name: "USDT",
//           networks: [
//             {
//               id: "usdt-erc20",
//               name: "ETH (ERC-20)",
//               address: "Oxd122fa0220f7b5fff7098cO1c371278477e42a74",
//               qrCode: "/usdt-ethereum.jpg",
//             },
//             {
//               id: "usdt-trc20",
//               name: "TRON (TRC-20)",
//               address: "TDNwKBdDmpCnDTCH6zFcd5pW6MfdX79Hsb",
//               qrCode: "/usdt-tron.jpg",
//             },
//             {
//               id: "usdt-bep20",
//               name: "BNB (BEP-20)",
//               address: "Oxdl 22fa0220f7b5fff7098c01c371278477e42a74",
//               qrCode: "/usdt-bnb.jpg",
//             },
//           ],
//         },
//         {
//           id: "c-2",
//           name: "BTC",
//           networks: [
//             {
//               id: "btc-bnb",
//               name: "BNB (BEP-20)",
//               address: "Oxdl 22fa0220f7b5fff7098c01c371278477e42a74",
//               qrCode: "/btc-bnb.jpg",
//             },
//           ],
//         },
//         {
//           id: "c-3",
//           name: "ETH",
//           networks: [
//             {
//               id: "eth-erc20",
//               name: "ETH (ERC-20)",
//               address: "Oxd122fa0220f7b5fff7098c01c371278477e42a74",
//               qrCode: "/ehtereum.jpg",
//             },
//             {
//               id: "eth-bep20",
//               name: "BNB (BEP-20)",
//               address: "Oxd 122fa0220f7b5fff7098c01c371278477e42a74",
//               qrCode: "/ethereum-bnb.jpg",
//             },
//           ],
//         },
//       ],
//       icon: CreditCard,
//     },
//     {
//       id: "binance",
//       name: "Binance Pay",
//       options: [
//         {
//           id: "binance-1",
//           name: "Binance ID",
//           address: "88841638",
//         },
//       ],
//       icon: CreditCard,
//     },
//     {
//       id: "upi",
//       name: "UPI Payment",
//       options: [
//         {
//           id: "paytm",
//           name: "Paytm",
//           address: "paytmqriei48hl289@paytm",
//           qrCode: "/paytm.jpg",
//         },
//         {
//           id: "navi",
//           name: "NaviUPI",
//           address: "vibhanshumishra@naviaxis",
//           qrCode: "/navi.jpg",
//         },
//       ],
//       icon: CreditCard,
//     },
//   ];
// const codeToUse =
//     customerCountryCode === "other" ? customCustomerCode : customerCountryCode;
//   const finalPhone = `${codeToUse}${customerPhone.replace(/\D/g, "")}`;

//   const orderMutation = useMutation({
//     mutationFn: async (orderData) => {
//       const response = await fetch(API_BASE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           package: orderData.packageType,
//           cost: parseFloat(orderData.price),
//           fullname: orderData.customerName,
//           email: orderData.customerEmail,
//           phone: orderData.finalphone,
//           linkedin: orderData.linkedinUrl,
//           additionalNotes: orderData.notes,
//           paymentMethod: `${orderData.paymentMethod} - ${orderData.paymentOption}`,
//           paymentStatus: "pending",
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to submit order");
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
//         paymentMethod: `${selectedPaymentMethod} - ${selectedPaymentOption}`,
//         customerEmail,
//         customerName,
//       };

//       localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails));
//       setCurrentStep(3); // Move to upload step
//     },
//     onError: (error) => {
//       setIsLoading(false);
//       toast({
//         title: "Error",
//         description:
//           error.message || "Failed to submit order. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const uploadMutation = useMutation({
//     mutationFn: async ({ orderId, file }) => {
//       const formData = new FormData();
//       formData.append("screenshot", file);

//       const response = await fetch(`${API_BASE_URL}/${orderId}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to upload screenshot");
//       }

//       return response.json();
//     },
//     onSuccess: () => {
//       toast({
//         title: "Payment Verified!",
//         description: "Your order is now being processed",
//       });
//       setLocation("/order-success");
//     },
//     onError: (error) => {
//       setIsUploading(false);
//       toast({
//         title: "Upload Failed",
//         description:
//           error.message || "Failed to upload screenshot. Please try again.",
//         variant: "destructive",
//       });
//     },
//   });

//   const handleFileUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       toast({
//         title: "Invalid file",
//         description: "Please upload an image file",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "File too large",
//         description: "Max size: 5MB",
//         variant: "destructive",
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
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsUploading(true);
//     uploadMutation.mutate({
//       orderId: submittedOrderId,
//       file: screenshot,
//     });
//   };

//   const copyToClipboard = (text, type) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied",
//       description: `Copied ${type} to clipboard!`,
//     });
//   };

//   const handleWhatsAppClick = () => {
//     const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${
//       selectedPackage?.label || "Not selected"
//     }`;
//     const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   const validateForm = () => {
//     if (!linkedinUrl || !linkedinUrl.includes("linkedin.com")) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid LinkedIn profile URL.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     if (!customerName.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter your full name.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     if (
//       !customerEmail ||
//       !customerEmail.includes("@") ||
//       !customerEmail.includes(".")
//     ) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid email address.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleFormSubmit = () => {
//     if (!validateForm()) return;
//     setCurrentStep(2); // Move to payment step
//   };

//   const handlePaymentSubmit = () => {
//     if (!selectedPaymentMethod || !selectedPaymentOption) {
//       toast({
//         title: "Error",
//         description: "Please select a payment method and option.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     const orderData = {
//       packageType: selectedPackage?.value,
//       price: selectedPackage?.price || "0",
//       linkedinUrl,
//       customerName,
//       customerEmail,
//       phone: customerPhone,
//       notes,
//       paymentMethod: selectedPaymentMethod,
//       paymentOption: selectedPaymentOption,
//     };

//     orderMutation.mutate(orderData);
//   };

//   const getSelectedPaymentDetails = () => {
//     const method = paymentMethods.find((m) => m.id === selectedPaymentMethod);
//     if (!method) return null;

//     const option = method.options.find((o) => o.id === selectedPaymentOption);
//     if (!option) return null;

//     // For Crypto → pick network
//     if (selectedPaymentMethod === "crypto" && selectedNetwork) {
//       return option.networks?.find((n) => n.id === selectedNetwork) || null;
//     }

//     // For UPI / Binance → return option directly
//     return option;
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
//         description="Complete your LinkedIn connections order with secure payments."
//       />

//       <div className="container mx-auto px-4 py-12 sm:py-20">
//         <header className="text-center mb-8">
//           <Logo size="md" animated={true} className="mb-4" />
//           <h1 className="text-3xl sm:text-4xl font-bold text-white">
//             {currentStep === 1 && "Enter Your Information"}
//             {currentStep === 2 && "Select Payment Method"}
//             {currentStep === 3 && "Upload Payment Proof"}
//           </h1>
//         </header>

//         {/* Progress Steps */}
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center">
//             {[1, 2, 3].map((step) => (
//               <div key={step} className="flex items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                     currentStep >= step
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-700 text-gray-300"
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {step < 3 && (
//                   <div
//                     className={`w-16 h-1 ${
//                       currentStep > step ? "bg-blue-500" : "bg-gray-700"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Step 1: Customer Information */}
//         {currentStep === 1 && (
//           <div className="grid lg:grid-cols-2 gap-8">
//             <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black text-blue-600">
//                   👤 Your Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="customerName">Full Name *</Label>
//                     <Input
//                       id="customerName"
//                       placeholder="Enter your full name"
//                       value={customerName}
//                       onChange={(e) => setCustomerName(e.target.value)}
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="customerEmail">Email Address *</Label>
//                     <Input
//                       id="customerEmail"
//                       type="email"
//                       placeholder="your.email@example.com"
//                       value={customerEmail}
//                       onChange={(e) => setCustomerEmail(e.target.value)}
//                       className="mt-1"
//                       required
//                     />
//                   </div>
//                 </div>
//               <div>
//   <Label htmlFor="customerPhone">Phone Number *</Label>
//   <div className="flex gap-2 items-center mt-1">
//     {/* Country Code Dropdown */}
//     <select
//       id="customerCountryCode"
//       value={customerCountryCode}
//       onChange={(e) => {
//         setCustomerCountryCode(e.target.value);
//         if (e.target.value !== "other") setCustomCustomerCode("");
//       }}
//       className="w-[150px] rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-black focus:outline-none"
//     >
//       <option value="+1">🇺🇸 +1 (USA)</option>
//       <option value="+44">🇬🇧 +44 (UK)</option>
//       <option value="+91">🇮🇳 +91 (India)</option>
//       <option value="+61">🇦🇺 +61 (Australia)</option>
//       <option value="+81">🇯🇵 +81 (Japan)</option>
//       <option value="+49">🇩🇪 +49 (Germany)</option>
//       <option value="+33">🇫🇷 +33 (France)</option>
//       <option value="+39">🇮🇹 +39 (Italy)</option>
//       <option value="+34">🇪🇸 +34 (Spain)</option>
//       <option value="+55">🇧🇷 +55 (Brazil)</option>
//       <option value="+7">🇷🇺 +7 (Russia)</option>
//       <option value="+86">🇨🇳 +86 (China)</option>
//       <option value="+82">🇰🇷 +82 (South Korea)</option>
//       <option value="+971">🇦🇪 +971 (UAE)</option>
//       <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
//       <option value="+27">🇿🇦 +27 (South Africa)</option>
//       <option value="+234">🇳🇬 +234 (Nigeria)</option>
//       <option value="+52">🇲🇽 +52 (Mexico)</option>
//       <option value="+31">🇳🇱 +31 (Netherlands)</option>
//       <option value="+46">🇸🇪 +46 (Sweden)</option>
//       {/* Other */}
//       <option value="other">🌍 Other</option>
//     </select>

//     {/* Custom Code Input */}
//     {customerCountryCode === "other" && (
//       <Input
//         id="customCustomerCode"
//         placeholder="+123"
//         value={customCustomerCode}
//         onChange={(e) => setCustomCustomerCode(e.target.value)}
//         className="w-[100px]"
//       />
//     )}

//     {/* Phone Input */}
//     <Input
//       id="customerPhone"
//       placeholder="1234567890"
//       value={customerPhone}
//       onChange={(e) => setCustomerPhone(e.target.value)}
//       className="flex-1"
//     />
//   </div>
//   <p className="text-xs text-neutral-500 mt-1">
//     Select country code (or Other → enter +code). Enter digits only in phone field.
//   </p>
// </div>

//                 <div>
//                   <Label htmlFor="linkedinUrl">🔗 LinkedIn Profile URL *</Label>
//                   <Input
//                     id="linkedinUrl"
//                     placeholder="https://www.linkedin.com/in/your-profile"
//                     value={linkedinUrl}
//                     onChange={(e) => setLinkedinUrl(e.target.value)}
//                     className="mt-1"
//                     required
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Enter the LinkedIn profile where you want to receive
//                     connections
//                   </p>
//                 </div>
//                 <div>
//                   <Label htmlFor="notes">Additional Notes (Optional)</Label>
//                   <Textarea
//                     id="notes"
//                     placeholder="Any special requirements or notes for your order..."
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     className="mt-1"
//                     rows={3}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black">
//                   📋 Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Package</span>
//                     <span>{selectedPackage?.label || "Not selected"}</span>
//                   </div>
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Price</span>
//                     <span className="text-yellow-300">
//                       ${selectedPackage?.price || "0"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="border-t border-white/20 pt-4 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">
//                       🔹 Real connections from verified profiles
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">
//                       🔹 Delivered within 24-48 hours
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">
//                       🔹 100% safe and secure process
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span className="text-sm">🔹 Money-back guarantee</span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleFormSubmit}
//                   disabled={!linkedinUrl || !customerName || !customerEmail}
//                   className="w-full bg-white text-purple-600 hover:bg-gray-100"
//                 >
//                   Continue to Payment
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Step 2: Payment Method */}
//         {currentStep === 2 && (
//           <div className="grid lg:grid-cols-2 gap-8">
//             <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black text-green-600">
//                   💳 Select Payment Method
//                 </CardTitle>
//                 <CardDescription>
//                   Choose your preferred payment method
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <Label>Payment Method *</Label>
//                   <Select
//                     onValueChange={setSelectedPaymentMethod}
//                     value={selectedPaymentMethod}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a payment method" />
//                     </SelectTrigger>
//                     <SelectContent
//                       className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
//                       position="popper"
//                     >
//                       {paymentMethods.map((method) => (
//                         <SelectItem key={method.id} value={method.id}>
//                           {method.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {selectedPaymentMethod && (
//                   <div className="space-y-4">
//                     {/* Payment Option */}
//                     <Label>Payment Option *</Label>
//                     <Select
//                       onValueChange={setSelectedPaymentOption}
//                       value={selectedPaymentOption}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a payment option" />
//                       </SelectTrigger>
//                       <SelectContent
//                         className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
//                         position="popper"
//                       >
//                         {paymentMethods
//                           .find((m) => m.id === selectedPaymentMethod)
//                           ?.options.map((option) => (
//                             <SelectItem key={option.id} value={option.id}>
//                               {option.name}
//                             </SelectItem>
//                           ))}
//                       </SelectContent>
//                     </Select>

//                     {/* Network (only if Crypto is selected) */}
//                     {selectedPaymentMethod === "crypto" &&
//                       selectedPaymentOption && (
//                         <div className="space-y-4">
//                           <Label>Network *</Label>
//                           <Select
//                             onValueChange={setSelectedNetwork}
//                             value={selectedNetwork}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select a network" />
//                             </SelectTrigger>
//                             <SelectContent
//                               className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
//                               position="popper"
//                             >
//                               {paymentMethods
//                                 .find((m) => m.id === "crypto")
//                                 ?.options.find(
//                                   (o) => o.id === selectedPaymentOption
//                                 )
//                                 ?.networks.map((net) => (
//                                   <SelectItem key={net.id} value={net.id}>
//                                     {net.name}
//                                   </SelectItem>
//                                 ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {selectedPaymentMethod && selectedPaymentOption && (
//                   <div className="border rounded-lg p-4 bg-gray-50">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-bold">
//                         {
//                           paymentMethods.find(
//                             (m) => m.id === selectedPaymentMethod
//                           )?.name
//                         }{" "}
//                         -{" "}
//                         {
//                           paymentMethods
//                             .find((m) => m.id === selectedPaymentMethod)
//                             ?.options.find(
//                               (o) => o.id === selectedPaymentOption
//                             )?.name
//                         }
//                       </h3>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         disabled={
//                           selectedPaymentMethod === "crypto" && !selectedNetwork
//                         }
//                         onClick={() =>
//                           copyToClipboard(
//                             getSelectedPaymentDetails()?.address,
//                             `${selectedPaymentMethod} Address`
//                           )
//                         }
//                       >
//                         <Copy className="w-4 h-4 mr-1" />
//                         Copy
//                       </Button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label className="text-sm">Payment Address</Label>
//                         <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
//                           {getSelectedPaymentDetails()?.address ||
//                             "Select appropriate options"}
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <Label className="text-sm mb-2">QR Code</Label>
//                         <div className="bg-white p-2 rounded">
//                           <img
//                             src={
//                               getSelectedPaymentDetails()?.qrCode ||
//                               "/image.png"
//                             }
//                             alt="select appropriate option"
//                             className="w-44 h-40"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                       <h4 className="font-bold text-blue-800 mb-2">
//                         Payment Instructions
//                       </h4>
//                       <ul className="text-sm text-blue-700 space-y-1">
//                         <li>• Send exactly ${selectedPackage?.price}</li>
//                         <li>
//                           • Include your order ID in the payment note if
//                           possible
//                         </li>
//                         <li>
//                           • Take a screenshot of the transaction for
//                           verification
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black">
//                   📋 Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Customer</span>
//                     <span>{customerName || "Not provided"}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Email</span>
//                     <span className="text-sm">
//                       {customerEmail || "No email"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>LinkedIn Profile</span>
//                     <span>
//                       {linkedinUrl ? (
//                         <a
//                           href={linkedinUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-yellow-300 hover:underline"
//                         >
//                           {linkedinUrl.slice(0, 20)}...
//                         </a>
//                       ) : (
//                         "Not provided"
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Package</span>
//                     <span>{selectedPackage?.label || "Not selected"}</span>
//                   </div>
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Price</span>
//                     <span className="text-yellow-300">
//                       ${selectedPackage?.price || "0"}
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handlePaymentSubmit}
//                   disabled={
//                     isLoading ||
//                     !selectedPaymentMethod ||
//                     !selectedPaymentOption
//                   }
//                   className="w-full bg-white text-purple-600 hover:bg-gray-100"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-600"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     `Submit Order - $${selectedPackage?.price || "0"}`
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Step 3: Upload Screenshot */}
//         {currentStep === 3 && (
//           <div className="max-w-2xl mx-auto">
//             <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
//               <CardHeader>
//                 <CardTitle className="text-xl font-black text-green-600">
//                   📸 Upload Payment Proof
//                 </CardTitle>
//                 <CardDescription>
//                   Please upload a screenshot of your payment transaction for
//                   verification
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                     id="screenshot-upload"
//                   />
//                   <label
//                     htmlFor="screenshot-upload"
//                     className="cursor-pointer flex flex-col items-center justify-center space-y-2"
//                   >
//                     {screenshot ? (
//                       <>
//                         <img
//                           src={URL.createObjectURL(screenshot)}
//                           alt="Payment proof"
//                           className="max-h-64 mx-auto mb-4 rounded"
//                         />
//                         <p className="text-sm text-green-600 font-medium">
//                           Screenshot selected
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <Upload className="w-12 h-12 text-gray-400" />
//                         <p className="font-medium">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           PNG, JPG (Max 5MB)
//                         </p>
//                       </>
//                     )}
//                   </label>
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h4 className="font-bold text-blue-800 mb-2">
//                     Important Note
//                   </h4>
//                   <p className="text-sm text-blue-700">
//                     Uploading the payment screenshot is required to verify your
//                     payment. Our team will review and process your order within
//                     24 hours. You'll receive an email confirmation once your
//                     payment is verified.
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     variant="outline"
//                     onClick={() => setCurrentStep(2)}
//                     className="flex-1"
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     onClick={handleUploadScreenshot}
//                     disabled={!screenshot || isUploading}
//                     className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//                   >
//                     {isUploading ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Uploading...
//                       </>
//                     ) : (
//                       "Submit Payment Proof"
//                     )}
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


import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  MessageCircle,
  CreditCard,
  Upload,
  CheckCircle,
  ArrowLeft,
  QrCode,
} from "lucide-react";
import SEO from "@/components/service/SEO";
import Logo from "@/components/service/Logo";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = "https://tech-in-rent.onrender.com/api/orders";

export default function OrderSummaryPage() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerCountryCode, setCustomerCountryCode] = useState("+91");
  const [customCustomerCode, setCustomCustomerCode] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const storedPackage = localStorage.getItem("selectedPackage");
    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    } else {
      setLocation("/select-package");
    }
  }, [setLocation]);

  const paymentMethods = [
    {
      id: "crypto",
      name: "Crypto",
      options: [
        {
          id: "c-1",
          name: "USDT",
          networks: [
            {
              id: "usdt-erc20",
              name: "ETH (ERC-20)",
              address: "Oxd122fa0220f7b5fff7098cO1c371278477e42a74",
              qrCode: "/usdt-ethereum.jpg",
            },
            {
              id: "usdt-trc20",
              name: "TRON (TRC-20)",
              address: "TDNwKBdDmpCnDTCH6zFcd5pW6MfdX79Hsb",
              qrCode: "/usdt-tron.jpg",
            },
            {
              id: "usdt-bep20",
              name: "BNB (BEP-20)",
              address: "Oxdl 22fa0220f7b5fff7098c01c371278477e42a74",
              qrCode: "/usdt-bnb.jpg",
            },
          ],
        },
        {
          id: "c-2",
          name: "BTC",
          networks: [
            {
              id: "btc-bnb",
              name: "BNB (BEP-20)",
              address: "Oxdl 22fa0220f7b5fff7098c01c371278477e42a74",
              qrCode: "/btc-bnb.jpg",
            },
          ],
        },
        {
          id: "c-3",
          name: "ETH",
          networks: [
            {
              id: "eth-erc20",
              name: "ETH (ERC-20)",
              address: "Oxd122fa0220f7b5fff7098c01c371278477e42a74",
              qrCode: "/ehtereum.jpg",
            },
            {
              id: "eth-bep20",
              name: "BNB (BEP-20)",
              address: "Oxd 122fa0220f7b5fff7098c01c371278477e42a74",
              qrCode: "/ethereum-bnb.jpg",
            },
          ],
        },
      ],
      icon: CreditCard,
    },
    {
      id: "binance",
      name: "Binance Pay",
      options: [
        {
          id: "binance-1",
          name: "Binance ID",
          address: "88841638",
        },
      ],
      icon: CreditCard,
    },
    {
      id: "upi",
      name: "UPI Payment",
      options: [
        {
          id: "paytm",
          name: "Paytm",
          address: "paytmqriei48hl289@paytm",
          qrCode: "/paytm.jpg",
        },
        {
          id: "navi",
          name: "NaviUPI",
          address: "vibhanshumishra@naviaxis",
          qrCode: "/navi.jpg",
        },
      ],
      icon: CreditCard,
    },
  ];

  const validatePhoneNumber = (phone, countryCode) => {
    // Remove non-digits from phone number
    const cleanPhone = phone.replace(/\D/g, "");
    
    // Basic validation rules
    if (!cleanPhone) {
      return "Phone number is required";
    }
    
    // Validate phone number length (7-15 digits is typical for most countries)
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return "Phone number must be between 7 and 15 digits";
    }
    
    // Validate country code
    if (countryCode === "other" && !customCustomerCode) {
      return "Please enter a custom country code";
    }
    
    if (countryCode === "other" && !customCustomerCode.match(/^\+\d{1,4}$/)) {
      return "Custom country code must start with '+' followed by 1-4 digits";
    }
    
    return "";
  };

  const codeToUse = customerCountryCode === "other" ? customCustomerCode : customerCountryCode;
  const finalPhone = `${codeToUse}${customerPhone.replace(/\D/g, "")}`;

  const orderMutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          package: orderData.packageType,
          cost: parseFloat(orderData.price),
          fullname: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.finalPhone,
          linkedin: orderData.linkedinUrl,
          additionalNotes: orderData.notes,
          paymentMethod: `${orderData.paymentMethod} - ${orderData.paymentOption}`,
          paymentStatus: "pending",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit order");
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
        paymentMethod: `${selectedPaymentMethod} - ${selectedPaymentOption}`,
        customerEmail,
        customerName,
      };

      localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails));
      setCurrentStep(3);
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ orderId, file }) => {
      const formData = new FormData();
      formData.append("screenshot", file);

      const response = await fetch(`${API_BASE_URL}/${orderId}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload screenshot");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Payment Verified!",
        description: "Your order is now being processed",
      });
      setLocation("/order-success");
    },
    onError: (error) => {
      setIsUploading(false);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload screenshot. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Max size: 5MB",
        variant: "destructive",
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
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    uploadMutation.mutate({
      orderId: submittedOrderId,
      file: screenshot,
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `Copied ${type} to clipboard!`,
    });
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${
      selectedPackage?.label || "Not selected"
    }`;
    const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const validateForm = () => {
    if (!linkedinUrl || !linkedinUrl.includes("linkedin.com")) {
      toast({
        title: "Error",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerEmail || !customerEmail.includes("@") || !customerEmail.includes(".")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    const phoneValidationError = validatePhoneNumber(customerPhone, customerCountryCode);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      toast({
        title: "Error",
        description: phoneValidationError,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    setCurrentStep(2);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod || !selectedPaymentOption) {
      toast({
        title: "Error",
        description: "Please select a payment method and option.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const orderData = {
      packageType: selectedPackage?.value,
      price: selectedPackage?.price || "0",
      linkedinUrl,
      customerName,
      customerEmail,
      finalPhone,
      notes,
      paymentMethod: selectedPaymentMethod,
      paymentOption: selectedPaymentOption,
    };

    orderMutation.mutate(orderData);
  };

  const getSelectedPaymentDetails = () => {
    const method = paymentMethods.find((m) => m.id === selectedPaymentMethod);
    if (!method) return null;

    const option = method.options.find((o) => o.id === selectedPaymentOption);
    if (!option) return null;

    if (selectedPaymentMethod === "crypto" && selectedNetwork) {
      return option.networks?.find((n) => n.id === selectedNetwork) || null;
    }

    return option;
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
        description="Complete your LinkedIn connections order with secure payments."
      />

      <div className="container mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-8">
          <Logo size="md" animated={true} className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {currentStep === 1 && "Enter Your Information"}
            {currentStep === 2 && "Select Payment Method"}
            {currentStep === 3 && "Upload Payment Proof"}
          </h1>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black text-blue-600">
                  👤 Your Information
                </CardTitle>
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
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <div className="flex gap-2 items-center mt-1">
                    <select
                      id="customerCountryCode"
                      value={customerCountryCode}
                      onChange={(e) => {
                        setCustomerCountryCode(e.target.value);
                        if (e.target.value !== "other") setCustomCustomerCode("");
                        setPhoneError("");
                      }}
                      className={`w-[150px] rounded-md border ${
                        phoneError ? 'border-red-500' : 'border-gray-300'
                      } bg-white px-2 py-2 text-sm focus:border-black focus:outline-none`}
                    >
                      <option value="+1">🇺🇸 +1 (USA)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+91">🇮🇳 +91 (India)</option>
                      <option value="+61">🇦🇺 +61 (Australia)</option>
                      <option value="+81">🇯🇵 +81 (Japan)</option>
                      <option value="+49">🇩🇪 +49 (Germany)</option>
                      <option value="+33">🇫🇷 +33 (France)</option>
                      <option value="+39">🇮🇹 +39 (Italy)</option>
                      <option value="+34">🇪🇸 +34 (Spain)</option>
                      <option value="+55">🇧🇷 +55 (Brazil)</option>
                      <option value="+7">🇷🇺 +7 (Russia)</option>
                      <option value="+86">🇨🇳 +86 (China)</option>
                      <option value="+82">🇰🇷 +82 (South Korea)</option>
                      <option value="+971">🇦🇪 +971 (UAE)</option>
                      <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                      <option value="+27">🇿🇦 +27 (South Africa)</option>
                      <option value="+234">🇳🇬 +234 (Nigeria)</option>
                      <option value="+52">🇲🇽 +52 (Mexico)</option>
                      <option value="+31">🇳🇱 +31 (Netherlands)</option>
                      <option value="+46">🇸🇪 +46 (Sweden)</option>
                      <option value="other">🌍 Other</option>
                    </select>

                    {customerCountryCode === "other" && (
                      <Input
                        id="customCustomerCode"
                        placeholder="+123"
                        value={customCustomerCode}
                        onChange={(e) => {
                          setCustomCustomerCode(e.target.value);
                          setPhoneError("");
                        }}
                        className={`w-[100px] ${phoneError ? 'border-red-500' : ''}`}
                      />
                    )}

                    <Input
                      id="customerPhone"
                      placeholder="1234567890"
                      value={customerPhone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setCustomerPhone(value);
                        setPhoneError("");
                      }}
                      className={`flex-1 ${phoneError ? 'border-red-500' : ''}`}
                      maxLength={15}
                    />
                  </div>
                  {phoneError ? (
                    <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                  ) : (
                    <p className="text-xs text-neutral-500 mt-1">
                      Select country code (or Other → enter +code). Enter digits only in phone field.
                    </p>
                  )}
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
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the LinkedIn profile where you want to receive connections
                  </p>
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

            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-black">
                  📋 Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Package</span>
                    <span>{selectedPackage?.label || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Price</span>
                    <span className="text-yellow-300">
                      ${selectedPackage?.price || "0"}
                    </span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      🔹 Real connections from verified profiles
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      🔹 Delivered within 24-48 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      🔹 100% safe and secure process
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">🔹 Money-back guarantee</span>
                  </div>
                </div>
                <Button
                  onClick={handleFormSubmit}
                  disabled={!linkedinUrl || !customerName || !customerEmail || phoneError || !customerPhone}
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black text-green-600">
                  💳 Select Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Payment Method *</Label>
                  <Select
                    onValueChange={setSelectedPaymentMethod}
                    value={selectedPaymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent
                      className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
                      position="popper"
                    >
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPaymentMethod && (
                  <div className="space-y-4">
                    <Label>Payment Option *</Label>
                    <Select
                      onValueChange={setSelectedPaymentOption}
                      value={selectedPaymentOption}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment option" />
                      </SelectTrigger>
                      <SelectContent
                        className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
                        position="popper"
                      >
                        {paymentMethods
                          .find((m) => m.id === selectedPaymentMethod)
                          ?.options.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {selectedPaymentMethod === "crypto" && selectedPaymentOption && (
                      <div className="space-y-4">
                        <Label>Network *</Label>
                        <Select
                          onValueChange={setSelectedNetwork}
                          value={selectedNetwork}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a network" />
                          </SelectTrigger>
                          <SelectContent
                            className="z-50 bg-white border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg"
                            position="popper"
                          >
                            {paymentMethods
                              .find((m) => m.id === "crypto")
                              ?.options.find((o) => o.id === selectedPaymentOption)
                              ?.networks.map((net) => (
                                <SelectItem key={net.id} value={net.id}>
                                  {net.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}

                {selectedPaymentMethod && selectedPaymentOption && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">
                        {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}{" "}
                        -{" "}
                        {paymentMethods
                          .find((m) => m.id === selectedPaymentMethod)
                          ?.options.find((o) => o.id === selectedPaymentOption)?.name}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedPaymentMethod === "crypto" && !selectedNetwork}
                        onClick={() =>
                          copyToClipboard(
                            getSelectedPaymentDetails()?.address,
                            `${selectedPaymentMethod} Address`
                          )
                        }
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Payment Address</Label>
                        <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
                          {getSelectedPaymentDetails()?.address || "Select appropriate options"}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <Label className="text-sm mb-2">QR Code</Label>
                        <div className="bg-white p-2 rounded">
                          <img
                            src={getSelectedPaymentDetails()?.qrCode || "/image.png"}
                            alt="select appropriate option"
                            className="w-44 h-40"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-2">
                        Payment Instructions
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Send exactly ${selectedPackage?.price}</li>
                        <li>• Include your order ID in the payment note if possible</li>
                        <li>• Take a screenshot of the transaction for verification</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-black">
                  📋 Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Customer</span>
                    <span>{customerName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="text-sm">{customerEmail || "No email"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone</span>
                    <span className="text-sm">{finalPhone || "No phone"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LinkedIn Profile</span>
                    <span>
                      {linkedinUrl ? (
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-300 hover:underline"
                        >
                          {linkedinUrl.slice(0, 20)}...
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package</span>
                    <span>{selectedPackage?.label || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Price</span>
                    <span className="text-yellow-300">
                      ${selectedPackage?.price || "0"}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePaymentSubmit}
                  disabled={isLoading || !selectedPaymentMethod || !selectedPaymentOption}
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Submit Order - $${selectedPackage?.price || "0"}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black text-green-600">
                  📸 Upload Payment Proof
                </CardTitle>
                <CardDescription>
                  Please upload a screenshot of your payment transaction for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    {screenshot ? (
                      <>
                        <img
                          src={URL.createObjectURL(screenshot)}
                          alt="Payment proof"
                          className="max-h-64 mx-auto mb-4 rounded"
                        />
                        <p className="text-sm text-green-600 font-medium">
                          Screenshot selected
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400" />
                        <p className="font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG (Max 5MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">
                    Important Note
                  </h4>
                  <p className="text-sm text-blue-700">
                    Uploading the payment screenshot is required to verify your payment. Our team will review and process your order within 24 hours. You'll receive an email confirmation once your payment is verified.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleUploadScreenshot}
                    disabled={!screenshot || isUploading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isUploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      "Submit Payment Proof"
                    )}
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