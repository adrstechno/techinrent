// import { useState } from 'react';
// import { useLocation } from 'wouter';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Copy, MessageCircle, Shield, CreditCard, Upload, CheckCircle, ExternalLink } from 'lucide-react';
// import SEO from '@/components/SEO';
// import Logo from '@/components/Logo';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { apiRequest } from '@/lib/queryClient';

// export default function OrderConnectionsPage() {
//   const [, setLocation] = useLocation();
//   const [selectedPackage, setSelectedPackage] = useState('');
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

//   const packages = [
//     { value: "25-50", label: "25-50 Connections", price: "2", popular: false },
//     { value: "100", label: "100 Connections", price: "8", popular: false },
//     { value: "250", label: "250 Connections", price: "20", popular: true },
//     { value: "500", label: "500 Connections", price: "40", popular: false },
//     { value: "1000", label: "1,000 Connections", price: "50", popular: true },
//     { value: "2500", label: "2,500 Connections", price: "120", popular: false },
//     { value: "5000", label: "5,000 Connections", price: "200", popular: false },
//     { value: "7500", label: "7,500 Connections", price: "250", popular: false },
//     { value: "10000", label: "10,000 Connections", price: "300", popular: false }
//   ];

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
//       const response = await fetch('http://localhost:5001/api/order/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       })
//       if (!response.ok) {
//         throw new Error('Failed to submit order');
//       }

//       return response.json();
//     },
//     onSuccess: (data) => {
//       setOrderSubmitted(true);
//       setSubmittedOrderId(data.order.id);
//       if (paymentDone === 'yes') {
//         setShowUploadScreen(true);
//       } else {
//         const selectedPackageData = packages.find(pkg => pkg.value === selectedPackage);
//         const orderDetails = {
//           orderId: data.order.id,
//           connections: selectedPackageData.label.split(' ')[0] || selectedPackage,
//           packageName: selectedPackageData.label,
//           totalPrice: selectedPackageData.price,
//           estimatedDelivery: "24-48 hours"
//         };
//         localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
//         toast({
//           title: "Order Submitted",
//           description: "Your order has been successfully submitted. Redirecting to success page..."
//         });
//         setTimeout(() => {
//           setLocation('/order-success');
//         }, 3000);
//       }
//       toast({
//         title: "Order Received",
//         description: "Your LinkedIn connections order has been successfully placed!"
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: "Failed to submit order. Please try again.",
//         variant: "destructive"
//       });
//     }
//   });

//   const uploadMutation = useMutation({
//     mutationFn: async ({ orderId, screenshot }) => {
//       const response = await apiRequest('POST', `/api/linkedin-connection-order/${orderId}/upload-screenshot`, {
//         screenshot
//       });
//       return response.json();
//     },
//     onSuccess: (data) => {
//       const selectedPackageData = packages.find(pkg => pkg.value === selectedPackage);
//       const orderDetails = {
//         orderId: data.order.id,
//         connections: selectedPackageData.label.split(' ')[0] || selectedPackage,
//         packageName: selectedPackageData.label,
//         totalPrice: selectedPackageData.price,
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
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: "Failed to upload screenshot. Please try again.",
//         variant: "destructive"
//       });
//     }
//   });

//   const getSelectedPrice = () => {
//     if (selectedPackage) {
//       const pkg = packages.find(p => p.value === selectedPackage);
//       return pkg ? pkg.price : "0";
//     }
//     return "0";
//   };

//   const copyToClipboard = (text, type) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied",
//       description: `Copied ${type} to clipboard!`
//     });
//   };

//   const handleWhatsAppClick = () => {
//     const message = `Hi, I'm interested in a bulk LinkedIn connections order. Current package: ${packages.find(p => p.value === selectedPackage)?.label || 'Not selected'}`;
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
//     uploadMutation.mutate({ orderId: submittedOrderId, screenshot });
//   };

//   const validateForm = () => {
//     if (!selectedPackage) {
//       toast({
//         title: "Error",
//         description: "Please select a package.",
//         variant: "destructive"
//       });
//       return false;
//     }
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
//     if (!customerEmail.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter your email address.",
//         variant: "destructive"
//       });
//       return false;
//     }
//     if (!customerEmail.includes('@')) {
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
//   if (!validateForm()) {
//     return;
//   }
  
//   setIsLoading(true);
  
//   const orderData = {
//     package: packages.find(p => p.value === selectedPackage)?.label || '',
//     cost: parseInt(getSelectedPrice()),
//     fullname: customerName,
//     email: customerEmail,
//     phone: customerPhone,
//     linkedin: linkedinUrl,
//     additionalNotes: notes,
//     paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || ''
//   };
  
//   orderMutation.mutate(orderData);
// };




import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, MessageCircle, Shield, CreditCard, Upload, CheckCircle, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

