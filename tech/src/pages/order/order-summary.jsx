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
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
      id: "bitcoin",
      name: "Bitcoin (BTC)",
      options: [
        {
          id: "btc-1",
          name: "BTC Wallet 1",
          address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
          qrCode: "/btc-qr-1.png",
        },
        {
          id: "btc-2",
          name: "BTC Wallet 2",
          address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
          qrCode: "/btc-qr-2.png",
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
          address: "123456789",
          qrCode: "/binance-qr.png",
        },
      ],
      icon: CreditCard,
    },
    {
      id: "upi",
      name: "UPI Payment",
      options: [
        {
          id: "Googlepay",
          name: "Google Pay",
          address: "upi@example",
          qrCode: "/upi-qr.png",
        },
        {
          id: "PhonePe",
          name: "PhonePe",
          address: "upi@phonepe",
          qrCode: "/phonepe-qr.png",
        },
      ],
      icon: CreditCard,
    },
  ];

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
          phone: orderData.phone,
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
      setCurrentStep(3); // Move to upload step
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description:
          error.message || "Failed to submit order. Please try again.",
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
        description:
          error.message || "Failed to upload screenshot. Please try again.",
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
    const whatsappUrl = `https://wa.me/917898711748?text=${encodeURIComponent(
      message
    )}`;
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

    if (
      !customerEmail ||
      !customerEmail.includes("@") ||
      !customerEmail.includes(".")
    ) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    setCurrentStep(2); // Move to payment step
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
      phone: customerPhone,
      notes,
      paymentMethod: selectedPaymentMethod,
      paymentOption: selectedPaymentOption,
    };

    orderMutation.mutate(orderData);
  };

  const getSelectedPaymentDetails = () => {
    const method = paymentMethods.find((m) => m.id === selectedPaymentMethod);
    if (!method) return null;
    return method.options.find((o) => o.id === selectedPaymentOption);
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

        {/* Progress Steps */}
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

        {/* Step 1: Customer Information */}
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
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the LinkedIn profile where you want to receive
                    connections
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
                  disabled={!linkedinUrl || !customerName || !customerEmail}
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Payment Method */}
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
                    <SelectContent>
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
                      <SelectContent>
                        {paymentMethods
                          .find((m) => m.id === selectedPaymentMethod)
                          ?.options.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedPaymentMethod && selectedPaymentOption && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">
                        {
                          paymentMethods.find(
                            (m) => m.id === selectedPaymentMethod
                          )?.name
                        }{" "}
                        -{" "}
                        {
                          paymentMethods
                            .find((m) => m.id === selectedPaymentMethod)
                            ?.options.find(
                              (o) => o.id === selectedPaymentOption
                            )?.name
                        }
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
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
                          {getSelectedPaymentDetails()?.address}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <Label className="text-sm mb-2">QR Code</Label>
                        <div className="bg-white p-2 rounded">
                          <img
                            src={getSelectedPaymentDetails()?.qrCode}
                            alt="Payment QR Code"
                            className="w-32 h-32"
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
                        <li>
                          • Include your order ID in the payment note if
                          possible
                        </li>
                        <li>
                          • Take a screenshot of the transaction for
                          verification
                        </li>
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
                    <span className="text-sm">
                      {customerEmail || "No email"}
                    </span>
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
                  disabled={
                    isLoading ||
                    !selectedPaymentMethod ||
                    !selectedPaymentOption
                  }
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

        {/* Step 3: Upload Screenshot */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-white/40 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black text-green-600">
                  📸 Upload Payment Proof
                </CardTitle>
                <CardDescription>
                  Please upload a screenshot of your payment transaction for
                  verification
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
                    Uploading the payment screenshot is required to verify your
                    payment. Our team will review and process your order within
                    24 hours. You'll receive an email confirmation once your
                    payment is verified.
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