export default function OrderConnectionsPage() {
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState('');
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
  const { toast } = useToast();

  const packages = [
    { value: "25-50", label: "25-50 Connections", price: "2", popular: false },
    { value: "100", label: "100 Connections", price: "8", popular: false },
    { value: "250", label: "250 Connections", price: "20", popular: true },
    { value: "500", label: "500 Connections", price: "40", popular: false },
    { value: "1000", label: "1,000 Connections", price: "50", popular: true },
    { value: "2500", label: "2,500 Connections", price: "120", popular: false },
    { value: "5000", label: "5,000 Connections", price: "200", popular: false },
    { value: "7500", label: "7,500 Connections", price: "250", popular: false },
    { value: "10000", label: "10,000 Connections", price: "300", popular: false }
  ];

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
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setOrderSubmitted(true);
      setSubmittedOrderId(data.orderId || 'N/A');
      if (paymentDone === 'yes') {
        setShowUploadScreen(true);
      } else {
        const selectedPackageData = packages.find(pkg => pkg.value === selectedPackage);
        const orderDetails = {
          orderId: data.orderId,
          connections: selectedPackageData?.label.split(' ')[0] || selectedPackage,
          packageName: selectedPackageData?.label,
          totalPrice: selectedPackageData?.price,
          estimatedDelivery: "24-48 hours"
        };
        localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
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
      toast({
        title: "Error",
        description: error.message || "Failed to submit order. Please try again.",
        variant: "destructive"
      });
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ orderId, screenshot }) => {
      const formData = new FormData();
      formData.append('screenshot', screenshot);
      
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload screenshot');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      const selectedPackageData = packages.find(pkg => pkg.value === selectedPackage);
      const orderDetails = {
        orderId: data.orderId,
        connections: selectedPackageData?.label.split(' ')[0] || selectedPackage,
        packageName: selectedPackageData?.label,
        totalPrice: selectedPackageData?.price,
        estimatedDelivery: "24-48 hours"
      };
      localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
      toast({
        title: "Screenshot Uploaded",
        description: "Your payment screenshot has been uploaded successfully!"
      });
      setTimeout(() => {
        setLocation('/order-success');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload screenshot. Please try again.",
        variant: "destructive"
      });
    }
  });

  // ... [Rest of your helper functions remain the same]

  const handleOrderSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const orderData = {
      package: packages.find(p => p.value === selectedPackage)?.label || '',
      cost: parseInt(getSelectedPrice()),
      fullname: customerName,
      email: customerEmail,
      phone: customerPhone,
      linkedin: linkedinUrl,
      additionalNotes: notes,
      paymentMethod: paymentMethods.find(p => p.id === selectedPayment)?.name || '',
      paymentStatus: paymentDone === 'yes' ? 'completed' : 'pending'
    };
    
    orderMutation.mutate(orderData);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-800 relative overflow-hidden mobile-scroll-optimize">
      <SEO
        title="Order Real LinkedIn Connections - Buy LinkedIn Connections Via Crypto Payment | TechInRent"
        description="Purchase LinkedIn connections for sale with secure crypto payments. Buy real LinkedIn connections instantly using TRC-20 USDT, BEP-20 USDT, and Binance Pay. Fast delivery LinkedIn connections service with real-time processing."
        keywords="order linkedin connections, buy real linkedin connections instantly, purchase linkedin connections, buy linkedin connections via crypto payment, linkedin connections for sale, fast delivery linkedin connections service, real-time linkedin connections, techinrent linkedin connection service, buy linkedin connections on techinrent, safe linkedin connection service, get linkedin connections fast, auto linkedin connection, increase linkedin connections, boost linkedin profile connections"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Order LinkedIn Connections - TechInRent",
          "description": "Secure checkout page for purchasing real LinkedIn connections with cryptocurrency payments",
          "provider": {
            "@type": "Organization",
            "name": "TechInRent",
            "url": "https://techinrent.com"
          }
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-40 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-35 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-25 animate-spin" />
      </div>
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 mb-12">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/buy-connections'}>
                Back to Buy Connections
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Home
              </Button>
            </div>
          </div>
        </header>
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-white mb-12">Order Your LinkedIn Connections</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border border-white/30">
            <CardHeader>
              <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📋 Order Details
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill in your details to place your order for LinkedIn connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="customerName" className="text-sm font-semibold text-gray-700">Full Name *</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerEmail" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn Profile URL *
                </Label>
                <Input
                  id="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="mt-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter the LinkedIn profile where you want to receive connections</p>
              </div>
              <div>
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or notes for your order..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border border-white/30 sm:p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  📦 Select Package
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Choose the number of LinkedIn connections you want
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.value} value={pkg.value}>
                        {pkg.label} - ${pkg.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.value}
                      className={`relative p-4 cursor-pointer transition-all duration-300 ${selectedPackage === pkg.value
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                      onClick={() => setSelectedPackage(pkg.value)}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white">
                          Popular
                        </Badge>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-800 mb-2">${pkg.price}</div>
                        <div className="text-sm font-semibold text-gray-600">{pkg.label}</div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">Need more connections?</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-2 mb-4">For bulk orders or custom packages, negotiate directly with our team</p>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full"
                  >
                    Contact via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border border-white/30 sm:p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  💳 Payment Methods
                </CardTitle>
                <CardDescription className="text-gray-600">
                  We accept secure cryptocurrency payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${selectedPayment === method.id
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <method.icon className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-bold text-gray-800">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.network}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Secure
                        </Badge>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                          <Label className="text-sm font-semibold text-gray-700">
                            {method.network === 'Binance Pay ID' ? 'Pay ID' : 'Address'}
                          </Label>
                          <div className="flex items-center gap-2 mt-2">
                            <Input
                              value={method.address}
                              readOnly
                              className="bg-white text-sm font-mono"
                            />
                            <Button
                              onClick={() => copyToClipboard(method.address, method.network)}
                              variant="outline"
                              size="sm"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  💰 Payment Confirmation
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Have you completed the payment using the selected method above?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentDone} onValueChange={setPaymentDone}>
                  <div className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400">
                    <RadioGroupItem value="no" id="payment-no" />
                    <Label htmlFor="payment-no" className="font-semibold text-gray-700 cursor-pointer">
                      No, I haven't made the payment yet
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border-2 border-green-500 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                    <RadioGroupItem value="yes" id="payment-yes" />
                    <Label htmlFor="payment-yes" className="font-semibold text-green-700 cursor-pointer">
                      Yes, I have completed the payment
                    </Label>
                  </div>
                </RadioGroup>
                {paymentDone === 'yes' && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Payment Confirmed</span>
                    </div>
                    <p className="text-sm text-green-600">
                      After submitting your order, you'll be able to upload your payment screenshot for verification.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  🛒 Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">Customer</span>
                  <div className="font-bold text-gray-800 text-right">
                    {customerName || 'Not provided'}<br />
                    <span className="text-sm text-gray-600">{customerEmail || 'No email'}</span>
                    {customerPhone && <><br /><span className="text-sm text-gray-600">{customerPhone}</span></>}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">LinkedIn Profile</span>
                  <div className="font-bold text-gray-800 text-right text-sm">
                    {linkedinUrl ? (
                      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {linkedinUrl}
                      </a>
                    ) : 'Not provided'}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">Package</span>
                  <div className="font-bold text-gray-800">
                    {selectedPackage ? packages.find(p => p.value === selectedPackage)?.label : 'Not selected'}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">Price</span>
                  <div className="text-2xl font-black text-green-600">
                    ${getSelectedPrice()}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">Payment Method</span>
                  <div className="font-bold text-gray-800">
                    {selectedPayment ? paymentMethods.find(p => p.id === selectedPayment)?.name : 'Not selected'}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-semibold text-gray-700">Payment Status</span>
                  <div className={`font-bold ${paymentDone === 'yes' ? 'text-green-600' : 'text-orange-600'}`}>
                    {paymentDone === 'yes' ? '✅ Completed' : '⏳ Pending'}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Secure Order</span>
                  </div>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Real connections from verified profiles</li>
                    <li>• Delivered within 24-48 hours</li>
                    <li>• 100% safe and secure process</li>
                    <li>• Money-back guarantee</li>
                  </ul>
                </div>
                <Button
                  onClick={handleOrderSubmit}
                  disabled={orderMutation.isPending || !selectedPackage || !selectedPayment || !linkedinUrl || !customerName || !customerEmail}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600"
                >
                  {isLoading ? "Submitting..." : `Submit Order - $${getSelectedPrice()}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {showUploadScreen && submittedOrderId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-md w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  📸 Upload Payment Screenshot
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please upload your payment screenshot to complete the verification process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {screenshot && (
                  <div className="text-center">
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-700 font-semibold">Screenshot selected</p>
                    </div>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Note</h4>
                  <p className="text-sm text-blue-700">
                    Uploading the payment screenshot is required to complete your order.
                    Our team will review and process your order within 24 hours.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowUploadScreen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadScreenshot}
                    disabled={!screenshot || uploadMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isUploading ? "Uploading..." : "Upload Screenshot"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {orderSubmitted && !showUploadScreen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg border-2 border-white/40 shadow-2xl max-w-md w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  🎉 Order Submitted Successfully
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Thank you for your order! Here's what happens next:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Order ID: {submittedOrderId}</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Your order has been received and is being processed</li>
                    <li>• You will receive an email confirmation shortly</li>
                    <li>• Connections will be delivered within 24-48 hours</li>
                    <li>• Our team will contact you if needed</li>
                  </ul>
                </div>
                {paymentDone === 'yes' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      Payment confirmed. Your payment screenshot has been uploaded and will be verified by our team.
                    </p>
                  </div>
                )}
                {paymentDone === 'no' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-700">
                      Payment pending. Please complete the payment to proceed with your order.
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                >
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}